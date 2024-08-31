import { BehaviorSubject } from "rxjs";
import ProjectService from "../project-services/project-service/project-service";
import { Comment } from "../project-services/comment-service/comment-service";
import TopMarkupService from "./sub-services/top-markup-service";
import ActiveCommentService from "./sub-services/active-comment-service";
import PendingMarkupService from "./sub-services/pending-markup-service";
import SpatialMarkupService from "./sub-services/spatial-markup-service";
import PendingCommentService from "./sub-services/pending-comment-service";
import MeasureService from "./sub-services/measure-service";

interface TempEnt3D {
  id: string;
  position: { x: number; y: number; z: number };
  callback: (xy: { x: number; y: number }) => void;
}

interface TempEnt2D {
  id: string;
  position: { x: number; y: number };
  callback: (xy: { x: number; y: number }) => void;
}

class MarkupService {
  public viewer$ = new BehaviorSubject<any>(null);
  public svg3DCanvas: HTMLElement | null = null;
  public svg2DCanvas: HTMLElement | null = null;
  public html2DCanvas: HTMLElement | null = null;

  public activatedService:
    | PendingMarkupService
    | PendingCommentService
    | MeasureService
    | null = null;

  public topComments$ = new BehaviorSubject<Comment[]>([]);
  public tempEnt3D$ = new BehaviorSubject<TempEnt3D[]>([]); // TempEnt3D are temporary entities that are not saved in the database, but needs to be displayed in the 3D canvas
  public tempEnt2D$ = new BehaviorSubject<TempEnt2D[]>([]); // TempEnt2D are temporary entities that are not saved in the database, but needs to be displayed in the 2D canvas

  public pendingComment$ = new BehaviorSubject<Partial<Comment> | null>(null);
  public activeComment$ = new BehaviorSubject<Comment | null>(null);
  public subComments$ = new BehaviorSubject<Comment[]>([]); // sub-comments are related to the activeComment
  public spatialComments$ = new BehaviorSubject<Comment[]>([]); // spatial comments are related to the activeComment

  public topMarkupService: TopMarkupService;
  public activeCommentService: ActiveCommentService;
  public pendingMarkupService: PendingMarkupService;
  public pendingCommentService: PendingCommentService;
  public spatialMarkupService: SpatialMarkupService;

  public measureService: MeasureService;

  public enabled2D$ = new BehaviorSubject<boolean>(false);
  public enabledPending2D$ = new BehaviorSubject<boolean>(false);
  public enabledAdding$ = new BehaviorSubject<boolean>(false);

