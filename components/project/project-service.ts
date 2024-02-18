import { NextRouter } from "next/router";
import base64url from "base64url";

import { SupabaseClient } from "@supabase/supabase-js";

class ProjectService {
  private _router: any;

  private _wasInitialized: boolean = false;

  public id: string | null = null;
  public title: string | null = null;
  public bimId: string | null = null;
  public createdAt: string | null = null;

  private $setIsReady: any;

  constructor(private _supabase: SupabaseClient) {}

  private async init() {
    const { query } = this._router;
    const { urn } = query;

    if (!urn) return;

    const bimId = this._getBim360ProjectId(urn as string);
    const supabase = this._supabase;

    let { data: projects, error: findError } = await supabase
      .from("projects")
      .select("*")
      .eq("bim_id", bimId)
      .single();

    if (findError) {
      console.error("Error finding project:", findError);
      return { project: null, error: findError };
    }

    // If the project is found, return it
    if (projects) {
      return { project: projects, error: null };
    }

    // If the project was not found, create a new one
    const { data: newProject, error: createError } = await supabase
      .from("projects")
      .insert([
        {
          title: "No name",
          bim_id: bimId,
        },
      ])
      .select("*")
      .single();

    if (createError) {
      console.error("Error creating new project:", createError);
      return { project: null, error: createError };
    }

    // Return the newly created project
    return { project: newProject, error: null };
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

  public async provideStates(states: States) {
    if (this._wasInitialized) return;

    this._wasInitialized = true;

    this._router = states.router;
    this.$setIsReady = states.setIsReady;

    const data = await this.init();

    if (data) {
      const { project } = data;

      this.id = project.id;
      this.title = project.title;
      this.bimId = project.bim_id;
      this.createdAt = project.created_at;

      this.$setIsReady(true);
    }
  }
}

interface ProjectType {
  id: string;
  title: string;
  bim_id: string;
  created_at: string;
}

interface States {
  router: NextRouter;
  setIsReady: (value: boolean) => void;
}

export default ProjectService;
