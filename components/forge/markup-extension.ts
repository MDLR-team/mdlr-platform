import CommentsExtension from "./comments-extension";

class MarkupExtension {
  private _viewer: any;
  private _camera: any;
  private _domElement: any;
  private _enabled: boolean = false;

  private _searchMarkup: MarkupEntity | null;
  private _markup: MarkupEntity | null;

  private _svgCanvas: HTMLElement;

  private _commentsExtension: CommentsExtension;

  private $setMarkupPosition: any;

  constructor(viewer: any, options: any = {}) {
    this._viewer = viewer;
    this._camera = viewer.impl.camera;
    this._domElement = viewer.canvas;

    this._svgCanvas = document.getElementById("comments_layer") as HTMLElement;

    this.mouseMove = this.mouseMove.bind(this);
    this.mouseDown = this.mouseDown.bind(this);

    this._searchMarkup = null;
    this._markup = null;

    this._rerenderMarkupPosition = this._rerenderMarkupPosition.bind(this);

    // Comment extension
    const commentsExtension = new CommentsExtension(this);
    this._commentsExtension = commentsExtension;
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

    return container;
  }

  /**
   * creates a svg element to be used as a markup in the viewer.
   */
  public createMarkupSvg() {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("pointer-events", "all");

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

    return g;
  }

  /**
   * Enables or disables the markup extension and sets up or removes the necessary event listeners and overlays.
   * @param flag - Boolean flag to enable or disable the extension.
   */
  enable(flag: boolean) {
    this._enabled = flag;

    if (this._enabled) {
      this._addSearchMarkup();

      this.setupEventListeners();

      this._viewer.toolController.activateTool("measure");
      this._addCameraChangedListener();
    } else {
      this._removeSearchMarkup();
      this._removeMarkup();

      this.removeEventListeners();

      this._viewer.toolController.deactivateTool("measure");
      this._removeCameraChangedListener();
    }

    this._viewer.impl.invalidate(true);
  }

  private _rerenderMarkupPosition() {
    const markup = this._markup;

    if (markup) {
      const position = markup.position;
      const entity = markup.entity;

      const { x, y } = this._toScreenXY(position);

      entity.setAttribute("transform", `translate(${x - 12}, ${y - 28})`);
    }
  }

  private _addCameraChangedListener() {
    const Autodesk = (window as any).Autodesk;

    this._viewer.addEventListener(
      Autodesk.Viewing.CAMERA_CHANGE_EVENT,
      this._rerenderMarkupPosition
    );
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

    const measureTool = this._viewer.loadedExtensions["Autodesk.Measure"];
    const snapper = measureTool.measureTool.getSnapper();
    const snapResult = snapper.getSnapResult();

    const geomVertex = snapResult.geomVertex;

    /* console.log("measureTool", snapper);
    console.log("vertex", snapper.getVertex());
    console.log("snap result", snapper.getSnapResult());
    console.log("snap to pixel", snapper.getSnapToPixel()); */

    //if (rayIntersect) {
    if (geomVertex) {
      //const { intersectPoint } = rayIntersect;
      const { intersectPoint } = snapResult;
      const screenPos = this._viewer.worldToClient(intersectPoint);

      // Show and position the HTML circle
      const searchMarkup = this._searchMarkup;
      if (searchMarkup) {
        const { entity } = searchMarkup;

        entity.style.left = `${screenPos.x - entity.offsetWidth / 2}px`;
        entity.style.top = `${screenPos.y - entity.offsetHeight / 2}px`;
        entity.style.display = "block";
      }
    } else {
      const searchMarkup = this._searchMarkup;
      if (searchMarkup) {
        const { entity } = searchMarkup;
        entity.style.display = "none";
      }
    }
  }

  //mousedown event that ask commentsExtension to add a comment and send the position of the markup
  private mouseDown(event: any) {
    this._viewer.toolController.deactivateTool("measure");

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

      this._removeSearchMarkup();

      this._addMarkup(intersectPoint);
    }
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

  public get viewer() {
    return this._viewer;
  }

  public provideStates(states: any) {
    this.$setMarkupPosition = states.setMarkupPosition;
  }

  public updateComments(comments: any) {
    this._commentsExtension.updateComments(comments);
  }

  private _removeCameraChangedListener() {
    const Autodesk = (window as any).Autodesk;

    this._viewer.removeEventListener(
      Autodesk.Viewing.CAMERA_CHANGE_EVENT,
      this._rerenderMarkupPosition
    );
  }

  private _addSearchMarkup() {
    if (!this._searchMarkup) {
      this._searchMarkup = {
        entity: this.createHtmlCircle(),
        position: { x: 0, y: 0, z: 0 },
      };

      document.body.appendChild(this._searchMarkup.entity);
    }
  }

  private _addMarkup(position: { x: number; y: number; z: number }) {
    if (!this._markup) {
      this._markup = {
        entity: this.createMarkupSvg(),
        position,
      };

      this._svgCanvas.appendChild(this._markup.entity);
    }

    this._rerenderMarkupPosition();
  }

  private _removeMarkup() {
    if (this._markup) {
      this._svgCanvas.removeChild(this._markup.entity);
      this._markup = null;
    }
  }

  private _removeSearchMarkup() {
    if (this._searchMarkup) {
      document.body.removeChild(this._searchMarkup.entity);
      this._searchMarkup = null;
    }
  }

  /**
   * Disposes of the MarkupExtension, cleaning up resources and event listeners.
   */
  public dispose() {
    this._commentsExtension.dispose();

    this.removeEventListeners();
    this._removeCameraChangedListener();

    this._removeMarkup();
    this._removeSearchMarkup();
  }
}

interface MarkupEntity {
  position: { x: number; y: number; z: number };
  entity: any;
}

export default MarkupExtension;
