import ProjectService from "../../project-services/project-service/project-service";
import MarkupService from "../markup-service";

class ActiveCommentService {
  constructor(
    private _projectService: ProjectService,
    private _markupService: MarkupService
  ) {
    this._markupService.topComments$.subscribe((topComments) => {
      const activeComment = this._markupService.activeComment$.value;
      if (activeComment) {
        const comment = topComments.find(
          (comment) => comment.id === activeComment.id
        );
        if (!comment) this._markupService.activeComment$.next(null);
      }
    });
  }

  public selectComment = (id: string) => {
    const topComments = this._markupService.topComments$.value;
    const comment = topComments.find((comment) => comment.id === id) || null;

    this._markupService.activeComment$.next(comment);
  };

  public dispose() {}
}

export default ActiveCommentService;
