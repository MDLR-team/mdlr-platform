import CommentsExtension from "./comments-extension";

interface MarkupExtensionOptions {
  markupType?: "html" | "three";
}

class MarkupExtension {
  private _viewer: any;
  private _scene: any;
  private _camera: any;
  private _domElement: any;
  private _enabled: boolean = false;

  private _markupMesh: any;
  private _htmlCircle: any;

  private _activeMarkup: any;

  private _markupType: "html" | "three";

  private _overlayScene: string = "markup-selection-overlay-scene";

  private _commentsExtension: CommentsExtension;

  private $setMarkupPosition: any;

  constructor(viewer: any, options: any = {}) {
    this._viewer = viewer;
    this._scene = viewer.impl.scene;
    this._camera = viewer.impl.camera;
    this._domElement = viewer.canvas;

    this._markupType = options?.markupType || "html";

    this._createOverlayScene();

    if (this._markupType === "three") {
      this.createMarkupMesh();
    } else if (this._markupType === "html") {
      this.createHtmlCircle();
    }

    this.mouseMove = this.mouseMove.bind(this);
    this.mouseDown = this.mouseDown.bind(this);

    const commentsExtension = new CommentsExtension(this);
    this._commentsExtension = commentsExtension;
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
  private createMarkupMesh(needsMesh = false) {
    const THREE = (window as any).THREE;

    const geom = new THREE.SphereGeometry(3000, 8, 8);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      opacity: 1,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geom, material);

    if (!needsMesh) {
      this._markupMesh = mesh;
    } else {
      return mesh;
    }
  }

  /**
   * Creates an HTML div element styled as a circle, along with text, to be used as markup.
   */
  private createHtmlCircle() {
    // Create the container for the circle and the text
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.display = "none"; // Initially hidden
    container.style.zIndex = "1000";
    container.style.pointerEvents = "none";

    // Create the circle
    const circle = document.createElement("div");
    circle.className = "markup-circle"; // Use for CSS styling
    circle.style.width = "20px";
    circle.style.height = "20px";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
    circle.style.position = "absolute";
    circle.style.left = "0";
    circle.style.top = "0";
    circle.style.transform = "translate(-50%, -50%)"; // Customize opacity as needed
    circle.style.border = "2px solid blue"; // Customize border as needed

    // Add pulsing animation to the circle
    circle.style.animation = "pulse 2s infinite";

    // Create the text element
    const text = document.createElement("div");
    text.className = "markup-text"; // Use for CSS styling
    text.innerText = "Specify markup position..."; // Customize this as needed
    text.style.position = "absolute";
    text.style.left = "50%";
    text.style.bottom = "20px";
    text.style.fontWeight = "bold";
    text.style.color = "blue"; // Customize color as needed
    text.style.whiteSpace = "nowrap";

    // Append the circle and text to the container
    container.appendChild(text);
    container.appendChild(circle);

    // Append the container to the DOM
    document.body.appendChild(container);

    // Save references to the container and circle for later use
    this._htmlCircle = container;
  }

  /**
   * Enables or disables the markup extension and sets up or removes the necessary event listeners and overlays.
   * @param flag - Boolean flag to enable or disable the extension.
   */
  enable(flag: boolean) {
    this._enabled = flag;

    if (this._enabled) {
      this._viewer.overlays.addMesh(this._markupMesh, this._overlayScene);
      this.setupEventListeners();
    } else {
      this._viewer.overlays.removeMesh(this._markupMesh, this._overlayScene);
      this.removeEventListeners();
    }

    this._viewer.impl.invalidate(true);
  }

  /**
   * Converts a mouse event to a THREE.Vector3 object representing a pointer in normalized device coordinates (NDC).
   * @param event - The mouse event.
   * @param _domElement - The DOM element of the viewer's canvas.
   * @returns A THREE.Vector3 object in NDC.
   */
  private getPointer(event: any, _domElement: any) {
    const THREE = (window as any).THREE;

    const rect = _domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    return new THREE.Vector3(x, y, -1);
  }

