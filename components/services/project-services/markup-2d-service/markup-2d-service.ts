import { deparseNormalizedCoords } from "../active-comment-service/utils/point-2-normalized-coord";
import { Comment } from "../comment-service/comment-service";
import { createMarkupSvg } from "../markup-3d-service/utils/create-markup-svg";
import PendingMarkup2DService from "../pending-markup-2d-service/pending-markup-2d-service";
import ProjectService from "../project-service/project-service";

class Markup2DService {
  private _svgCanvas: HTMLElement | null = null;

  private _commentMarkups: Map<string, Markup2D>;

  private _isAddingComment: boolean;
  private _pendingMarkupService: PendingMarkup2DService | null;

  private $states: any;

  private _enabled: boolean;

  constructor(private _projectService: ProjectService) {
    this._enabled = false;

    this._svgCanvas = document.getElementById("markup_2d_layer");

    this._commentMarkups = new Map();

    this._isAddingComment = false;
    this._pendingMarkupService = null;
  }

  /**
   * Updates the positions and existence of markups based on the current state of comments.
   */
  public updateMarkups() {
    this._svgCanvas = document.getElementById("markup_2d_layer");

    if (!this._svgCanvas) return;

    const comments = this._projectService.commentService.comments;
    const activeCommentService = this._projectService.activeCommentService;

    const activeComment = activeCommentService.activeComment;
    if (!activeComment) return;

    const id = activeComment!.id;

    // Filter comments
    const filteredComments = Array.from(comments.values()).filter(
      (comment) => comment.parent_id === id && comment.markup_position_2d
    );

    // Determine actions for each comment
    const toAdd: Comment[] = [];
    const toUpdate: Comment[] = [];
    const toDelete = new Map(this._commentMarkups);

    filteredComments.forEach((comment) => {
      const existingMarkup = this._commentMarkups.get(comment.id);
      if (existingMarkup) {
        // If the comment already has a markup, check if it needs to be updated
        if (
          JSON.stringify(existingMarkup.position) !==
          JSON.stringify(comment.markup_position)
        ) {
          toUpdate.push(comment);
        }
        toDelete.delete(comment.id);
      } else {
        // If the comment does not have a markup, it needs to be added
        toAdd.push(comment);
      }
    });

    // Add new markups
    toAdd.forEach((comment) => {
      this._addMarkup(comment);
    });

    // Update existing markups
    toUpdate.forEach((comment) => {
      this._updateMarkup(comment);
    });

    // Delete removed markups
    toDelete.forEach((markup, id) => {
      this._deleteMarkup(id);
    });

    // Rerender markups
    this.rerenderMarkups();
  }

  /**
   * Adds a new markup to the canvas based on a given comment.
   * @param comment - The comment to add a markup for.
   */
  private _addMarkup(comment: Comment) {
    const newMarkup = {
      id: comment.id,
      index: 2,
      position: comment.markup_position_2d!,
      svg: createMarkupSvg(comment.author_username, "default"),
    };
    this._commentMarkups.set(comment.id, newMarkup);

    this._svgCanvas?.appendChild(newMarkup.svg);
  }

  /**
   * Updates the position of an existing markup based on its corresponding comment.
   * @param comment - The comment whose markup needs to be updated.
   */
  private _updateMarkup(comment: Comment) {
    const markupToUpdate = this._commentMarkups.get(comment.id);
    if (markupToUpdate) {
      markupToUpdate.position = comment.markup_position_2d!;
    }
  }

  /**
   * Removes a markup from the canvas.
   * @param commentId - The ID of the comment whose markup needs to be removed.
   */
  private _deleteMarkup(commentId: string) {
    const markupToDelete = this._commentMarkups.get(commentId);
    if (markupToDelete) {
      markupToDelete.svg.remove(); // Assuming the markup has an 'svg' property that is an SVGElement
      this._commentMarkups.delete(commentId);
    }
  }

  /**
   * Rerenders all markups on the canvas.
   */
  public rerenderMarkups() {
    const markups = this._commentMarkups;

    markups.forEach((markup) => {
      const { x, y } = deparseNormalizedCoords(
        markup.position,
        this._svgCanvas!
      );

      markup.svg.setAttribute("transform", `translate(${x}, ${y - 27})`);
    });
  }

  /**
   * Clears all markups from the canvas.
   */
  private _clearMarkups() {
    this._commentMarkups.forEach((markup) => {
      this._deleteMarkup(markup.id);
    });
  }

  /**
   * Toggles the addition of a new comment and its corresponding markup.
   * @param v - Optional boolean flag to explicitly set the toggle state.
   */
  public toggleAddComment(v?: boolean) {
    const activeCommentService = this._projectService.activeCommentService;
    const activeComment = activeCommentService.activeComment;

    this._isAddingComment = v ?? !this._isAddingComment;

    if (this._isAddingComment) {
      if (
        this._pendingMarkupService &&
        activeComment &&
        this._pendingMarkupService.id === activeComment.id
      )
        return; // Already adding a comment

      this._pendingMarkupService = new PendingMarkup2DService(
        this._projectService
      );
      this._pendingMarkupService.provideStates(this.$states);
    } else {
      this._pendingMarkupService?.dispose();
      this._pendingMarkupService = null;
    }
  }

  public provideStates(states: any) {
    this.$states = states;
  }

  public get pendingMarkupService() {
    return this._pendingMarkupService;
  }

  public toggleEnabled(enabled?: boolean) {
    if (enabled !== undefined) {
      this._enabled = enabled;
    } else {
      this._enabled = !this._enabled;
    }

    if (this._enabled) {
      this.updateMarkups();
    } else {
      this.dispose();
    }
  }

  public dispose() {
    this._enabled = false;
    this._clearMarkups();

    this._pendingMarkupService?.dispose();
    this._pendingMarkupService = null;
  }
}

interface Markup2D {
  id: string;
  position: { x: number; y: number };
  svg: SVGElement;
}

export default Markup2DService;
