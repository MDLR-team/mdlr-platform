import { SupabaseClient } from "@supabase/supabase-js";
import GlobalStatesService from "../global-states-service/global-states-service";
import CommentService, { Comment } from "../comment-service/comment-service";
import MarkupExtension from "@/components/forge/markup-extension";
import paper, { Path, Tool } from "paper";
import ProjectService from "../project-service/project-service";
import {
  transformPointToNormalizedCoords,
  deparseNormalizedCoords,
} from "./utils/point-2-normalized-coord";
import { toScreenXY } from "../markup-3d-service/utils/to-screen-xy";

class ActiveCommentService {
  private _activeComment: Comment | null = null;
  private _isPaperMode: boolean = false;
  private _isPaperEditing: boolean = false;
  private _isPenMode: boolean = false;

  private _isAwaitingPinAddition: boolean = false;

  private _viewer: any;
  private _markupExtension?: MarkupExtension;

  private $setActiveComment: any;
  private $setActiveCommentPosition: any;
  private $setIsPaperMode: any;
  private $setIsPaperEditing: any;
  private $setIsPenMode: any;
  private $setChildComments: any;
  private $setAnnotation: any;
  private $setViewType: any;
  private $setMarkup2d: any;

  private _viewType: "assembled" | "exploded";

  private _childComments: Map<string, Comment>;

  private _annotation: any[];

  private _supabase: SupabaseClient;
  private _globalStateService: GlobalStatesService;
  private _commentService: CommentService;

  constructor(private _projectService: ProjectService) {
    this._viewType = "assembled";

    this._childComments = new Map();

    this._annotation = [];

    this._supabase = _projectService.supabase;
    this._globalStateService = _projectService.globalStatesService;
    this._commentService = _projectService.commentService;

    this.handlePinAddition = this.handlePinAddition.bind(this);

    this.updateCommentPosition = this.updateCommentPosition.bind(this);
  }

  public selectComment(id: string | number) {
    const comment = this._commentService.comments.get(id);

    if (comment) {
      this._activeComment = comment;
      this.$setActiveComment(comment);

      this.checkActiveComment();

      // also check if the comment has a view state
      if (this._isPaperMode && !this._activeComment?.view_state) {
        this.togglePaperMode(false);
      }

      this._addCameraChangedListener();
      this.updateCommentPosition();
    } else {
      this.deselectComment();
    }

    this._markupExtension?.enable(false);
  }

  public togglePaperMode(v?: boolean) {
    this._isPaperMode = v !== undefined ? v : !this._isPaperMode;
    this.$setIsPaperMode(this._isPaperMode);

    if (this._isPaperMode && !this._activeComment?.view_state) {
      this._togglePaperEditing(true);
    } else {
      this._togglePaperEditing(false);
    }

    if (!this._isPaperMode) {
      this._togglePaperEditing(false);
    }

    if (this._isPaperMode && this._activeComment?.view_state) {
      this.updateViewerState();

      this._projectService.markup2DService.toggleEnabled(true);
    } else {
      this._projectService.markup2DService.toggleEnabled(false);
    }
  }

  public updateViewerState() {
    const activeComment = this._activeComment;

    if (!activeComment) return;
    this._viewer.restoreState(activeComment.view_state);
  }

  private _togglePaperEditing(v?: boolean) {
    this._isPaperEditing = v !== undefined ? v : !this._isPaperEditing;

    this.$setIsPaperEditing(this._isPaperEditing);
  }

  public togglePenMode(v?: boolean) {
    if (!this._isPaperMode) return;

    this._isPenMode = v !== undefined ? v : !this._isPenMode;
    this.$setIsPenMode(this._isPenMode);

    this._annotation = [];
    this.$setAnnotation([]);
  }

  public deselectComment() {
    this._projectService.markup2DService.toggleEnabled(false);

    this._togglePaperEditing(false);
    this.togglePaperMode(false);

    this._activeComment = null;
    this.$setActiveComment(null);

    this.$setActiveCommentPosition(null);

    this._removeCameraChangedListener();
  }

  public init() {
    return;
  }

