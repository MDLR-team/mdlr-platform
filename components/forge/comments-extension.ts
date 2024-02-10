import MarkupExtension from "./markup-extension";

class CommentsExtension {
  private _markupExtension: MarkupExtension;
  private _viewer: any;

  private _comments: Map<string | number, Comment>;

  private _overlayScene: string = "comments-overlay-scene";

  constructor(markupExtension: MarkupExtension) {
    this._markupExtension = markupExtension;
    this._viewer = markupExtension.viewer;

    this._comments = new Map();

    this._createOverlayScene();
  }

  /**
   * Creates an overlay scene for adding custom markups or meshes.
   */
  private _createOverlayScene() {
    const overlayScene = this._overlayScene;

    if (!this._viewer.overlays.hasScene(overlayScene)) {
      this._viewer.overlays.addScene(overlayScene);
    }
  }

  /**
   * Creates a Three.js mesh to be used as a markup in the viewer.
   */
  private createMarkupMesh() {
    const THREE = (window as any).THREE;

    const geom = new THREE.SphereGeometry(3000, 8, 8);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      opacity: 1,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geom, material);
    return mesh;
  }

  public addComment(
    id: string | number,
    position: { x: number; y: number; z: number },
    needsUpdate: boolean = true
  ) {
    const mesh = this.createMarkupMesh();

    this._viewer.overlays.addMesh(mesh, this._overlayScene);
    mesh.position.set(position.x, position.y, position.z);

    this._comments.set(id, {
      id,
      position: { x: 0, y: 0, z: 0 },
      mesh,
    });

    if (needsUpdate) this._viewer.impl.invalidate(true);
  }

  public updateComment(
    id: number | string,
    position: { x: number; y: number; z: number },
    needsUpdate: boolean = true
  ) {
    const comment = this._comments.get(id);

    if (comment) {
      comment.position = position;
      comment.mesh.position.set(position.x, position.y, position.z);

      if (needsUpdate) this._viewer.impl.invalidate(true);
    }
  }

  public removeComment(id: number | string, needsUpdate: boolean = true) {
    const comment = this._comments.get(id);

    if (comment) {
      this._viewer.overlays.removeMesh(comment.mesh, this._overlayScene);
      this._comments.delete(id);
    }

    if (needsUpdate) this._viewer.impl.invalidate(true);
  }

  public updateComments(
    comments: Array<{
      id: string | number;
      markup_position: { x: number; y: number; z: number } | null;
    }>
  ) {
    const incomingCommentIds = new Set();

    // Process new, updated, and comments to delete (if position is null)
    comments.forEach((comment) => {
      incomingCommentIds.add(comment.id);
      const existingComment = this._comments.get(comment.id);

      // If the comment's position is null, delete the comment
      if (comment.markup_position === null) {
        if (existingComment) {
          // Comment exists and needs to be deleted
          this.removeComment(comment.id, false);
        }
        // Skip further processing for this comment
        return;
      }

      if (!existingComment) {
        // This is a new comment with a valid position, add it
        this.addComment(comment.id, comment.markup_position, false);
      } else {
        // This is an existing comment, check if it needs an update
        if (
          existingComment.position.x !== comment.markup_position.x ||
          existingComment.position.y !== comment.markup_position.y ||
          existingComment.position.z !== comment.markup_position.z
        ) {
          // Position has changed, update the comment
          this.updateComment(comment.id, comment.markup_position, false);
        }
      }
    });

    // Identify and remove comments that are no longer present in the incoming list
    this._comments.forEach((_, key) => {
      if (!incomingCommentIds.has(key)) {
        // This comment was not in the incoming list, remove it
        this.removeComment(key, false);
      }
    });

    // Finally, invalidate the viewer to reflect changes
    this._viewer.impl.invalidate(true);
  }
}

interface Comment {
  id: string | number;
  position: { x: number; y: number; z: number };
  mesh: any;
}

export default CommentsExtension;
