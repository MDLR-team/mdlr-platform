import { Project, Workspace } from "@/components/types/supabase-data.types";
import { SupabaseClient } from "@supabase/supabase-js";
import { CLIENT_ID } from "@/pages/api/token";
import AuthService from "../../app-services/auth/auth-service";
import { BehaviorSubject } from "rxjs";
import { ProjectUser } from "../../project-services/project-service/project-service";

class WorkspaceService {
  private _projects: any[] = [];
  private _activeWorkspace: Workspace | null = null;

  private $setProjects: (projects: any[]) => void = () => {};
  private $setIsReady: (isReady: boolean) => void = () => {};

  public workspaces$ = new BehaviorSubject<Workspace[]>([]);
  public activeWorkspace$ = new BehaviorSubject<Workspace | null>(null);
  public workspaceUsers$ = new BehaviorSubject<ProjectUser[]>([]);

  constructor(
    private _supabase: SupabaseClient,
    private _authService: AuthService
  ) {
    this.activeWorkspace$.subscribe(async (workspace) => {
      if (workspace) {
        const users = await this.getWorkspaceUsers(workspace.id);
        this.workspaceUsers$.next(users);
      }
    });
  }

  private async getWorkspaces() {
    const supabase = this._supabase;
    const user_id = this._authService.userMetadata?.id;

    const { data: workspaces, error } = await supabase
      .from("workspaces")
      .select("*, workspace_users!inner(workspace_id)")
      .eq("workspace_users.user_id", user_id);

    if (error) {
      console.error("Error fetching workspaces:", error);
      return;
    }

    if (!workspaces || workspaces.length === 0) {
      const newWorkspace = await this.addWorkspace(
        "Default Workspace",
        user_id!
      );
      if (newWorkspace) {
        this._activeWorkspace = newWorkspace;
        this.activeWorkspace$.next(newWorkspace);
      }
    } else {
      this._activeWorkspace = workspaces[0] as Workspace;
      this.activeWorkspace$.next(workspaces[0]);
    }

    this.workspaces$.next(workspaces);

    await this.getProjectsForActiveWorkspace();
  }

