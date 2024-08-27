import base64url from "base64url";

import { SupabaseClient } from "@supabase/supabase-js";
import { Project } from "@/components/types/supabase-data.types";
import GlobalStatesService from "../global-states-service/global-states-service";
import CommentService from "../comment-service/comment-service";
import ViewerServiceAggr from "@/components/forge/viewer-service-aggr";
import AuthService from "../../app-services/auth/auth-service";
import { CLIENT_ID } from "@/pages/api/token";
import { BehaviorSubject } from "rxjs";
import MarkupService from "../../markup-service/markup-service";
import TopicsService from "../topics-service/topics-service";
import ApsService from "../../aps-service/aps-service";
import defaultProjectTopics from "./topics.json";
import PromptSearchService from "@/components/prompt-search/prompt-search-service/prompt-search-service";
import WorkspaceService from "../../workspace-services/workspace/workspace-service";

class ProjectService {
  private _wasInitialized: boolean = false;

  // Project metadata
  public metadata: any;

  public id: string | null = null;
  public title: string = "";
  public bimId: string | null = null;
  public createdAt: string | null = null;
  public thumbnail: string | null = null;
  public workspaceId: number | null = null;

  public topics: Map<string, string> = new Map();
  private _topics$ = new BehaviorSubject<Map<string, string>>(new Map());

  private _topicsItems: Map<string, ProjectTopic> = new Map();
  private _topicsItems$ = new BehaviorSubject<Map<string, ProjectTopic>>(
    new Map()
  );

  public projectUsers: Map<string, ProjectUser>;

  public isReady$ = new BehaviorSubject<boolean>(false);
  public title$ = new BehaviorSubject<string>("");
  public thumbnail$ = new BehaviorSubject<string | null>(null);
  public projectUsers$ = new BehaviorSubject<ProjectUser[]>([]);
  public workspaceId$ = new BehaviorSubject<number | null>(null);

  private _globalStatesService: GlobalStatesService;
  private _commentService: CommentService;
  //private _activeCommentService: ActiveCommentService;
  private _viewerServiceAggr: ViewerServiceAggr;

  /* private _markup3DService: Markup3DService;
  private _markup2DService: Markup2DService; */
  private _markupService: MarkupService;

  //private _hotkeyService: HotkeyService;

  private _topicsService: TopicsService;
  private _apsService: ApsService;
  private _promptSearchService: PromptSearchService;

  constructor(
    private _supabase: SupabaseClient,
    private _authService: AuthService,
    private _workspaceService: WorkspaceService,
    private _urn: string
  ) {
    this._globalStatesService = new GlobalStatesService(this);
    this._topicsService = new TopicsService(this);
    this._commentService = new CommentService(this);
    //this._activeCommentService = new ActiveCommentService(this);
    this._viewerServiceAggr = new ViewerServiceAggr(this);
    this._apsService = new ApsService(this);
    this._promptSearchService = new PromptSearchService(this);

    this.projectUsers = new Map();

    /* this._markup3DService = new Markup3DService(this);
    this._markup2DService = new Markup2DService(this); */
    this._markupService = new MarkupService(this);

    //this._hotkeyService = new HotkeyService(this);

    this.provideStates();
  }