  public updateCommentPosition() {
    const activeComment = this._activeComment;
    if (!activeComment) return;

    const markupPosition = activeComment.markup_position;

    if (!markupPosition) return;

    const { x, y } = toScreenXY(
      markupPosition,
      this._viewer.getCamera(),
      this._viewer.canvas
    );

    this.$setActiveCommentPosition({ x, y });
  }

  /**
   * Registers camera change event listeners to ensure the pending markup's position updates correctly.
   */
  private _addCameraChangedListener() {
    const Autodesk = (window as any).Autodesk;

    this._viewer.addEventListener(
      Autodesk.Viewing.CAMERA_CHANGE_EVENT,
      this.updateCommentPosition
    );
  }

  /**
   * Removes camera change event listeners to prevent unnecessary updates when the service is disabled.
   */
  private _removeCameraChangedListener() {
    const Autodesk = (window as any).Autodesk;

    this._viewer.removeEventListener(
      Autodesk.Viewing.CAMERA_CHANGE_EVENT,
      this.updateCommentPosition
    );
  }

  public checkActiveComment() {
    if (this._activeComment) {
      const comment = this._commentService.comments.get(this._activeComment.id);

      if (!comment) {
        this.deselectComment();
      } else {
        this._activeComment = comment;
        this.$setActiveComment({ ...comment });

        // update child comments
        this._childComments.clear();
        this._commentService.comments.forEach((c) => {
          if (c.parent_id === comment.id || c.id === comment.id) {
            this._childComments.set(c.id, c);
          }
        });

        this.$setChildComments([...Array.from(this._childComments.values())]);

        if (this._isPaperMode && !this._isPaperEditing) {
          this.updateViewerState();
        }
      }
    }
  }

  public toggleViewType(viewType: "assembled" | "exploded") {
    this._viewType = viewType;

    this.$setViewType(viewType);
  }

  public provideStates(states: any) {
    this.$setActiveComment = states.setActiveComment;
    this.$setActiveCommentPosition = states.setActiveCommentPosition;
    this.$setIsPaperMode = states.setIsPaperMode;
    this.$setIsPaperEditing = states.setIsPaperEditing;
    this.$setIsPenMode = states.setIsPenMode;
    this.$setChildComments = states.setChildComments;
    this.$setAnnotation = states.setAnnotation;
    this.$setViewType = states.setViewType;
    this.$setMarkup2d = states.setMarkup2d;

    this._viewer = states.viewer;

    this.$setViewType(this._viewType);
  }

  public provideMarkupExtension(markupExtension: MarkupExtension) {
    this._markupExtension = markupExtension;
  }

  public saveAnnotation(lines: any) {
    this._annotation = lines;
    this.$setAnnotation(lines);
  }

  public addAnnotationLine(line: any) {
    this._annotation.push(line);

    this.$setAnnotation([...this._annotation]);
  }

  public toggleAwaitingPinAddition(v?: boolean) {
    this._isAwaitingPinAddition =
      v !== undefined ? v : !this._isAwaitingPinAddition;

    const canvasRef = document.getElementById("paper-view-0");
    if (!canvasRef) return;

    if (this._isAwaitingPinAddition) {
      canvasRef.addEventListener("click", this.handlePinAddition);
    } else {
      canvasRef.removeEventListener("click", this.handlePinAddition);
    }
  }

  public handlePinAddition(e: MouseEvent) {
    const x = e.clientX;
    const y = e.clientY;

    const canvasRef = document.getElementById("paper-view-0");

    const normilizedCoords = transformPointToNormalizedCoords(
      { x, y },
      canvasRef!
    );

    this.$setMarkup2d(normilizedCoords);

    this.toggleAwaitingPinAddition(false);
  }

  public get annotation() {
    return this._annotation;
  }

  public get activeComment() {
    return this._activeComment;
  }

  public get childComments() {
    return this._childComments;
  }

  public dispose() {
    this.deselectComment();

    this._childComments.clear();

    this._annotation = [];
    this.$setAnnotation([]);
  }
}

export interface PointXY {
  x: number;
  y: number;
}

export default ActiveCommentService;