  private async getProjectsForActiveWorkspace() {
    const supabase = this._supabase;

    if (!this._activeWorkspace) {
      console.error("No active workspace found.");
      return;
    }

    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .select(
        `
        *,
        userprojects!inner(user_id)
      `
      )
      .eq("workspace_id", this._activeWorkspace.id)
      .not("bim_id", "is", null)
      .eq("bim_client_id", CLIENT_ID)
      .not("bim_urn", "is", null)
      .order("created_at", { ascending: false });

    if (projectError) {
      console.error("Error fetching projects:", projectError);
      return;
    }

    let { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*");

    if (profileError) {
      console.error("Error fetching profiles:", profileError);
      return;
    }

    const profiles = profileData as any;
    const profilesMap = new Map();
    profiles.forEach((profile: any) => {
      profilesMap.set(profile.user_id, profile);
    });

    const projects = projectData as Project[];
    projects.forEach((project) => {
      project.userprojects.forEach((userproject: any) => {
        const profile = profilesMap.get(userproject.user_id);
        userproject.username = profile?.username;
      });
    });

    this._projects = projects;
    this.$setProjects(projects);
    this.$setIsReady(true);
  }

  public async addWorkspace(
    name: string,
    userId: string
  ): Promise<Workspace | null> {
    const { data: newWorkspace, error: insertError } = await this._supabase
      .from("workspaces")
      .insert([{ name }])
      .select("*")
      .single();

    if (insertError) {
      console.error("Error creating new workspace:", insertError);
      return null;
    }

    const { error: userInsertError } = await this._supabase
      .from("workspace_users")
      .insert([{ user_id: userId, workspace_id: newWorkspace.id, role: 1 }]);

    if (userInsertError) {
      console.error(
        "Error associating user with new workspace:",
        userInsertError
      );
      return null;
    }

    // Update the workspaces observable
    const updatedWorkspaces = [...this.workspaces$.getValue(), newWorkspace];
    this.workspaces$.next(updatedWorkspaces);

    return newWorkspace as Workspace;
  }

  public async renameWorkspace(
    workspaceId: number,
    newName: string
  ): Promise<void> {
    const { error: updateError } = await this._supabase
      .from("workspaces")
      .update({ name: newName })
      .eq("id", workspaceId);

    if (updateError) {
      console.error("Error renaming workspace:", updateError);
      return;
    }

    // Update the workspaces observable with the new name
    const updatedWorkspaces = this.workspaces$
      .getValue()
      .map((workspace) =>
        workspace.id === workspaceId
          ? { ...workspace, name: newName }
          : workspace
      );
    this.workspaces$.next(updatedWorkspaces);

    // If the renamed workspace is the active one, update it as well
    if (this._activeWorkspace?.id === workspaceId) {
      this._activeWorkspace = { ...this._activeWorkspace, name: newName };
      this.activeWorkspace$.next(this._activeWorkspace);
    }
  }

  public async getWorkspaceUsers(workspaceId: number): Promise<ProjectUser[]> {
    const { data: workspaceUsers, error } = await this._supabase
      .from("workspace_users")
      .select("user_id")
      .eq("workspace_id", workspaceId);

    if (error) {
      console.error("Error fetching workspace users:", error);
      return [];
    }

    const userIds = workspaceUsers.map(
      (workspaceUser) => workspaceUser.user_id
    );

    const { data: users, error: userError } = await this._supabase
      .from("profiles")
      .select("*")
      .in("user_id", userIds);

    if (userError) {
      console.error("Error fetching user details:", userError);
      return [];
    }

    return users as ProjectUser[];
  }

  public async addUserToWorkspace(
    workspaceId: number,
    identifier: string
  ): Promise<string | null> {
    let userId: string | null = null;

    // Attempt to fetch user by email from the users table
    const { data: emailUser, error: emailUserError } = await this._supabase
      .from("users")
      .select("id")
      .eq("email", identifier)
      .single();

    if (emailUser) {
      userId = emailUser.id;
    }

    // If not found by email, attempt to fetch by username from the profiles table
    if (!userId) {
      const { data: profileUser, error: profileUserError } =
        await this._supabase
          .from("profiles")
          .select("user_id")
          .eq("username", identifier)
          .single();

      if (profileUser) {
        userId = profileUser.user_id;
      } else if (profileUserError?.code !== "PGRST116") {
        console.error("Error fetching user by username:", profileUserError);
        return "Error searching for user by username.";
      }
    }

    if (!userId) {
      return "User not found.";
    }

    // Check if the user is already in the workspace
    const { data: existingUser, error: existingUserError } =
      await this._supabase
        .from("workspace_users")
        .select("*")
        .eq("workspace_id", workspaceId)
        .eq("user_id", userId)
        .single();

    if (existingUser) {
      return "User is already a member of the workspace.";
    }

    if (existingUserError && existingUserError.code !== "PGRST116") {
      console.error(
        "Error checking existing user in workspace:",
        existingUserError
      );
      return "Error adding user to workspace.";
    }

    // Add the user to the workspace with the VIEWER role
    const { error: insertError } = await this._supabase
      .from("workspace_users")
      .insert([{ user_id: userId, workspace_id: workspaceId, role: 3 }]); // Role 3 = VIEWER

    if (insertError) {
      console.error("Error adding user to workspace:", insertError);
      return "Error adding user to workspace.";
    }

    await this.getWorkspaceUsers(workspaceId);

    return null; // Success
  }

  public provideStates(states: States) {
    this.$setProjects = states.setProjects;
    this.$setIsReady = states.setIsReady;

    this.getWorkspaces();
  }
}

interface States {
  setProjects: (projects: any[]) => void;
  setIsReady: (isReady: boolean) => void;
}

export default WorkspaceService;
