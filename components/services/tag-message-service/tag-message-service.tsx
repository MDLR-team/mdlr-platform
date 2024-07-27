import { GptResponseData } from "@/components/canvas/node-types/node-sticker-type/service/sticker-service.types";
import { supabase } from "@/components/supabase-client";
import { SupabaseClient } from "@supabase/supabase-js";
import { BehaviorSubject } from "rxjs";
import { TagProject } from "../tag-project-service/tag-project-service";

class TagMessageService {
  private _supabase: SupabaseClient;
  private _tagMessages: Map<string, TagMessage>;

  private _messages$ = new BehaviorSubject<TagMessage[]>([]);

  private _project_id: number;

  private _categories: string[] = []; /* [
    "Design Changes and Revisions",
    "Technical and Engineering Challenges",
    "Budget and Cost Management",
    "Time Management",
    "Resource Availability",
    "Site and Environmental Constraints",
  ]; */

  private _statistics = new Map<string, Set<string>>();
  private _statistics$ = new BehaviorSubject<Statistics>(new Map());

  constructor(project_id: string) {
    this._supabase = supabase;
    this._tagMessages = new Map();

    this._project_id = parseInt(project_id);

    this._fetchProject();
    this._fetchInitialTagMessages();
    this._handleRealtimeChanges();
  }

  private async _fetchProject() {
    const { data, error } = await this._supabase
      .from("tag_projects")
      .select("*")
      .eq("id", this._project_id)
      .single();

    if (error) {
      console.error("Error fetching project:", error);
    }

    if (data) {
      this._categories = (data as TagProject).tags;
    }
  }

  private _fetchInitialTagMessages() {
    this._supabase
      .from("tag_messages")
      .select("*")
      .eq("project_id", this._project_id)
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching tag messages:", error);
        }

        if (data) {
          data.forEach((tagMessage: TagMessage) => {
            this._tagMessages.set(tagMessage.id, tagMessage);
          });

          this._updateTagMessages();
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
          table: "tag_messages",
        },
        (payload) => {
          const { old, new: tagMessage, eventType } = payload;

          if (eventType === "INSERT" || eventType === "UPDATE") {
            this._tagMessages.set(tagMessage.id, tagMessage as TagMessage);
          } else if (eventType === "DELETE") {
            this._tagMessages.delete((old as TagMessage).id);
          }

          this._updateTagMessages();
        }
      )
      .subscribe();
  }

  public async addMessage(tagMessage: Partial<TagMessage>) {
    const content = tagMessage.content;
    const categories = this._categories;

    const prompt = `Analyze the following message: ${content}. And categorize it by relevance to the following categories: ${categories.join(
      ", "
    )} (Note you can use only the give categories!). And for each category think of a 1-2 subcategory that could be relevant to the message.
      return the main tags and subtags in the following format:
      {"tags": [{"value": "category", "relevance": 0-1}, ...]
      "subtags": [{"value": "subcategory", "relevance": 0-1, "parentTag": "category"}, ...]
      }
    `;

    try {
      const response = await fetch("/api/gpt/create-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [prompt], // Sending the input value as a message
        }),
      });

      const data = (await response.json()) as GptResponseData;
      const generatedMessage = data.data.choices[0].message.content;

      const parsedMessage = JSON.parse(generatedMessage) as {
        tags: Tag[];
        subtags: SubTag[];
      };

      await this._supabase.from("tag_messages").insert([
        {
          content: tagMessage.content,
          tags: parsedMessage.tags,
          subtags: parsedMessage.subtags,
          project_id: this._project_id,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }

    // await this._supabase.from("tag_messages").insert([tagMessage]);
  }

  public get statistics$() {
    return this._statistics$.asObservable();
  }

  public get messages$() {
    return this._messages$.asObservable();
  }

  private _updateTagMessages() {
    this._statistics.clear();
    this._tagMessages.forEach((tagMessage) => {
      tagMessage.tags.forEach((tag) => {
        if (!this._statistics.has(tag.value)) {
          this._statistics.set(tag.value, new Set());
        }
      });

      tagMessage.subtags.forEach((subtag) => {
        if (!this._statistics.has(subtag.parentTag)) {
          this._statistics.set(subtag.parentTag, new Set());
        }

        this._statistics.get(subtag.parentTag)!.add(subtag.value);
      });
    });

    this._statistics$.next(this._statistics);
    this._messages$.next(Array.from(this._tagMessages.values()));
  }

  public dispose() {
    this._tagMessages.clear();
    this._messages$.complete();
  }
}

export interface TagMessage {
  id: string;
  content: string;
  tags: Tag[];
  subtags: SubTag[];
  project_id: string;
}

export interface Tag {
  value: string;
  relevance: number;
}

export interface SubTag {
  value: string;
  relevance: number;
  parentTag: string;
}

export type Statistics = Map<string, Set<string>>;

export default TagMessageService;
