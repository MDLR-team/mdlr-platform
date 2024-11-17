import SummaryService from "../summary-service";

class GenResultService {
  constructor(private _summaryService: SummaryService) {}

  public generateSummary = async () => {
    const activeSummary = this._summaryService.activeSummary$.getValue();

    if (!activeSummary) {
      return;
    }

    const userPrompt = activeSummary.user_prompt;
    const comments = this._summaryService.comments;

    const systemMessage = `Summarize the AEC-related comments based on the user's prompt: "${userPrompt}". Use only the comments provided, keeping the response within 1000 characters, and divide it into paragraphs for clear readability. If mentioning a user, format their name exactly as @First_Last (using an underscore between first and last names. important!). No additional information beyond these comments.`;
    const userMessage = comments
      .map(
        (comment) =>
          `[${comment.author_username.replace(/\s+/g, "_")}: ${comment.content}`
      )
      .join("\n");

    // First request: Generate the title
    const titleSystemMessage = `Generate a concise title for the following content based on the user's prompt: "${userPrompt}". The title should be short, informative, and capture the essence of the content.`;
    const title = await this._summaryService.sendGptRequest(
      titleSystemMessage,
      userMessage
    );

    await this._summaryService.updateSummary(activeSummary.id, { title });

    const content = await this._summaryService.sendGptRequest(
      systemMessage,
      userMessage
    );

    await this._summaryService.updateSummary(activeSummary.id, { content });
  };

  public dispose() {}
}

export default GenResultService;
