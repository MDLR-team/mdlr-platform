import { BehaviorSubject } from "rxjs";
import ProjectService from "../project-services/project-service/project-service";
import { Summary } from "./summary-service.types";
import GenResultService from "./extensions/gen-result-service";

class SummaryService {
  private _supabase: any;
  private _genResultService: GenResultService;

  public summaries$: BehaviorSubject<Summary[]> = new BehaviorSubject<
    Summary[]
  >([]);
  public activeSummary$: BehaviorSubject<Summary | null> =
    new BehaviorSubject<Summary | null>(null);

  constructor(private _projectService: ProjectService) {
    this._supabase = _projectService.supabase;
    this._genResultService = new GenResultService(this);
  }

  private _fetchInitialComments = async () => {
    const project_id = this._projectService!.id as string;

    const { data, error } = await this._supabase
      .from("summaries") // Adjust if your table name is different
      .select(`*`)
      .eq("project_id", project_id)
      .order("created_at", { ascending: true });

    this.summaries$.next(data);

    const activeSummary = this.activeSummary$.value;
    if (activeSummary) {
      this.setActiveSummary(activeSummary.id);
    } else {
      if (data.length > 0) {
        this.setActiveSummary(data[0].id);
      }
    }
  };

  public async init() {
    await this._fetchInitialComments();
  }

  public createSummary = async (userPrompt: string) => {
    const project_id = this._projectService!.id as string;

    const defaultTitle = "Untitled Summary";

    const { data, error } = await this._supabase
      .from("summaries") // Adjust if your table name is different
      .insert([{ project_id, user_prompt: userPrompt, title: defaultTitle }]);

    this._fetchInitialComments();
  };

  public updateSummary = async (
    summaryId: number,
    summary: Partial<Summary>
  ) => {
    // check if partial summary inclides either title or content, add updated_at timestamp
    if (summary.title || summary.content) {
      summary.updated_at = new Date();
    }

    const { data, error } = await this._supabase
      .from("summaries") // Adjust if your table name is different
      .update(summary)
      .eq("id", summaryId);

    await this._fetchInitialComments();

    return true;
  };

  public setActiveSummary = (summaryId: number) => {
    const activeSummary = this.summaries$.value.find(
      (summary) => summary.id === summaryId
    );

    this.activeSummary$.next(activeSummary || null);
  };

  public get comments() {
    return this._projectService.commentService.comments$.value;
  }

  public sendGptRequest = async (
    systemMessage: string,
    userMessage: string
  ) => {
    return await this._projectService.promptSearchService.sendGptRequest(
      systemMessage,
      userMessage
    );
  };

  public generateSummary = async () => {
    await this._genResultService.generateSummary();
  };

  public dispose() {
    this._genResultService.dispose();
  }
}

export default SummaryService;
