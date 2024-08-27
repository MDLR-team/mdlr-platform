import { GptResponseData } from "@/components/canvas/node-types/node-sticker-type/service/sticker-service.types";
import { Comment } from "@/components/services/project-services/comment-service/comment-service";
import ProjectService from "@/components/services/project-services/project-service/project-service";
import alasql from "alasql";
import { BehaviorSubject } from "rxjs";

class PromptSearchService {
  public filteredIds$ = new BehaviorSubject<Set<string> | null>(null);
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(private _projectService: ProjectService) {}

  // Helper method to send a request to the GPT API
  private async _sendGptRequest(
    systemMessage: string,
    userMessage: string
  ): Promise<string> {
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
              content: systemMessage,
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
        }),
      });

      const data = (await response.json()) as GptResponseData;
      return data.data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error sending GPT request:", error);
      return "";
    }
  }

  private _formatComments(comments: Comment[]): FormattedComment[] {
    return comments
      .filter((comment) => !comment.parent_id)
      .map((comment) => {
        const tags = new Set(Object.keys(comment.topic_tags));
        const mentioned_usernames = this._extractMentions(comment.content);

        return {
          id: comment.id,
          content: comment.content,
          tags,
          resolved: comment.resolved,
          images: comment.images,
          created_at: comment.created_at,
          author_username: comment.author_username,
          mentioned_usernames,
        };
      });
  }

  private _extractMentions(message: string): string[] {
    const mentionRegex = /@\[([^\]]+)\]\([^\)]+\)/g;
    let mentions = [];
    let match;

    while ((match = mentionRegex.exec(message)) !== null) {
      mentions.push(match[1]);
    }

    return mentions;
  }

  private _cleanBackticks(input: string): string {
    let cleaned = input.trim();
    if (cleaned.startsWith("```") && cleaned.endsWith("```")) {
      cleaned = cleaned.slice(3, -3).trim();
    } else if (cleaned.startsWith("`") && cleaned.endsWith("`")) {
      cleaned = cleaned.slice(1, -1).trim();
    }
    return cleaned;
  }

  private async _needsContentEstimation(prompt: string): Promise<boolean> {
    const systemMessage = `
      You are an AI that helps determine if a prompt requires content estimation of the comments.
      The comments are from the architecture, engineering, and construction (AEC) sector. When given a natural language prompt, you must return either "yes" or "no".

      - Return "yes" if the prompt asks for comments about a specific topic, theme, or content (e.g., "Show me comments about safety")
      - Return "yes" if the prompt asks about date, author or mentioned users (e.g., "Show me comments by John")
      - Return "no" if the prompt is asking for filtering or sorting by clear metadata like author, date, or resolution status.
    `;

    const response = await this._sendGptRequest(systemMessage, prompt);
    return response.toLowerCase() === "yes";
  }

  private async _filterRelevantComments(
    comments: FormattedComment[],
    prompt: string
  ): Promise<FormattedComment[]> {
    const filteredComments: FormattedComment[] = [];

    for (const comment of comments) {
      const systemMessage = `
        You are an AI that determines if a comment is relevant to a given prompt. The comment is from the architecture, engineering, and construction (AEC) sector.

        - Comment author: ${comment.author_username}
        - Comment date: ${comment.created_at}
        - Mentioned users: ${comment.mentioned_usernames.join(", ")}
        - Comment: ${comment.content}
        - Prompt: ${prompt}

        Return "yes" if the comment is relevant, and "no" if it is not.
      `;

      const isRelevant = await this._sendGptRequest(systemMessage, prompt);
      if (isRelevant.toLowerCase() === "yes") {
        filteredComments.push(comment);
      }
    }

    return filteredComments;
  }

  private async _validateAndRefineSQL(
    prompt: string,
    projectMembers: string[]
  ): Promise<string> {
    const systemMessage = `
  You are an AI that generates SQL queries for filtering and sorting comments in AlaSQL.
  Focus only on sorting the comments based on available fields (e.g., 'created_at') and limiting the number of messages returned.
  
  The data involves an array of comments in the architecture, engineering, and construction (AEC) sector, where each comment follows this structure:

  type Comment = {
      id: string;
      resolved: boolean;
      created_at: string;
  };

  Example SQL queries:
    - "SELECT * FROM ? ORDER BY created_at DESC LIMIT 5"
  
  If the prompt does not specify sorting or limiting the number of comments, return "SELECT * FROM ?".
  
  Return only the SQL query, without any surrounding code, comments, or backticks.
`;

    let generatedSql = await this._sendGptRequest(systemMessage, prompt);

    return this._cleanBackticks(generatedSql);
  }

  public async searchPrompt(prompt: string) {
    this.loading$.next(true);

    try {
      const needsContentEstimation = await this._needsContentEstimation(prompt);
      console.log("Needs content estimation:", needsContentEstimation);

      let comments = this._formatComments(
        this._projectService.commentService.comments$.value
      );

      if (needsContentEstimation) {
        comments = await this._filterRelevantComments(comments, prompt);
      }

      const workspaceService = this._projectService.workspaceService;
      const projectMembers = workspaceService.workspaceUsers$.value.map(
        ({ username }) => username
      );

      const generatedSql = await this._validateAndRefineSQL(
        prompt,
        projectMembers
      );
      console.log("Generated SQL:", generatedSql);

      const result = alasql(generatedSql, [comments]);

      console.log("Result:", result);
      this.filteredIds$.next(
        new Set(result.map((comment: FormattedComment) => `${comment.id}`))
      );
    } catch (error) {
      console.error("Error during search prompt:", error);
    }

    this.loading$.next(false);
  }

  public clearFilteredIds() {
    this.filteredIds$.next(null);
  }
}

interface FormattedComment {
  id: string;
  content: string;
  tags: Set<string>;
  resolved: boolean;
  images: string[];
  created_at: string;
  author_username: string;
  mentioned_usernames: string[];
}

export default PromptSearchService;
