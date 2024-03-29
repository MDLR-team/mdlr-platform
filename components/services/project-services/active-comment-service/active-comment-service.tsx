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
  private _markups: Map<string, SVGElement> = new Map();

  private _annotation: any[];

  private _supabase: SupabaseClient;
  private _globalStateService: GlobalStatesService;
  private _commentService: CommentService;

  constructor(private _projectService: ProjectService) {
    this._viewType = "assembled";

    this._childComments = new Map();
    this._markups = new Map();

    this._annotation = [];

    this._supabase = _projectService.supabase;
    this._globalStateService = _projectService.globalStatesService;
    this._commentService = _projectService.commentService;

    this.handlePinAddition = this.handlePinAddition.bind(this);
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

    if (this._isPaperMode && this._activeComment?.view_state) {
      this.updateViewerState();
    }

    if (!this._isPaperMode) {
      this._togglePaperEditing(false);
    }

    ////
    this.rerenderMarkups();
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
    this._togglePaperEditing(false);
    this.togglePaperMode(false);

    this._activeComment = null;
    this.$setActiveComment(null);

    this.$setActiveCommentPosition(null);
  }

  public init() {
    return;
  }

  public updateCommentPosition({ x, y }: { x: number; y: number }) {
    this.$setActiveCommentPosition({ x, y });
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

        this.rerenderMarkups();

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

  /////////////
  /**
   * creates a svg element to be used as a markup in the viewer.
   */
  public createMarkupSvg(content: string | number) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("pointer-events", "all");
    g.setAttribute("cursor", "pointer");

    const svg_background = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    svg_background.setAttribute(
      "d",
      "M24 12C24 17 19 22 12 28C5 22 0 17 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
    );
    svg_background.setAttribute("fill", "black");
    g.appendChild(svg_background);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.setAttribute(
      "d",
      "M19.0705 18.3666C21.0837 15.8798 22 13.8237 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8237 2.91635 15.8798 4.92949 18.3666C6.67551 20.5235 9.08931 22.8153 12 25.3562C14.9107 22.8153 17.3245 20.5235 19.0705 18.3666ZM12 28C19 22 24 17 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17 5 22 12 28Z"
    );
    svg.setAttribute("transform", "scale(0.8) translate(3, 3)");
    svg.setAttribute("fill", "white");
    g.appendChild(svg);

    // add text
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "12");
    text.setAttribute("y", "12");

    text.textContent = `${content}`;
    text.setAttribute("font-size", "12");
    text.setAttribute("fill", "black");

    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");

    g.appendChild(text);

    return g;
  }

  private _updateSvgPosition(comment: Comment) {
    const markupPosition2d = comment.markup_position_2d;

    const canvas = document.getElementById(
      "comments_2d_layer"
    ) as HTMLCanvasElement;
    if (!canvas) return;
    const { x, y } = deparseNormalizedCoords(markupPosition2d, canvas);

    const svg = this._markups.get(comment.id);

    svg!.setAttribute("transform", `translate(${x - 12}, ${y - 30})`);
  }

  public rerenderMarkups() {
    console.log("aaaaaa");

    console.log("this._activeComment:", this._activeComment);
    console.log("this._isPaperMode:", this._isPaperMode);

    if (!this._activeComment || !this._isPaperMode) return;

    const markups = this._markups;
    //delete all existing markups
    markups.forEach((markup) => {
      markup.remove();
    });

    markups.clear();

    this._childComments.forEach((comment) => {
      if (!comment.markup_position_2d) return;

      const svg = this.createMarkupSvg(comment.content);
      markups.set(comment.id, svg);

      this._updateSvgPosition(comment);

      document
        .getElementById("comments_2d_layer")!
        .appendChild(svg as unknown as Node);
    });

    console.log("Markups:", markups);
  }

  public dispose() {
    this.deselectComment();

    this._childComments.clear();
    this._markups.clear();

    this._annotation = [];
    this.$setAnnotation([]);
  }
}

export interface PointXY {
  x: number;
  y: number;
}

export default ActiveCommentService;
