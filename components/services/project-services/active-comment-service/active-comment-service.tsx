import { SupabaseClient } from "@supabase/supabase-js";
import GlobalStatesService from "../global-states-service/global-states-service";
import CommentService from "../comment-service/comment-service";

class ActiveCommentService {
  constructor(
    private _supabase: SupabaseClient,
    private _globalStateService: GlobalStatesService,
    private _commentService: CommentService
  ) {}

  public init() {
    return;
  }

  public provideStates(states: any) {
    return;
  }

  public dispose() {
    return;
  }
}

export default ActiveCommentService;
