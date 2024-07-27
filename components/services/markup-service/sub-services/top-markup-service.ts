import { Comment } from "../../project-services/comment-service/comment-service";
import { createMarkupSvg } from "./utils/create-markup-svg";
import { toScreenXY } from "./utils/to-screen-xy";
import ProjectService from "../../project-services/project-service/project-service";
import MarkupService from "../markup-service";

export interface Markup3D {
  id: string;
  position: { x: number; y: number; z: number };
  svg: SVGElement;
}

class TopMarkupService {
  public markups: Map<string, Markup3D> = new Map();
  private viewerEventsAdded: boolean = false;

  constructor(
    private projectService: ProjectService,
    private markupService: MarkupService
  ) {
    this.markupService.topComments$.subscribe(this.updateMarkups);
    this.markupService.viewer$.subscribe((viewer) => {
      if (!this.viewerEventsAdded && viewer) {
        this.addEventListeners();
        this.viewerEventsAdded = true;
      }
    });

    // Subscribe to tempEnt3D$ to update markups based on temporary entities
    this.markupService.tempEnt3D$.subscribe(() => this.onCameraChange());

    // Subscribe to activeComment$ to apply grayscale filter
    this.markupService.enabled2D$.subscribe(this.applyGrayscaleFilter);
  }

  /**
   * Adds a new markup to the canvas based on a given comment.
   * @param comment - The comment to add a markup for.
   */
  private addMarkup = (comment: Comment) => {
    const newMarkup: Markup3D = {
      id: comment.id,
      position: comment.markup_position!,
      svg: createMarkupSvg(comment.author_username, "default"),
    };
    this.markups.set(comment.id, newMarkup);
    this.markupService.svg3DCanvas?.appendChild(newMarkup.svg);

    newMarkup.svg.addEventListener("click", () =>
      this.markupService.selectComment(comment.id)
    );
  };

  /**
   * Updates the position of an existing markup based on its corresponding comment.
   * @param comment - The comment whose markup needs to be updated.
   */
  private updateMarkup = (comment: Comment) => {
    const markup = this.markups.get(comment.id);
    if (markup) {
      markup.position = comment.markup_position!;
    }
  };

  /**
   * Removes a markup from the canvas.
   * @param commentId - The ID of the comment whose markup needs to be removed.
   */
  private deleteMarkup = (commentId: string) => {
    const markup = this.markups.get(commentId);
    if (markup) {
      markup.svg.remove();
      this.markups.delete(commentId);
    }
  };

  /**
   * Adjusts markup positions based on the current camera view.
   */
  private onCameraChange = () => {
    const viewer = this.markupService.viewer$.value;
    if (!viewer) return;

    const camera = viewer.getCamera();

    // Update markup positions
    this.markups.forEach((markup) => {
      const { x, y } = toScreenXY(markup.position, camera, viewer.canvas);
      markup.svg.setAttribute("transform", `translate(${x}, ${y - 27})`);
    });

    // Update tempEnt3D positions
    this.markupService.tempEnt3D$.value.forEach((tempEnt3D) => {
      const { x, y } = toScreenXY(tempEnt3D.position, camera, viewer.canvas);
      tempEnt3D.callback({ x, y });
    });
  };

  /**
   * Applies a grayscale filter to all SVGs except the active comment.
   * @param activeCommentId - The ID of the active comment.
   */
  private applyGrayscaleFilter = (enabled2D: boolean) => {
    const activeComment = this.markupService.activeComment$.value;
    const activeCommentId = activeComment?.id;

    const allowGrayscale = enabled2D && activeComment;

    this.markups.forEach((markup) => {
      if (markup.id === activeCommentId || !allowGrayscale) {
        markup.svg.style.filter = "none";
        markup.svg.style.opacity = "1";
      } else {
        markup.svg.style.opacity = "0.3";
        markup.svg.style.filter = "grayscale(100%)";
      }
    });
  };

  /**
   * Sets up event listeners for camera changes and window resizing.
   */
  private addEventListeners = () => {
    const Autodesk = (window as any).Autodesk;
    const viewer = this.markupService.viewer$.value;

    viewer.addEventListener(
      Autodesk.Viewing.CAMERA_CHANGE_EVENT,
      this.onCameraChange
    );

    window.addEventListener("resize", this.onCameraChange);
    this.onCameraChange();
  };

  /**
   * Updates the markups based on new comments.
   * @param newComments - The new comments to update markups with.
   */
  public updateMarkups = (newComments: Comment[]) => {
    const markups = Array.from(this.markups.values());

    const updateCondition = (existingMarkup: Markup3D, comment: Comment) =>
      JSON.stringify(existingMarkup.position) !==
      JSON.stringify(comment.markup_position);

    this.markupService.syncMarkups(
      markups,
      newComments,
      updateCondition,
      this.addMarkup,
      this.updateMarkup,
      this.deleteMarkup
    );

    this.onCameraChange();
  };

  public dispose = () => {
    this.markups.forEach((markup) => markup.svg.remove());
    this.markups.clear();
  };
}

export default TopMarkupService;