  constructor(private projectService: ProjectService) {
    this.topMarkupService = new TopMarkupService(this.projectService, this);
    this.activeCommentService = new ActiveCommentService(
      this.projectService,
      this
    );
    this.pendingMarkupService = new PendingMarkupService(
      this.projectService,
      this
    );
    this.pendingCommentService = new PendingCommentService(
      this.projectService,
      this
    );
    this.spatialMarkupService = new SpatialMarkupService(
      this.projectService,
      this
    );
    this.measureService = new MeasureService(this.projectService, this);

    this.projectService.viewerServiceAggr.viewer$.subscribe((viewer) => {
      this.viewer$.next(viewer);

      this.svg3DCanvas = document.getElementById("markup_3d_layer");
      this.svg2DCanvas = document.getElementById("markup_2d_layer");
      this.html2DCanvas = document.getElementById("comment_2d_layer");

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
      !comment.parent_id &&
      comment.markup_position &&
      this.checkFilters(comment);

    const isActiveSubComment = (comment: Comment) =>
      activeComment &&
      comment.parent_id === activeComment.id &&
      !comment.markup_position_2d &&
      this.checkFilters(comment);

    const isActiveSpatialComment = (comment: Comment) =>
      activeComment &&
      comment.parent_id === activeComment.id &&
      comment.markup_position_2d &&
      this.checkFilters(comment);

    this.topComments$.next(comments.filter(isTopLevelComment));
    this.subComments$.next(comments.filter(isActiveSubComment));
    this.spatialComments$.next(comments.filter(isActiveSpatialComment));
  }

  public checkFilters = (Comment: Comment) => {
    // remove resolved comments
    if (Comment.resolved) return false;
    return true;
  };

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

  /**
   * Adds a temporary 3D entity to the canvas.
   * @param tempEnt3D - The temporary 3D entity to add.
   */
  public addTempEnt3D = (tempEnt3D: TempEnt3D) => {
    // Add the temporary entity to the list of temporary entities
    const list = this.tempEnt3D$.value.filter((ent) => ent.id !== tempEnt3D.id);
    this.tempEnt3D$.next([...list, tempEnt3D]);
  };

  /**
   * Updates the position of a temporary 3D entity on the canvas.
   */
  public updateTempEnt3D = (
    id: string,
    position: { x: number; y: number; z: number }
  ) => {
    // Update the position of the temporary entity
    const list = this.tempEnt3D$.value.map((ent) => {
      if (ent.id === id) {
        return { ...ent, position };
      }
      return ent;
    });
    this.tempEnt3D$.next(list);
  };

  /**
   * Removes a temporary 3D entity from the canvas.
   * @param id - The ID of the temporary 3D entity to remove.
   */
  public removeTempEnt3D = (id: string) => {
    // Remove the temporary entity from the list of temporary entities
    this.tempEnt3D$.next(this.tempEnt3D$.value.filter((ent) => ent.id !== id));
  };

  /**
   * Adds a temporary 2D entity to the canvas.
   * @param tempEnt2D - The temporary 2D entity to add.
   */
  public addTempEnt2D = (tempEnt2D: TempEnt2D) => {
    // Add the temporary entity to the list of temporary entities
    const list = this.tempEnt2D$.value.filter((ent) => ent.id !== tempEnt2D.id);
    this.tempEnt2D$.next([...list, tempEnt2D]);
  };

  /**
   * Updates the position of a temporary 2D entity on the canvas.
   */
  public updateTempEnt2D = (id: string, position: { x: number; y: number }) => {
    // Update the position of the temporary entity
    const list = this.tempEnt2D$.value.map((ent) => {
      if (ent.id === id) {
        return { ...ent, position };
      }
      return ent;
    });

    this.tempEnt2D$.next(list);
  };

  /**
   * Removes a temporary 2D entity from the canvas.
   * @param id - The ID of the temporary 2D entity to remove.
   */
  public removeTempEnt2D = (id: string) => {
    // Remove the temporary entity from the list of temporary entities
    this.tempEnt2D$.next(this.tempEnt2D$.value.filter((ent) => ent.id !== id));
  };

  /**
   * Selects a comment based on its ID.
   * @param id - The ID of the comment to select.
   */
  public selectComment = (id: string) => {
    this.activeCommentService.selectComment(id);
    this.updateMarkups();
  };

  /**
   * Closes the active comment.
   */
  public closeComment = () => {
    this.activeCommentService.closeComment();
    this.updateMarkups();
  };

  /**
   * Saves a comment to the database.
   */
  public saveComment = (updatedComment: Partial<Comment>) => {
    this.pendingCommentService.saveComment(updatedComment);
  };

  /**
   * Activates a tool based on the tool type.
   * @param toolType - The type of tool to activate.
   */
  public activateTool = (toolType: "ADD_COMMENT" | "MEASURE") => {
    if (this.activatedService) {
      this.activatedService.deactivate();
    }

    switch (toolType) {
      case "ADD_COMMENT":
        this.pendingMarkupService.activate();
        break;
      case "MEASURE":
        this.measureService.activate();
        break;
      default:
        break;
    }
  };

  public dispose() {
    this.topMarkupService.dispose();
    this.activeCommentService.dispose();
    this.pendingMarkupService.dispose();
    this.pendingCommentService.dispose();
    this.spatialMarkupService.dispose();
    this.measureService.dispose();

    this.topComments$.complete();
    this.tempEnt3D$.complete();
    this.tempEnt2D$.complete();
    this.pendingComment$.complete();
    this.activeComment$.complete();
    this.subComments$.complete();
    this.spatialComments$.complete();

    this.enabled2D$.complete();
    this.enabledPending2D$.complete();
    this.enabledAdding$.complete();
  }
}

export default MarkupService;
