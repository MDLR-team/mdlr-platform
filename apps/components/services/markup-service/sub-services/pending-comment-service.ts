import { BehaviorSubject } from "rxjs";
import ProjectService from "../../project-services/project-service/project-service";
import MarkupService from "../markup-service";
import { Comment } from "../../project-services/comment-service/comment-service";
import { createMarkupSvg } from "./utils/create-markup-svg";
import { Markup3D } from "./top-markup-service";
import { Markup2D } from "./spatial-markup-service";
import hotkeys from "hotkeys-js";
import { supabase } from "@/components/supabase-client";

class PendingCommentService {
  private markup3D: Markup3D | null = null;
  private markup2D: Markup2D | null = null;
  private is3DMode: boolean = true;

  public xy$ = new BehaviorSubject<{ x: number; y: number } | null>(null);
  public enabledViewState$ = new BehaviorSubject<boolean>(false);
  public enabledPen$ = new BehaviorSubject<boolean>(false);

  constructor(
    private projectService: ProjectService,
    private markupService: MarkupService
  ) {
    this.markupService.pendingComment$.subscribe((comment) => {
      if (comment && comment.view_state) {
        this.enabledViewState$.next(true);
      } else {
        this.enabledViewState$.next(false);
      }
    });
  }

  /**
   * Activates adding a new comment, setting the initial position and type (3D or 2D).
   */
  public activate = (position: Vector3 | Vector2, type: "3D" | "2D") => {
    this.deactivate(); // Ensure clean state before activation

    this.markupService.activatedService = this;

    const is3D = type === "3D";
    this.is3DMode = is3D;

    const activeComment = this.markupService.activeComment$.value;

    const userMetadata = this.projectService.authService.userMetadata;

    const comment: Partial<Comment> = {
      content: "",
      markup_position: is3D ? (position as Vector3) : null,
      markup_position_2d: is3D ? null : (position as Vector2),
      view_state: null,
      parent_id: is3D ? null : activeComment?.id,
      annotation: is3D ? null : [],
      author_id: userMetadata!.id,
    };

    // Conditionally render markup based on type
    this.is3DMode
      ? this.addPendingMarkup3D(position as Vector3)
      : this.addPendingMarkup2D(position as Vector2);
    this.markupService.pendingComment$.next(comment); // Notify subscribers of new pending comment
    this.addHotkeyListeners();
  };

  /**
   * Active adding a subcomment
   */
  public activateSubComment = () => {
    const activeComment = this.markupService.activeComment$.value;
    if (!activeComment) return;

    const userMetadata = this.projectService.authService.userMetadata;

    const comment: Partial<Comment> = {
      content: "",
      markup_position: null,
      markup_position_2d: null,
      view_state: null,
      parent_id: activeComment.id,
      annotation: null,
      author_id: userMetadata!.id,
    };

    this.markupService.pendingComment$.next(comment);
    this.addHotkeyListeners();
  };

  /**
   * Adds an SVG element to the DOM to represent the pending markup.
   */
  public addPendingMarkup3D(position: Vector3) {
    const svg = createMarkupSvg(1, "pending");
    svg.style.pointerEvents = "none";

    this.markup3D = {
      id: "pendingComment",
      position,
      svg,
    };

    this.markupService.svg3DCanvas?.appendChild(svg);

    this.markupService.addTempEnt3D({
      id: "pendingComment",
      position,
      callback: this.changeMarkupPosition,
    });
  }

  /**
   * Updates the position of the markup SVG based on screen coordinates.
   */
  private changeMarkupPosition = (xy: { x: number; y: number }) => {
    this.xy$.next(xy); // Notify subscribers of new position

    const markup = this.is3DMode ? this.markup3D : this.markup2D;

    if (markup) {
      const markupService = this.markupService;
      const pendingMarkupService = markupService.pendingMarkupService;
      pendingMarkupService.moveMarkup(markup.svg, xy);
    }
  };

