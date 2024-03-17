import { Project } from "@/components/types/supabase-data.types";
import { SupabaseClient } from "@supabase/supabase-js";

class WorkspaceService {
  private _projects: any[] = [];

  private $setProjects: (projects: any[]) => void = () => {};
  private $setIsReady: (isReady: boolean) => void = () => {};

  constructor(private _supabase: SupabaseClient) {}

  private async _init() {
    const supabase = this._supabase;

    let { data, error } = await supabase
      .from("projects")
      .select("*")
      .not("bim_id", "is", null)
      .not("bim_urn", "is", null)
      .order("created_at", { ascending: false });

    const projects = data as Project[];

    this._projects = projects;
    this.$setProjects(projects);
    this.$setIsReady(true);
  }

  public provideStates(states: States) {
    this.$setProjects = states.setProjects;
    this.$setIsReady = states.setIsReady;

    this._init();
  }
}

interface States {
  setProjects: (projects: any[]) => void;
  setIsReady: (isReady: boolean) => void;
}

export default WorkspaceService;
