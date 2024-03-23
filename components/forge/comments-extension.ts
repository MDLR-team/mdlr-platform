import ActiveCommentService from "../services/project-services/active-comment-service/active-comment-service";
import GlobalStatesService from "../services/project-services/global-states-service/global-states-service";
import MarkupExtension from "./markup-extension";

class CommentsExtension {
  private _markupExtension: MarkupExtension;
  private _viewer: any;
  private _globalStatesService: GlobalStatesService;
  private _activeCommentService: ActiveCommentService;
  private _camera: any;

  private _renderType: "mesh" | "svg" = "svg";

  private _comments: Map<string | number, Comment>;

  private _overlayScene: string = "comments-overlay-scene";
  private _svgCanvas: HTMLElement;

  constructor(markupExtension: MarkupExtension) {
    this._markupExtension = markupExtension;
    this._viewer = markupExtension.viewer;
    this._globalStatesService = markupExtension.globalStatesService;
    this._activeCommentService = markupExtension.activeCommentService;

    this._camera = this._viewer.getCamera();

    this._svgCanvas = document.getElementById("comments_layer") as HTMLElement;

    this._comments = new Map();

    this._createOverlayScene();

    this._onCameraChange = this._onCameraChange.bind(this);
    this.selectComment = this.selectComment.bind(this);

    this._addEventListeners();
  }

  private _addEventListeners() {
    const Autodesk = (window as any).Autodesk;

    this._viewer.addEventListener(
      Autodesk.Viewing.CAMERA_CHANGE_EVENT,
      this._onCameraChange
    );

    window.addEventListener("resize", this._onCameraChange);
  }

  private _removeEventListeners() {
    const Autodesk = (window as any).Autodesk;

    this._viewer.removeEventListener(
      Autodesk.Viewing.CAMERA_CHANGE_EVENT,
      this._onCameraChange
    );

    window.removeEventListener("resize", this._onCameraChange);
  }

  private _toScreenXY(position: { x: number; y: number; z: number }): {
    x: number;
    y: number;
  } {
    const THREE = (window as any).THREE;
    const camera = this._camera;

    const viewerCanvas = this._viewer.canvas;

    const widthHalf = 0.5 * viewerCanvas.clientWidth;
    const heightHalf = 0.5 * viewerCanvas.clientHeight;

    const worldPoint = new THREE.Vector3(position.x, position.y, position.z);

    const point = worldPoint.clone().project(camera);

    const x = Math.round(point.x * widthHalf + widthHalf);
    const y = Math.round(-point.y * heightHalf + heightHalf);

    return { x, y };
  }

  private _onCameraChange() {
    if (this._renderType === "svg") {
      // each comment's position to screen xy
      this._comments.forEach((comment) => {
        if (comment) {
          if (comment.svg && comment.position) {
            this._updateSvgPosition(comment);
          }
        }
      });
    }

    // check if selected comment is still in view
    const activeComment = this._activeCommentService.activeComment;

    if (activeComment) {
      const comment = this._comments.get(activeComment.id);
      if (comment) {
        const position = this._toScreenXY(comment.position);
        this._activeCommentService.updateCommentPosition(position);
      }
    }
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
    const { x, y } = this._toScreenXY(comment.position);

    const svg = comment.svg;

    svg.setAttribute("transform", `translate(${x - 12}, ${y - 30})`);
  }

  public addComment(
    id: string | number,
    position: { x: number; y: number; z: number },
    needsUpdate: boolean = true
  ) {
    const mesh = this.createMarkupMesh();
    const svg = this.createMarkupSvg(this._comments.size + 1);

    // add event click for svg and navigate to comment
    svg.addEventListener("click", () => {
      this._activeCommentService.selectComment(id);
    });

    // for mesh
    if (this._renderType === "mesh") {
      this._viewer.overlays.addMesh(mesh, this._overlayScene);
      mesh.position.set(position.x, position.y, position.z);
    }

    // for svg
    if (this._renderType === "svg") {
      this._svgCanvas.appendChild(svg);
    }

    this._comments.set(id, {
      id,
      position: { x: position.x, y: position.y, z: position.z },
      mesh,
      svg,
      index: this._comments.size,
    });

    // update svg position
    this._updateSvgPosition(this._comments.get(id)!);

    if (needsUpdate) this._viewer.impl.invalidate(true);
  }

  public updateComment(
    id: number | string,
    position: { x: number; y: number; z: number },
    needsUpdate: boolean = true
  ) {
    const comment = this._comments.get(id);

    if (comment) {
      // for mesh
      if (this._renderType === "mesh") {
        comment.position = position;
        comment.mesh.position.set(position.x, position.y, position.z);
      }

      // for svg
      if (this._renderType === "svg") {
        this._updateSvgPosition(comment);
      }

      if (needsUpdate) this._viewer.impl.invalidate(true);
    }
  }

  public removeComment(id: number | string, needsUpdate: boolean = true) {
    const comment = this._comments.get(id);

    if (comment) {
      // for mesh
      if (this._renderType === "mesh") {
        this._viewer.overlays.removeMesh(comment.mesh, this._overlayScene);
      }

      // for svg
      if (this._renderType === "svg") {
        this._svgCanvas.removeChild(comment.svg);
      }

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

  // navigate camera to center of xyz of comment
  public navigateToComment(id: number | string) {
    const comment = this._comments.get(id);

    const THREE = (window as any).THREE;

    if (comment) {
      const position = comment.position;
      const viewer = this._viewer;

      const camera = viewer.getCamera();
      const navapi = viewer.navigation;

      navapi.setTarget(position);
    }
  }

  public selectComment(id: number | string | null, needsNavigate: boolean) {
    if (!id) return;

    const comment = this._comments.get(id);

    if (comment) {
      if (needsNavigate) this.navigateToComment(comment.id);

      const position = this._toScreenXY(comment.position);
      this._activeCommentService.updateCommentPosition(position);
    }
  }

  public dispose() {
    this._removeEventListeners();

    this._comments.forEach((comment) => {
      this.removeComment(comment.id, false);
    });

    this._viewer.overlays.removeScene(this._overlayScene);
  }
}

interface Comment {
  id: string | number;
  position: { x: number; y: number; z: number };
  mesh: any;
  svg: any;
  index: number;
}

export default CommentsExtension;
