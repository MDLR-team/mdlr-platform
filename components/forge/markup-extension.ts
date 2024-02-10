class MarkupExtension {
  private _viewer: any;
  private _scene: any;
  private _camera: any;
  private _domElement: any;
  private _enabled: boolean = false;
  private _markupMesh: any;

  private _overlayScene: string = "markup-selection-overlay-scene";

  constructor(viewer: any) {
    this._viewer = viewer;
    this._scene = viewer.impl.scene;
    this._camera = viewer.impl.camera;
    this._domElement = viewer.canvas;

    console.log("thissd", this._domElement);

    this._createOverlayScene();

    this.createMarkupMesh();

    this.mouseMove = this.mouseMove.bind(this);
  }

  private _createOverlayScene() {
    const overlayScene = this._overlayScene;

    if (!this._viewer.overlays.hasScene(overlayScene)) {
      this._viewer.overlays.addScene(overlayScene);
    }
  }

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
    this._markupMesh = mesh;
  }

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

  private getPointer(event: any, _domElement: any) {
    const THREE = (window as any).THREE;

    const rect = _domElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    return new THREE.Vector3(x, y, -1);
  }

  private mouseMove(event: any) {
    const THREE = (window as any).THREE;

    if (!this._enabled) return;

    const pointer = this.getPointer(event, this._domElement);

    const ray = new THREE.Ray();
    this._viewer.impl.viewportToRay(pointer, ray);

    const rayIntersect = this._viewer.impl.rayIntersect(ray, true, null);

    console.log(rayIntersect);

    if (rayIntersect) {
      this._markupMesh.visible = true;

      const { intersectPoint } = rayIntersect;

      this._markupMesh.position.copy(intersectPoint);

      this._viewer.impl.invalidate(true);
    } else {
      this._markupMesh.visible = false;
      this._viewer.impl.invalidate(true);
    }
  }

  setupEventListeners() {
    this._domElement.addEventListener("mousemove", this.mouseMove);
    /* document.addEventListener("mouseDown", this.mouseDown);
    document.addEventListener("mouseUp", this.mouseUp); */
  }

  private removeEventListeners() {
    this._domElement.removeEventListener("mousemove", this.mouseMove);
    /* document.removeEventListener("mouseDown", this.mouseDown);
    document.removeEventListener("mouseUp", this.mouseUp); */
  }

  private removeMarkupMesh() {
    this._viewer.overlays.removeMesh(this._markupMesh, this._overlayScene);
  }

  public dispose() {
    this.removeEventListeners();
    this.removeMarkupMesh();
  }
}

export default MarkupExtension;