  /**
   * Handles mouse move events to reposition the markup based on the current pointer position.
   * @param event - The mouse move event.
   */
  private mouseMove(event: any) {
    const THREE = (window as any).THREE;

    if (!this._enabled) return;

    const pointer = this.getPointer(event, this._domElement);
    const ray = new THREE.Ray();
    this._viewer.impl.viewportToRay(pointer, ray);
    const rayIntersect = this._viewer.impl.rayIntersect(ray, true, null);

    if (rayIntersect) {
      const { intersectPoint } = rayIntersect;
      const screenPos = this._viewer.worldToClient(intersectPoint);

      if (this._markupType === "three") {
        // Show and position the Three.js mesh
        this._markupMesh.visible = true;
        this._markupMesh.position.copy(intersectPoint);
      } else if (this._markupType === "html") {
        // Show and position the HTML circle
        this._htmlCircle.style.display = "block";
        this._htmlCircle.style.left = `${
          screenPos.x - this._htmlCircle.offsetWidth / 2
        }px`;
        this._htmlCircle.style.top = `${
          screenPos.y - this._htmlCircle.offsetHeight / 2
        }px`;
      }

      this._viewer.impl.invalidate(true);
    } else {
      if (this._markupType === "three") {
        this._markupMesh.visible = false;
      } else if (this._markupType === "html") {
        this._htmlCircle.style.display = "none";
      }

      this._viewer.impl.invalidate(true);
    }
  }

  //mousedown event that ask commentsExtension to add a comment and send the position of the markup
  private mouseDown(event: any) {
    const THREE = (window as any).THREE;

    console.log("mouse down event", event);

    const pointer = this.getPointer(event, this._domElement);
    const ray = new THREE.Ray();
    this._viewer.impl.viewportToRay(pointer, ray);
    const rayIntersect = this._viewer.impl.rayIntersect(ray, true, null);

    if (rayIntersect) {
      const { intersectPoint } = rayIntersect;

      this.$setMarkupPosition({
        x: intersectPoint.x,
        y: intersectPoint.y,
        z: intersectPoint.z,
      });

      if (this._activeMarkup) {
        this._viewer.overlays.removeMesh(
          this._activeMarkup,
          this._overlayScene
        );
      }

      const activeMarkup = this.createMarkupMesh(true);
      activeMarkup.position.copy(intersectPoint);

      this._viewer.overlays.addMesh(activeMarkup, this._overlayScene);

      this._activeMarkup = activeMarkup;
    }
  }

  public clearActiveMarkup() {
    if (this._activeMarkup) {
      this._viewer.overlays.removeMesh(this._activeMarkup, this._overlayScene);
      this._activeMarkup = null;

      this.$setMarkupPosition(null);
    }
  }

  /**
   * Sets up necessary event listeners for interactive markup behavior.
   */
  setupEventListeners() {
    this._domElement.addEventListener("mousemove", this.mouseMove);
    this._domElement.addEventListener("mousedown", this.mouseDown);
    //document.addEventListener("mouseUp", this.mouseUp); */
  }

  /**
   * Removes event listeners previously set up for interactive markup behavior.
   */
  private removeEventListeners() {
    this._domElement.removeEventListener("mousemove", this.mouseMove);
    this._domElement.removeEventListener("mousedown", this.mouseDown);

    // document.removeEventListener("mouseUp", this.mouseUp); */
  }

  /**
   * Removes the Three.js mesh from the overlay scene.
   */
  private removeMarkupMesh() {
    this._viewer.overlays.removeMesh(this._markupMesh, this._overlayScene);
  }

  /**
   * Removes the HTML circle from the document body.
   */
  private removeHtmlCircle() {
    // this._domElement.removeChild(this._htmlCircle);
    document.body.removeChild(this._htmlCircle);
  }

  public get viewer() {
    return this._viewer;
  }

  public provideStates(states: any) {
    this.$setMarkupPosition = states.setMarkupPosition;
  }

  public updateComments(comments: any) {
    this._commentsExtension.updateComments(comments);
  }

  /**
   * Disposes of the MarkupExtension, cleaning up resources and event listeners.
   */
  public dispose() {
    this.removeEventListeners();

    if (this._markupType === "three") {
      this.removeMarkupMesh();
    } else if (this._markupType === "html") {
      this.removeHtmlCircle();
    }
  }
}

export default MarkupExtension;
