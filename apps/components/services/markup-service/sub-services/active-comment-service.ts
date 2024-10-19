import { BehaviorSubject } from "rxjs";
import ProjectService from "../../project-services/project-service/project-service";
import MarkupService from "../markup-service";
import { Comment } from "../../project-services/comment-service/comment-service";

class ActiveCommentService {
  public xy$ = new BehaviorSubject<{ x: number; y: number } | null>(null);

  constructor(
    private _projectService: ProjectService,
    private _markupService: MarkupService
  ) {
    this.subscribeToTopComments();
    this.subscribeToActiveComment();
  }

  /**
   * Subscribes to top comments and checks if the active comment still exists.
   */
  private subscribeToTopComments() {
    this._markupService.topComments$.subscribe((topComments) => {
      const activeComment = this._markupService.activeComment$.value;
      if (
        activeComment &&
        !topComments.some((comment) => comment.id === activeComment.id)
      ) {
        this._markupService.activeComment$.next(null);
      }
    });
  }

  /**
   * Subscribes to the active comment and handles its related logic.
   */
  private subscribeToActiveComment() {
    this._markupService.activeComment$.subscribe((activeComment) => {
      // If the active comment has a view state, activate 2D mode
      const viewState = activeComment?.view_state;
      if (viewState) {
        this.activateMode2D(activeComment);
      } else {
        this.deactivateMode2D();
      }

      // If there is an active comment, add a temporary entity to the 3D canvas for CommentDetails
      if (activeComment) {
        const callback = (xy: { x: number; y: number }) => this.xy$.next(xy);
        this._markupService.addTempEnt3D({
          id: "active_comment",
          position: activeComment.markup_position!,
          callback,
        });
      } else {
        this._markupService.removeTempEnt3D("active_comment");
        this.xy$.next(null);
      }
    });
  }

  /**
   * Selects a comment by its ID.
   * @param id - The ID of the comment to select.
   */
  public selectComment = (id: string) => {
    const comment =
      this._markupService.topComments$.value.find(
        (comment) => comment.id === id
      ) || null;

    this._markupService.activeComment$.next(comment);
  };

  public activateMode2D = (activeComment: Comment) => {
    this._markupService.enabled2D$.next(true);
    this._markupService.viewer$.value.restoreState(activeComment.view_state);
  };

  public deactivateMode2D = () => {
    this._markupService.enabled2D$.next(false);
  };

  /**
   * Closes the currently active comment.
   */
  public closeComment = () => {
    this._markupService.activeComment$.next(null);
  };

  public deactivate = () => {
    this._markupService.activeComment$.next(null);
  };

  public dispose() {
    this.xy$.complete();
  }
}

export default ActiveCommentService;