  /**
   * Adds an SVG element to the DOM to represent the pending markup.
   */
  public addPendingMarkup2D(position: Vector2) {
    const svg = createMarkupSvg(1, "pending");
    svg.style.pointerEvents = "none";

    this.markup2D = {
      id: "pendingComment",
      position,
      svg,
    };

    this.markupService.svg2DCanvas?.appendChild(svg);

    this.markupService.addTempEnt2D({
      id: "pendingComment",
      position,
      callback: this.changeMarkupPosition,
    });
  }

  /**
   * Cleans up 3D resources and markups.
   */
  private cleanupMarkup3D() {
    if (this.markup3D) {
      this.markupService.svg3DCanvas?.removeChild(this.markup3D.svg);
      this.markupService.removeTempEnt3D("pendingComment");
      this.markup3D = null;
    }
  }

  /**
   * Cleans up 2D resources and markups.
   */
  private cleanupMarkup2D() {
    if (this.markup2D) {
      console.log("this.markup2D", this.markup2D);

      this.markupService.svg2DCanvas?.removeChild(this.markup2D.svg);
      this.markupService.removeTempEnt2D("pendingComment");
      this.markup2D = null;
    }
  }

  /**
   * Deactivates the service, cleaning up resources and removing hotkeys.
   */
  public deactivate = () => {
    this.deactivatePenTool();

    this.cleanupMarkup3D();
    this.cleanupMarkup2D();

    this.removeHotkeyListeners();
    this.markupService.pendingComment$.next(null);
    this.enabledViewState$.next(false);

    if (this.markupService.activatedService instanceof PendingCommentService) {
      this.markupService.activatedService = null;
    }
  };

  /**
   * Adds hotkey listeners for interactive markup behavior.
   */
  private addHotkeyListeners() {
    hotkeys("esc", this.deactivate);
  }

  /**
   * Removes hotkey listeners for interactive markup behavior.
   */
  private removeHotkeyListeners() {
    hotkeys.unbind("esc", this.deactivate);
  }

  /**
   * Saves the pending comment to the database.
   */
  public saveComment = async (updatedComment: Partial<Comment>) => {
    const pendingComment = this.markupService.pendingComment$.value;
    if (!pendingComment) return;

    const comment: Partial<Comment> = {
      ...pendingComment,
      ...updatedComment,
    };

    try {
      const { data, error } = await supabase.from("comments").insert([
        {
          ...comment,
          project_id: this.projectService.id,
        },
      ]);

      if (error) throw error;
    } catch (error) {
      console.error("Error inserting comment:", error);
    }

    this.deactivate();
  };

  /**
   * Activates the pen tool for drawing on the canvas.
   */
  public activatePenTool = () => {
    const pendingComment = this.markupService.pendingComment$.value;
    if (!pendingComment) return;

    const viewState = pendingComment.view_state;
    const viewer = this.markupService.viewer$.value;

    if (!viewState && viewer) {
      const viewState = viewer.getState({ viewport: true });
      const comment = { ...pendingComment, view_state: viewState };
      this.markupService.pendingComment$.next(comment);
      this.markupService.enabledPending2D$.next(true);
    }

    this.enabledPen$.next(true);
  };

  /**
   * Deactivates the pen tool.
   */
  public deactivatePenTool = () => {
    this.markupService.enabledPending2D$.next(false);
    this.enabledPen$.next(false);
  };

  public addAnnotationLine = (line: any) => {
    const pendingComment = this.markupService.pendingComment$.value;
    if (!pendingComment) return;

    const annotation = pendingComment.annotation || [];
    annotation.push(line);

    const comment = { ...pendingComment, annotation };
    this.markupService.pendingComment$.next(comment);
  };

  public dispose() {
    this.xy$.complete();
    this.enabledViewState$.complete();
    this.enabledPen$.complete();
  }
}

type Vector3 = {
  x: number;
  y: number;
  z: number;
};

type Vector2 = {
  x: number;
  y: number;
};

export default PendingCommentService;
