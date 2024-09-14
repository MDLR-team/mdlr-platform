import AuthService from "@/components/services/app-services/auth/auth-service";
import { supabase } from "@/components/supabase-client";
import { CLIENT_ID } from "@/pages/api/token";
import base64url from "base64url";

class ExplorerService {
  private _project_id: queryType;
  private _folder_id: queryType;

  private $setStatus: any;
  private $setData: any;

  public autoBrowsing = ["hub", "projects"];

  constructor() {}

  public checkAutoBrowsing() {
    // remove first item from autoBrowsing
    this.autoBrowsing.shift();
  }

  public async init() {
    this.$setStatus("loading");

    try {
      let data: (ProjectItem | FolderItem | FileItem)[] = [];

      if (this._project_id && this._folder_id) {
        const pid = this._project_id as string;
        const fid = this._folder_id as string;

        data = (await this._getFolderContent(pid, fid)) as (
          | FileItem
          | FolderItem
        )[];
      } else if (this._project_id && !this._folder_id) {
        const pid = this._project_id as string;

        data = (await this._getTopFolders(pid)) as FolderItem[];
      } else {
        data = (await this._getHubProjects()) as ProjectItem[];
      }

      const formattedData = data.map((item) => this._formatExplorerItem(item));

      this.$setData(formattedData);
      this.$setStatus("success");
    } catch (err) {
      console.error(err);
      this.$setStatus("error");
    }
  }

  private _formatExplorerItem(
    item: ProjectItem | FolderItem | FileItem
  ): ExplorerItem {
    let type: "projects" | "folders" | "items" = "projects";
    let link: string = "";
    let disabled: boolean = false;

    if (item.type === "projects") {
      type = "projects";

      link = `/projects/${item.id}`;
    } else if (item.type === "folders") {
      type = "folders";

      link = `/projects/${this._project_id}/folders/${item.id}`;
    } else if (item.type === "items") {
      type = "items";

      //check that format is supported. It should be .rvt, .ifc
      const name = item.attributes.displayName || item.attributes.name;
      const format =
        name.endsWith(".rvt") ||
        name.endsWith(".ifc") ||
        name.endsWith(".skp") ||
        name.endsWith(".3dm") ||
        name.endsWith(".nwd");
      //name.endsWith(".dwg") ||
      //name.endsWith(".xlsx") ||
      //name.endsWith(".pdf") ||
      //name.endsWith(".docx");

      if (!format) {
        disabled = true;
      }
      link = `/projects/${this._project_id}/folders/${this._folder_id}/items/${item.id}`;
    }

    return {
      id: item.id,
      type,
      name: item.attributes.displayName || item.attributes.name,
      source: item,
      link,
      disabled,
    };
  }

  private _getBim360ProjectId(urn: string): string {
    const decoded = base64url.decode(urn as string);

    const parts = decoded.split(":");
    const lastPart = parts[parts.length - 1];

    // Extract the substring after 'vf.' and before '?'
    const startIndex = lastPart.indexOf("vf.") + 3; // Add 3 to skip 'vf.'
    const endIndex = lastPart.indexOf("?");
    const projectId = lastPart.substring(startIndex, endIndex);

    return projectId;
  }

  public async createModel(
    authService: AuthService,
    urn: string,
    name?: string,
    workspaceId?: string
  ): Promise<any> {
    const bimId = this._getBim360ProjectId(urn);

    // If the project was not found, create a new one
    const { data: newProject, error: createError } = await supabase
      .from("projects")
      .insert([
        {
          title: name || "New Project",
          bim_id: bimId,
          bim_urn: urn,
          bim_client_id: CLIENT_ID,
          workspace_id: workspaceId,
        },
      ])
      .select("*")
      .single();

    return newProject;
  }

  public async getViewerLink(item: ExplorerItem): Promise<string> {
    if (item.type === "items") {
      const href = item.source.relationships.versions.links.related.href;

      const url = "/api/bim360/model-versions";

      const body = {
        href,
      };

      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data: ModelVersionData = await resp.json();

      const lastVersion = data.data[data.data.length - 1];
      const urn = lastVersion.relationships.derivatives.data.id;

      const viewerUrl = `/viewer/${urn}`;
      return viewerUrl;
    }

    return "";
  }

  public async getViewerUrn(item: ExplorerItem): Promise<string> {
    if (item.type === "items") {
      const href = item.source.relationships.versions.links.related.href;

      const url = "/api/bim360/model-versions";

      const body = {
        href,
      };

      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data: ModelVersionData = await resp.json();

      const lastVersion = data.data[data.data.length - 1];
      const urn = lastVersion.relationships.derivatives.data.id;

      return urn;
    }

    return "";
  }

  private async _getHubProjects(): Promise<ProjectItem[]> {
    const url = "/api/bim360/hub-projects";

    const projectsResp = await fetch(url);
    if (!projectsResp.ok) {
      throw new Error(await projectsResp.text());
    }

    const projects: ProjectItem[] = await projectsResp.json();

    return projects;
  }

  private async _getFolderContent(
    projectId: string,
    folderId: string
  ): Promise<any[]> {
    const body = {
      projectId,
      folderId,
    };

    const url = "/api/bim360/folder-content";

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await resp.json();

    return data;
  }

  private async _getTopFolders(projectId: string): Promise<FolderItem[]> {
    const body = {
      projectId,
    };

    const url = "/api/bim360/top-folders";

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    let data = await resp.json();

    // leave only Project Files
    data = data.filter(
      (item: FolderItem) => item.attributes.name === "Project Files"
    );

    return data;
  }

  public provideStates({ project_id, folder_id, setStatus, setData }: States) {
    this._project_id = project_id;
    this._folder_id = folder_id;

    this.$setStatus = setStatus;
    this.$setData = setData;
  }
}

type queryType = string | string[] | undefined;

interface States {
  project_id: queryType;
  folder_id: queryType;
  setStatus: any;
  setData: any;
}

export interface ProjectItem {
  type: "projects";
  id: string;
  attributes: {
    name: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface FolderItem {
  type: "folders";
  id: string;
  attributes: {
    name: string;
    displayName: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface FileItem {
  type: "items";
  id: string;
  attributes: {
    name: string;
    displayName: string;
    [key: string]: any;
  };
  relationships: {
    versions: {
      links: {
        related: {
          href: string;
        };
      };
    };
  };
  [key: string]: any;
}

interface ModelVersionData {
  data: ModelVersion[];
}

export interface ModelVersion {
  type: string;
  id: string;
  attributes: {
    name: string;
    displayName: string;
    createTime: string;
    [key: string]: any;
  };
  relationships: {
    derivatives: {
      data: {
        id: string;
        type: string;
      };
    };
  };
}

export interface ExplorerItem {
  id: string;
  type: "projects" | "folders" | "items";
  name: string;
  source: ProjectItem | FolderItem | FileItem;
  link: string;
  disabled: boolean;
}

export default ExplorerService;
