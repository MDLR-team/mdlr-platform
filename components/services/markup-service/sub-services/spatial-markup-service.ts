import { deparseNormalizedCoords } from "./utils/point-2-normalized-coord";
import { Comment } from "../../project-services/comment-service/comment-service";
import { createMarkupComment } from "./utils/create-markup-comment";
import { createMarkupSvg } from "./utils/create-markup-svg";
import ProjectService from "../../project-services/project-service/project-service";
import MarkupService from "../markup-service";

export interface Markup2D {
  id: string;
  position: { x: number; y: number };
  svg: SVGElement;
  htmlElement?: HTMLElement;
}

class SpatialMarkupService {
  public markups: Map<string, Markup2D> = new Map();
  private hoveredMarkup: Markup2D | null = null;

  constructor(
    private projectService: ProjectService,
    private markupService: MarkupService
  ) {
    // Subscribe to tempEnt3D$ to update markups based on temporary entities
    this.markupService.tempEnt2D$.subscribe(() => this.onCameraChange());

    this.markupService.spatialComments$.subscribe(this.updateMarkups);
    this.addEventListeners();
  }

  /**
   * Adds a new markup to the canvas based on a given comment.
   * @param comment - The comment to add a markup for.
   */
  private addMarkup = (comment: Comment): void => {
    const svg = createMarkupSvg(comment.author_username, "default");
    const htmlElement = createMarkupComment(comment.content);

    const newMarkup: Markup2D = {
      id: comment.id,
      position: comment.markup_position_2d!,
      svg,
      htmlElement,
    };

    this.markups.set(comment.id, newMarkup);
    this.markupService.svg2DCanvas?.appendChild(svg);

    svg.addEventListener("mouseover", () =>
      this.onMarkupHover(newMarkup, true)
    );
    svg.addEventListener("mouseout", () =>
      this.onMarkupHover(newMarkup, false)
    );
  };

  /**
   * Updates the position of an existing markup based on its corresponding comment.
   * @param comment - The comment whose markup needs to be updated.
   */
  private updateMarkup = (comment: Comment): void => {
    const markup = this.markups.get(comment.id);
    if (markup) {
      markup.position = comment.markup_position_2d!;
    }
  };

  /**
   * Removes a markup from the canvas.
   * @param commentId - The ID of the comment whose markup needs to be removed.
   */
  private deleteMarkup = (commentId: string): void => {
    const markup = this.markups.get(commentId);
    if (markup) {
      markup.svg.remove();
      this.markups.delete(commentId);
    }
  };

  /**
   * Handles hover events on a markup, showing or hiding the associated HTML element.
   * @param markup - The markup that is being hovered.
   * @param isHover - Whether the markup is being hovered over.
   */
  private onMarkupHover = (markup: Markup2D, isHover: boolean): void => {
    const canvas = this.markupService.html2DCanvas;

    if (isHover) {
      this.hoveredMarkup = markup;

      canvas!.appendChild(markup.htmlElement!);
      this.setPosition(markup);
    } else {
      canvas!.removeChild(markup.htmlElement!);
      this.hoveredMarkup = null;
    }
  };

  /**
   * Updates the markups based on new comments.
   * @param comments - The new comments to update markups with.
   */
  public updateMarkups = (comments: Comment[]): void => {
    this.markupService.syncMarkups(
      Array.from(this.markups.values()),
      comments,
      (markup, comment) =>
        JSON.stringify(markup.position) !==
        JSON.stringify(comment.markup_position_2d),
      this.addMarkup,
      this.updateMarkup,
      this.deleteMarkup
    );

    this.rerenderMarkups();
  };

  /**
   * Rerenders all markups on the canvas.
   */
  public rerenderMarkups = (): void => {
    this.markups.forEach((markup) => this.setPosition(markup));
  };

  /**
   * Sets the position of a markup element on the canvas.
   * @param markup - The markup to set the position for.
   */
  private setPosition = (markup: Markup2D): void => {
    const canvas = this.markupService.svg2DCanvas;
    const { x, y } = deparseNormalizedCoords(markup.position, canvas!);
    markup.svg.setAttribute("transform", `translate(${x}, ${y - 27})`);
    if (markup.htmlElement) {
      markup.htmlElement.style.left = `${x + 37}px`;
      markup.htmlElement.style.top = `${y - 27}px`;
    }
  };

  /**
   * Sets up event listeners for camera changes and window resizing.
   */
  private addEventListeners = (): void => {
    window.addEventListener("resize", this.onCameraChange);
    this.onCameraChange();
  };

  /**
   * Removes event listeners for camera changes and window resizing.
   */
  private removeEventListeners = (): void => {
    window.removeEventListener("resize", this.onCameraChange);
  };

  /**
   * Adjusts markup positions based on the current camera view.
   */
  private onCameraChange = (): void => {
    this.markups.forEach((markup) => this.setPosition(markup));

    // Update tempEnt3D positions
    this.markupService.tempEnt2D$.value.forEach((tempEnt2D) => {
      const canvas = this.markupService.svg2DCanvas;
      const { x, y } = deparseNormalizedCoords(tempEnt2D.position, canvas!);
      tempEnt2D.callback({ x, y });
    });
  };

  /**
   * Cleans up the service by removing event listeners and clearing markups.
   */
  public dispose = (): void => {
    this.removeEventListeners();
    this.markups.forEach((markup) => markup.svg.remove());
    this.markups.clear();
  };
}

export default SpatialMarkupService;
