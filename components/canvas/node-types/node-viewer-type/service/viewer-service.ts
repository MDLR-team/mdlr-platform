import NodeService from "@/components/canvas/node-service/node-service";
import { ForgeTokenResponse } from "@/components/forge/viewer-aggr";
import { ProjectTopic } from "@/components/services/project-services/project-service/project-service";
import { supabase } from "@/components/supabase-client";
import { Project } from "@/components/types/supabase-data.types";
import { CLIENT_ID } from "@/pages/api/token";
import axios from "axios";
import { BehaviorSubject } from "rxjs";

class ViewerService {
  private _urn: string | null = null;
  private _project$ = new BehaviorSubject<any | null>(null);

  public projects$ = new BehaviorSubject<Project[]>([]);

  constructor(private _nodeService: NodeService, private _nodeId: string) {
    this.fetchProjects();
  }

  public async fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .not("bim_id", "is", null)
      .eq("bim_client_id", CLIENT_ID)
      .not("bim_urn", "is", null)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
    }

    this.projects$.next(data as Project[]);
  }

  public async getModelData(urn: string) {
    const response = await axios.get<ForgeTokenResponse>("/api/token");
    const token = response.data.access_token;

    const metadata = await this.getModelMetadata(urn, token);

    const elements = await this.getModelProperties(urn, token, metadata);

    return elements;
  }

  async getModelMetadata(urn: string, accessToken: string) {
    const response = await axios.get(
      `https://developer.api.autodesk.com/modelderivative/v2/regions/eu/designdata/${urn}/metadata`,
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
    const guid = viewable.guid;

    try {
      const response = await axios.get(
        `https://developer.api.autodesk.com/modelderivative/v2/regions/eu/designdata/${urn}/metadata/${guid}/properties`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      console.log("response AA", response.data);

      const data = response.data.data;

      const { collection } = data;

      return collection as ElementItem[];
    } catch (error) {
      console.error("Error fetching model properties:", error);
      return [];
    }
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

  public async fetchTopics(projectId: string): Promise<ProjectTopic[] | null> {
    const { data, error } = await supabase
      .from("project_topics")
      .select("*")
      .eq("project_id", projectId);

    if (error) {
      console.error("Error fetching topics:", error);
    }

    return data;
  }

  public async fetchProject(urn: string) {
    this._urn = urn;

    console.log("Fetching project for urn:", urn);

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

    const modelElements = await this.getModelData(urn);
    const comments = await this._fetchInitialComments(projectId);
    const topics = await this.fetchTopics(projectId);

    this._project$.next(project);

    //dXJuOmFkc2sud2lwZW1lYTpmcy5maWxlOnZmLjdjT05oMDFSUkxHcEpMbXdpcGVtNWc_dmVyc2lvbj0x

    const entities: EntityItem[] = [
      {
        label: "comments",
        value: "comments",
        data: comments,
      },
      {
        label: "model elements",
        value: "modelElements",
        data: modelElements,
      },
    ];

    this._nodeService.addUserdataToNode(this._nodeId, {
      modelElements,
      comments,
      project,
      topics,
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

export interface EntityItem {
  label: string;
  value: string;
  data: any;
}

export default ViewerService;
