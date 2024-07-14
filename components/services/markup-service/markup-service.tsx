import { BehaviorSubject } from "rxjs";
import ProjectService from "../project-services/project-service/project-service";
import { Comment } from "../project-services/comment-service/comment-service";
import TopMarkupService from "./sub-services/top-markup-service";
import ActiveCommentService from "./sub-services/active-comment-service";

class MarkupService {
  public viewer$ = new BehaviorSubject<any>(null);
  public svg3DCanvas: HTMLElement | null = null;
  public svg2DCanvas: HTMLElement | null = null;

  public topComments$ = new BehaviorSubject<Comment[]>([]);

  public activeComment$ = new BehaviorSubject<Comment | null>(null);
  public subComments$ = new BehaviorSubject<Comment[]>([]); // sub-comments are related to the activeComment
  public spatialComments$ = new BehaviorSubject<Comment[]>([]); // spatial comments are related to the activeComment

  private _topMarkupService: TopMarkupService;
  private _activeCommentService: ActiveCommentService;

  constructor(private projectService: ProjectService) {
    this._topMarkupService = new TopMarkupService(this.projectService, this);
    this._activeCommentService = new ActiveCommentService(
      this.projectService,
      this
    );

    this.projectService.viewerServiceAggr.viewer$.subscribe((viewer) => {
      this.viewer$.next(viewer);

      this.svg3DCanvas = document.getElementById("markup_3d_layer");
      this.svg2DCanvas = document.getElementById("markup_2d_layer");

      this.updateMarkups();
    });

    this.projectService.commentService.comments$.subscribe(() => {
      this.updateMarkups();
    });
  }

  /**
   * Updates the markups based on the current viewer state and comments.
   */
  private updateMarkups() {
    if (!this.viewer$.value || !this.svg3DCanvas || !this.svg2DCanvas) return;

    const comments = Array.from(
      this.projectService.commentService.comments.values()
    );

    const activeComment = this.activeComment$.value;

    const isTopLevelComment = (comment: Comment) =>
      !comment.parent_id && comment.markup_position;

    const isActiveSubComment = (comment: Comment) =>
      activeComment &&
      comment.parent_id === activeComment.id &&
      !comment.markup_position_2d;

    const isActiveSpatialComment = (comment: Comment) =>
      activeComment &&
      comment.parent_id === activeComment.id &&
      comment.markup_position_2d;

    this.topComments$.next(comments.filter(isTopLevelComment));
    this.subComments$.next(comments.filter(isActiveSubComment));
    this.spatialComments$.next(comments.filter(isActiveSpatialComment));
  }

  /**
   * Synchronize markups based on new comments
   * @param currentItems - Current list of items with markups
   * @param newComments - New list of comments
   * @param updateCondition - Condition to determine if an item needs to be updated
   * @param addItem - Function to add a new item
   * @param updateItem - Function to update an existing item
   * @param deleteItem - Function to delete an item
   */
  public syncMarkups(
    currentItems: any[],
    newComments: Comment[],
    updateCondition: (currentItem: any, newComment: Comment) => boolean,
    addItem: (newComment: Comment) => void,
    updateItem: (newComment: Comment) => void,
    deleteItem: (id: string) => void
  ) {
    const toAdd: Comment[] = [];
    const toUpdate: Comment[] = [];
    const currentItemMap = new Map(currentItems.map((item) => [item.id, item]));
    const toDelete = new Map(currentItemMap);

    newComments.forEach((comment) => {
      const currentItem = currentItemMap.get(comment.id);
      if (currentItem) {
        if (updateCondition(currentItem, comment)) {
          toUpdate.push(comment);
        }
        toDelete.delete(comment.id);
      } else {
        toAdd.push(comment);
      }
    });

    toAdd.forEach(addItem);
    toUpdate.forEach(updateItem);
    toDelete.forEach((_, id) => deleteItem(id));
  }

  public selectComment = (id: string) => {
    this._activeCommentService.selectComment(id);
  };

  public dispose() {
    this._topMarkupService.dispose();
    this._activeCommentService.dispose();

    this.topComments$.complete();
    this.activeComment$.complete();
    this.subComments$.complete();
    this.spatialComments$.complete();
  }
}

export default MarkupService;
