import { supabase } from "@/components/supabase-client";
import { SupabaseClient } from "@supabase/supabase-js";
import { BehaviorSubject } from "rxjs";

class TagProjectService {
  private _supabase: SupabaseClient;

  private _tagProject: Map<number, TagProject>;
  private _tagProjects$ = new BehaviorSubject<TagProject[]>([]);

  private _isProjectWindowOpen$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this._supabase = supabase;
    this._tagProject = new Map();

    this._fetchInitialTagProjects();
    this._handleRealtimeChanges();
  }

  private _fetchInitialTagProjects() {
    this._supabase
      .from("tag_projects")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching tag projects:", error);
        }

        if (data) {
          data.forEach((tagProject: TagProject) => {
            this._tagProject.set(tagProject.id, tagProject);
          });

          this._updateTagProjects();
        }
      });
  }

  private _handleRealtimeChanges() {
    this._supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tag_projects",
        },
        (payload) => {
          const { old, new: tagProject, eventType } = payload;

          if (eventType === "INSERT" || eventType === "UPDATE") {
            this._tagProject.set(tagProject.id, tagProject as TagProject);
          } else if (eventType === "DELETE") {
            this._tagProject.delete((old as TagProject).id);
          }

          this._updateTagProjects();
        }
      )
      .subscribe();
  }

  public async createTagProject(tagProject: Partial<TagProject>) {
    const { data, error } = await this._supabase
      .from("tag_projects")
      .insert([tagProject])
      .single();

    if (error) {
      console.error("Error creating tag project:", error);
    }

    this._isProjectWindowOpen$.next(false);
  }

  public get tagProjects$() {
    return this._tagProjects$.asObservable();
  }

  public get isProjectWindowOpen$() {
    return this._isProjectWindowOpen$.asObservable();
  }

  public openProjectWindow() {
    this._isProjectWindowOpen$.next(true);
  }

  public closeProjectWindow() {
    this._isProjectWindowOpen$.next(false);
  }

  private _updateTagProjects() {
    this._tagProjects$.next(Array.from(this._tagProject.values()));
  }

  public dispose() {
    this._tagProjects$.complete();
  }
}

export interface TagProject {
  id: number;
  name: string;
  tags: string[];
}

export default TagProjectService;
