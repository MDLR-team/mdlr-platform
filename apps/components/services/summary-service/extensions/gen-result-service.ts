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

    // Create a system message for relevance checking
    const relevanceSystemMessage = `Given the user's prompt: "${userPrompt}" and the following comments, indicate for each comment whether it is relevant to the summary based on the user's prompt. For each comment, respond with "Yes" or "No" in the same order as the comments provided. Please only provide "Yes" or "No" for each comment, in the same order, separated by newlines.`;

    // Send the relevance checking request
    const relevanceResponse = await this._summaryService.sendGptRequest(
      relevanceSystemMessage,
      userMessage
    );

    // Process the response
    const relevanceArray = relevanceResponse
      .split("\n")
      .map((line) => line.trim());

    if (relevanceArray.length !== comments.length) {
      // Handle error: mismatch in lengths
      console.error("Mismatch between comments and relevance response lengths");
      // Optionally, you can throw an error or handle it as per your application's logic
    }

    // Map each comment to its relevance
    const commentsWithRelevance = comments
      .map((comment, index) => ({
        ...comment,
        isRelevant: relevanceArray[index].toLowerCase() === "yes",
      }))
      .filter((comment) => comment.isRelevant);

    // add them to content with a separator and as $id
    const contentWithRelevance = commentsWithRelevance
      .map((comment) => `$${comment.id}`)
      .join("\n\n");

    // Add the content with relevance to the summary
    await this._summaryService.updateSummary(activeSummary.id, {
      content: `${content}\n\n${contentWithRelevance}`,
    });
  };

  public dispose() {}
}

export default GenResultService;
