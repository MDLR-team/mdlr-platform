import { SupabaseClient } from "@supabase/supabase-js";
import { init } from "next/dist/compiled/webpack/webpack";

class CommentService {
  private _comments: Map<string | number, Comment>;

  private _changes: any;

  private $setComments: any;

  constructor(private _supabase: SupabaseClient) {
    this._comments = new Map();
  }

  private async _fetchInitialComments() {
    const { data, error } = await this._supabase
      .from("comments") // Adjust if your table name is different
      .select("*")
      .order("created_at", { ascending: true }); // Assuming you have a 'createdAt' column for sorting

    if (error) {
      console.error("Error fetching comments:", error);
    }

    this._comments = new Map(data?.map((comment) => [comment.id, comment]));

    this._upateComments();
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

          if (eventType === "INSERT") {
            this._comments.set(newComment.id, newComment as Comment);
          } else if (eventType === "UPDATE") {
            this._comments.set(newComment.id, newComment as Comment);
          } else if (eventType === "DELETE") {
            this._comments.delete(old.id);
          }

          this._upateComments();
        }
      )
      .subscribe();

    this._changes = changes;
  }

  private _upateComments() {
    this.$setComments(Array.from(this._comments.values()).reverse());
  }

  public init() {
    this._fetchInitialComments();
    this._handleRealtimeChanges();
  }

  public provideStates(states: {
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  }) {
    this.$setComments = states.setComments;
  }

  public dispose() {
    if (this._changes) {
      this._supabase.removeChannel(this._changes);
    }

    this.$setComments = () => {};
    this._comments.clear();
  }
}

export interface Comment {
  id: string;
  content: string;
  created_at: string;
}

export default CommentService;