  private async init() {
    const urn = this._urn;
    if (!urn) return;

    const bimId = this._getBim360ProjectId(urn as string);
    const supabase = this._supabase;

    let { data: projects, error: findError } = await supabase
      .from("projects")
      .select(
        `
        *,
        workspaces!inner(
          id,
          workspace_users(user_id)
        )
      `
      )
      .eq("bim_id", bimId)
      .single();

    let { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*");

    // If the project is found, return it

    if (projects) {
      await this.checkAndInsertProjectTopics(projects.id); // Check project topics

      return { project: projects, profiles: profileData, error: null };
    }

    // If the project was not found, create a new one
    const { data: newProject, error: createError } = await supabase
      .from("projects")
      .insert([
        {
          title: "No name",
          bim_id: bimId,
          bim_urn: urn,
          bim_client_id: CLIENT_ID,
        },
      ])
      .select("*")
      .single();

    const userMetadata = this._authService.userMetadata;
    if (userMetadata) {
      const { id: userId } = userMetadata;

      // Create the userprojects link
      const { error: userProjectError } = await supabase
        .from("userprojects")
        .insert([
          {
            project_id: newProject.id,
            user_id: userId,
          },
        ]);

      if (userProjectError) {
        console.error("Error creating userprojects link:", userProjectError);
        return { project: null, error: userProjectError };
      }
    }

    if (createError) {
      console.error("Error creating new project:", createError);
      return { project: null, error: createError };
    }

    await this.checkAndInsertProjectTopics(newProject.id); // Check and insert project topics

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

    console.log("BIM 360 Project ID:", projectId);

    return projectId;
  }

  public async updateMetadata(metadata: Partial<Project>) {
    const { data, error } = await this._supabase
      .from("projects")
      .update(metadata)
      .eq("id", this.id);

    if (error) {
      console.error("Error updating project metadata:", error);
    } else {
      console.log("Project metadata updated:", data);
    }

    if (metadata.title) {
      this.title = metadata.title;
      this.title$.next(this.title);
    }

    if (metadata.thumbnail) {
      this.thumbnail = metadata.thumbnail;
      this.thumbnail$.next(this.thumbnail);
    }

    return { data, error };
  }

  public async uploadThumbnailFromBase64(
    base64: string,
    _fileName?: string
  ): Promise<string | null> {
    const blob = dataURLToBlob(base64);

    // Generate a unique file name for the thumbnail
    // Adjust the naming convention as necessary
    const __fileName = `${this.id}-${Date.now()}.png`;
    const fileName = _fileName || __fileName;

    const { data, error } = await this._supabase.storage
      .from("thumbs")
      .upload(fileName, blob, {
        cacheControl: "3600",
        upsert: true, // Set to true if you want to overwrite existing files with the same name
      });

    if (error) {
      console.error("Failed to upload thumbnail:", error.message);
    } else {
      console.log("Thumbnail uploaded successfully:", fileName);
    }

    const supabaseURL =
      "https://ixuszjrnviwgquuqfbmk.supabase.co/storage/v1/object/public/";

    if (data) {
      const thumbnailURL = `${supabaseURL}thumbs/${data!.path}`;
      return thumbnailURL;
    }

    return null;
  }

  public async addDefaultTopics() {
    const topics = defaultProjectTopics;

    const { data, error } = await this._supabase
      .from("project_topics")
      .insert(topics.map((topic) => ({ ...topic, project_id: this.id })));

    if (error) {
      console.error("Error adding default topics:", error);
      return;
    }

    await this.checkAndInsertProjectTopics(this.id as string);
  }

  private async checkAndInsertProjectTopics(projectId: string) {
    const { data: topics, error } = await this._supabase
      .from("project_topics")
      .select("id, prompt, tags, name")
      .eq("project_id", projectId);

    if (error && error.code !== "PGRST116") {
      console.error("Error checking project topics:", error);
      return;
    }

    if (topics && topics.length > 0) {
      topics.forEach((topic: ProjectTopic) => {
        this.topics.set(topic.id, topic.prompt);
        this._topicsItems.set(topic.id, topic as ProjectTopic);
      });
    }

    this._topics$.next(this.topics);
    this._topicsItems$.next(this._topicsItems);
  }

  public async provideStates() {
    if (this._wasInitialized) return;

    this._wasInitialized = true;

    const data = await this.init();

    if (data) {
      const { project, profiles } = data;

      if (project && profiles) {
        this.id = project.id;
        this.title = project.title;
        this.bimId = project.bim_id;
        this.createdAt = project.created_at;
        this.thumbnail = project.thumbnail;
        this.workspaceId = project.workspace_id;

        // Populate the projectUsers map
        this.projectUsers.clear();

        const profilesMap = new Map(
          profiles.map((profile: any) => [profile.user_id, profile])
        );

        project.workspaces.workspace_users.forEach((userproject: any) => {
          const profile = profilesMap.get(userproject.user_id);

          if (profile) {
            const projectUser: ProjectUser = {
              id: profile.user_id,
              username: profile.username,
            };

            this.projectUsers.set(profile.user_id, projectUser);
          }
        });

        this.projectUsers$.next(Array.from(this.projectUsers.values()));
        this.title$.next(this.title);
        this.thumbnail$.next(this.thumbnail);
        this.workspaceId$.next(this.workspaceId);
        this.isReady$.next(true);

        this._commentService.init();
      }
    }
  }

  public get globalStatesService() {
    return this._globalStatesService;
  }

  public get commentService() {
    return this._commentService;
  }

  /* public get activeCommentService() {
    return this._activeCommentService;
  } */

  /*  public get hotkeyService() {
    return this._hotkeyService;
  } */

  public get viewerServiceAggr() {
    return this._viewerServiceAggr;
  }

  /* public get markup3DService() {
    return this._markup3DService;
  }

  public get markup2DService() {
    return this._markup2DService;
  } */

  public get markupService() {
    return this._markupService;
  }

  public get topicsService() {
    return this._topicsService;
  }

  public get apsService() {
    return this._apsService;
  }

  public get workspaceService() {
    return this._workspaceService;
  }

  public get promptSearchService() {
    return this._promptSearchService;
  }

  public get supabase() {
    return this._supabase;
  }

  public get authService() {
    return this._authService;
  }

  public get topics$() {
    return this._topics$.asObservable();
  }

  public get topicsItems$() {
    return this._topicsItems$.asObservable();
  }

  public dispose() {
    this.projectUsers.clear();

    this._globalStatesService.dispose();
    this._commentService.dispose();
    //this._activeCommentService.dispose();
    this._viewerServiceAggr.dispose();

    /* this._markup3DService.dispose();
    this._markup2DService.dispose(); */
    this._markupService.dispose();

    //this._hotkeyService.dispose();

    this._topicsService.dispose();
    this._apsService.dispose();
  }
}

// Utility function to convert a data URL to a Blob
function dataURLToBlob(dataURL: string) {
  const byteString = atob(dataURL.split(",")[1]);
  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export interface ProjectUser {
  id: string;
  username: string;
}

export interface ProjectTopic {
  id: string;
  prompt: string;
  tags: string[];
  name: string;
}

export default ProjectService;
