import ProjectService from "@/components/services/project-services/project-service/project-service";
import { Comment } from "@mui/icons-material";
import { SupabaseClient } from "@supabase/supabase-js";
import { BehaviorSubject } from "rxjs";
import { v4 as uuidv4 } from "uuid";

class CommentService {
  private _comments: Map<string | number, Comment>;
  public comments$ = new BehaviorSubject<Comment[]>([]);

  private _changes: any;

  private $setComments: any;
  private $setCommentLogId: any;

  private _eventSubscribers = new Map<string, EventCallback[]>();

  private _supabase: SupabaseClient;

  private _pending: boolean = false;

  constructor(private _projectService: ProjectService) {
    this._supabase = _projectService.supabase;
    this._comments = new Map();
  }

  private async _fetchInitialComments() {
    const project_id = this._projectService!.id as string;

    const projectUsers = this._projectService.projectUsers;

    const { data, error } = await this._supabase
      .from("comments") // Adjust if your table name is different
      .select(`*`)
      .eq("project_id", project_id)
      .not("author_id", "is", null) // Exclude comments where author_id is null
      .order("created_at", { ascending: true }); // Assuming you have a 'createdAt' column for sorting

    if (error) {
      console.error("Error fetching comments:", error);
    }

    this._comments = new Map(
      data?.map((comment) => [
        comment.id,
        {
          ...comment,
          author_username:
            projectUsers.get(comment.author_id)?.username || "Unknown",
        },
      ])
    );

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
    const projectUsers = this._projectService.projectUsers;

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

            this._comments.set(newComment.id, {
              ...newComment,
              author_username:
                projectUsers.get(newComment.author_id)?.username || "Unknown",
            } as Comment);
            needsUpdate = true;
          } else if (eventType === "UPDATE") {
            this._checkRelationToProject(newComment);

            this._comments.set(newComment.id, {
              ...newComment,
              author_username:
                projectUsers.get(newComment.author_id)?.username || "Unknown",
            } as Comment);
            needsUpdate = true;
          } else if (eventType === "DELETE") {
            this._checkRelationToProject(old);

            this._comments.delete(old.id);
            needsUpdate = true;
          }

          if (needsUpdate) this._upateComments();
        }
      )
      .subscribe();

    this._changes = changes;
  }

  private async _upateComments() {
    const topics = this._projectService.topics;

    const sortedComments = Array.from(this._comments.values()).sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    // Check if there is a pending update to avoid redundant calls
    if (!this._pending) {
      /* await */ this._checkAndUpdateMissingTags();
    }

    this._emit("COMMENTS_UPDATED", this._comments);
    /* this._projectService.markup3DService.updateMarkups();
    this._projectService.markup2DService.updateMarkups(); */

    this.comments$.next(sortedComments);
    this.$setComments(sortedComments);
    this.$setCommentLogId(uuidv4());
  }

  public async init() {
    await this._fetchInitialComments();
    await this._handleRealtimeChanges();
  }

  private async _checkAndUpdateMissingTags() {
    // Set the pending flag to true to indicate the process is running
    this._pending = true;

    const topics = this._projectService.topics;

    const commentsEntries = Array.from(this._comments.entries());

    for (let [commentId, comment] of commentsEntries) {
      // Initialize topicTags if it's null or undefined
      if (!comment.topic_tags) {
        comment.topic_tags = {};
      }

      const topicEntries = Array.from(topics.entries());

      for (let [topicId, prompt] of topicEntries) {
        // Check if the comment already has tags for this topic
        if (comment.topic_tags[topicId]) {
          continue; // Skip if tags for this topic already exist
        }

        // Construct the prompt for GPT
        const corePrompt =
          'The project is relevant to the AEC (Architecture, Engineering, and Construction) sector and involves the design and construction of buildings. Each message contains issues, comments, and other details regarding the building model and related processes. Your task is to analyze the given message and retrieve a list of tags with their percentage relevance. Return only a JSON array of strings and relevance (0-100) like [["tag1", 20], ["tag2", 40], ....]. Specific tags must be created according to the following instructions. You cannot add you own tags except given.:';

        const coreEndPrompt =
          "If you determine that no tags are relevant to the message, return an empty array.";

        const fullPrompt = `${corePrompt} ${prompt} ${coreEndPrompt}`;

        try {
          const response = await fetch("/api/gpt/create-message-v2", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: [
                {
                  role: "system",
                  content: fullPrompt,
                },
                {
                  role: "user",
                  content: comment.content,
                },
              ],
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          const tags = JSON.parse(data.data.choices[0].message.content);

          // Add the fetched tags to the comment's topic_tags
          comment.topic_tags[topicId] = tags;

          // Update the comment in Supabase
          const { error } = await this._supabase
            .from("comments")
            .update({ topic_tags: comment.topic_tags })
            .eq("id", commentId);

          if (error) {
            console.error("Error updating comment topic_tags:", error);
          } else {
            // Update the local comments map
            this._comments.set(commentId, comment);
          }
        } catch (error) {
          console.error("Error fetching tags from GPT API:", error);
        }
      }
    }

    // Reset the pending flag after processing
    this._pending = false;
  }

  public provideStates(states: {
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
    setCommentLogId: React.Dispatch<React.SetStateAction<string>>;
  }) {
    this.$setComments = states.setComments;
    this.$setCommentLogId = states.setCommentLogId;
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

  public async handleResolveComment(commentId: string, resolved: boolean) {
    console.log("Resolving comment:", commentId, resolved);

    const { data, error } = await this._supabase
      .from("comments")
      .update({ resolved })
      .eq("id", commentId);

    if (error) {
      console.error("Error resolving comment:", error);
    }
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
  markup_position_2d: { x: number; y: number } | null;
  view_state: any | null;
  parent_id: string | null;
  annotation: any[] | null;
  author_id: string;
  author_username: string;
  topic_tags: Record<string, string[]>;
  resolved: boolean;
}

export default CommentService;
