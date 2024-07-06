import NodeService from "@/components/canvas/node-service/node-service";
import { ForgeTokenResponse } from "@/components/forge/viewer-aggr";
import { supabase } from "@/components/supabase-client";
import axios from "axios";
import { BehaviorSubject } from "rxjs";

class ViewerService {
  private _urn: string | null = null;
  private _project$ = new BehaviorSubject<any | null>(null);

  constructor(private _nodeService: NodeService, private _nodeId: string) {
    this.fetchProject(
      "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLkFvUzVxamhPUmJPSUtZOUxxY2RDMlE_dmVyc2lvbj0x"
    );
  }

  public async getModelData() {
    const urn =
      "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLkFvUzVxamhPUmJPSUtZOUxxY2RDMlE_dmVyc2lvbj0x";

    const response = await axios.get<ForgeTokenResponse>("/api/token");
    const token = response.data.access_token;

    const metadata = await this.getModelMetadata(urn, token);

    const elements = await this.getModelProperties(urn, token, metadata);

    return elements;
  }

  async getModelMetadata(urn: string, accessToken: string) {
    const response = await axios.get(
      `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data.data.metadata;
  }

  async getModelProperties(
    urn: string,
    accessToken: string,
    metadata: any
  ): Promise<ElementItem[]> {
    const viewable = metadata[0]; // Assuming first viewable
    console.log("viewable", viewable);
    const guid = viewable.guid;
    console.log("guid", guid);

    const response = await axios.get(
      `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata/${guid}/properties`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const data = response.data.data;
    const { collection } = data;

    return collection as ElementItem[];
  }

  public async _fetchInitialComments(projectId: string) {
    const { data, error } = await supabase
      .from("comments") // Adjust if your table name is different
      .select(`*`)
      .eq("project_id", projectId)
      .not("author_id", "is", null) // Exclude comments where author_id is null
      .order("created_at", { ascending: true }); // Assuming you have a 'createdAt' column for sorting

    if (error) {
      console.error("Error fetching comments:", error);
    }

    return data;
  }

  public async fetchProject(urn: string) {
    this._urn = urn;

    let { data: project, error: findError } = await supabase
      .from("projects")
      .select(
        `
      *,
      userprojects!inner(
        user_id
      )
    `
      )
      .eq("bim_urn", urn)
      .single();

    const projectId = project?.id;

    const modelElements = await this.getModelData();
    const comments = await this._fetchInitialComments(projectId);

    this._project$.next(project);

    const entities = [
      {
        label: "comments",
        value: "comments",
      },
      {
        label: "model elements",
        value: "modelElements",
      },
    ];

    this._nodeService.addUserdataToNode(this._nodeId, {
      modelElements,
      comments,
      project,
      entities,
    });
  }

  public get project$() {
    return this._project$.asObservable();
  }

  public dispose() {
    // Dispose the service
  }
}

interface ElementItem {
  externalId: string;
  name: string;
  objectid: number;
  properties: Record<string, any>;
}

export default ViewerService;
