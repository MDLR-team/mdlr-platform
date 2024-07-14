import { Comment } from "../../project-services/comment-service/comment-service";
import { createMarkupSvg } from "../../project-services/markup-3d-service/utils/create-markup-svg";
import { toScreenXY } from "../../project-services/markup-3d-service/utils/to-screen-xy";
import ProjectService from "../../project-services/project-service/project-service";
import MarkupService from "../markup-service";

interface Markup3D {
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
    this.markups.forEach((markup) => {
      const { x, y } = toScreenXY(markup.position, camera, viewer.canvas);
      markup.svg.setAttribute("transform", `translate(${x}, ${y - 27})`);
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
    // Add dispose logic if needed
  };
}

export default TopMarkupService;
