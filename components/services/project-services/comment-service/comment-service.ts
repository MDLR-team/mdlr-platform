import ProjectService from "@/components/services/project-services/project-service/project-service";
import { SupabaseClient } from "@supabase/supabase-js";
import { init } from "next/dist/compiled/webpack/webpack";

class CommentService {
  private _comments: Map<string | number, Comment>;

  private _changes: any;

  private _projectService: ProjectService | undefined;

  private $setComments: any;

  private _eventSubscribers = new Map<string, EventCallback[]>();

  constructor(private _supabase: SupabaseClient) {
    this._comments = new Map();
  }

  private async _fetchInitialComments() {
    const project_id = this._projectService!.id as string;

    const { data, error } = await this._supabase
      .from("comments") // Adjust if your table name is different
      .select(`*`)
      .eq("project_id", project_id)
      .order("created_at", { ascending: true }); // Assuming you have a 'createdAt' column for sorting

    if (error) {
      console.error("Error fetching comments:", error);
    }

    this._comments = new Map(data?.map((comment) => [comment.id, comment]));

    this._upateComments();
  }

  private _checkRelationToProject(entry: any): boolean {
    if (entry && Object.keys(entry).length) {
      if (entry.project_id === this._projectService?.id) return true;
    }

    return false;
  }

  // realtime changes will be handled here
  private _handleRealtimeChanges() {
    const changes = this._supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
        },
        (payload) => {
          const { old, new: newComment, eventType } = payload;

          let needsUpdate = false;

          if (eventType === "INSERT") {
            this._checkRelationToProject(newComment);

            this._comments.set(newComment.id, newComment as Comment);
            needsUpdate = true;
          } else if (eventType === "UPDATE") {
            this._checkRelationToProject(newComment);

            this._comments.set(newComment.id, newComment as Comment);
            needsUpdate = true;
          } else if (eventType === "DELETE") {
            this._checkRelationToProject(old);

            this._comments.delete(old.id);
            needsUpdate = true;
          }

          if (needsUpdate)
            console.log("%ceventType", "color: green", eventType);

          if (needsUpdate) this._upateComments();
        }
      )
      .subscribe();

    this._changes = changes;
  }

  private _upateComments() {
    const sortedComments = Array.from(this._comments.values()).sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    this._emit("COMMENTS_UPDATED", this._comments);

    this.$setComments(sortedComments);
  }

  public init() {
    this._fetchInitialComments();
    this._handleRealtimeChanges();
  }

  public provideStates(states: {
    projectService: ProjectService;
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  }) {
    this.$setComments = states.setComments;
    this._projectService = states.projectService;
  }

  // Subscribe to an event
  public on(event: string, callback: EventCallback) {
    const subscribers = this._eventSubscribers.get(event) || [];
    subscribers.push(callback);
    this._eventSubscribers.set(event, subscribers);
  }

  // Unsubscribe from an event
  public off(event: string, callback: EventCallback) {
    const subscribers = this._eventSubscribers.get(event) || [];
    const subscriberIndex = subscribers.indexOf(callback);
    if (subscriberIndex > -1) {
      subscribers.splice(subscriberIndex, 1);
      this._eventSubscribers.set(event, subscribers);
    }
  }

  // Emit an event
  private _emit(event: string, ...args: any[]) {
    const subscribers = this._eventSubscribers.get(event) || [];
    subscribers.forEach((callback) => {
      callback(...args);
    });
  }

  public get comments() {
    return this._comments;
  }

  public dispose() {
    if (this._changes) {
      this._supabase.removeChannel(this._changes);
    }

    this.$setComments = () => {};
    this._comments.clear();
  }
}

type EventCallback = (...args: any[]) => void;

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  markup_position: { x: number; y: number; z: number } | null;
  view_state: any | null;
  parent_id: string | null;
}

export default CommentService;
