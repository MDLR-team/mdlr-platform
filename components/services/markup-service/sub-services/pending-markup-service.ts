import { createMarkupSvg } from "../../project-services/markup-3d-service/utils/create-markup-svg";
import { getPointer } from "../../project-services/pending-markup-3d-service/utils/get-pointer";
import ProjectService from "../../project-services/project-service/project-service";
import MarkupService from "../markup-service";
import { Markup2D } from "./spatial-markup-service";
import { Markup3D } from "./top-markup-service";
import hotkeys from "hotkeys-js";

class PendingMarkupService {
  private markup3D: Markup3D | null = null;
  private markup2D: Markup2D | null = null;
  private is3DMode: boolean = true;

  constructor(
    private projectService: ProjectService,
    private markupService: MarkupService
  ) {
    this.addHotkeyListeners();
    this.markupService.enabledAdding$.subscribe(this.handleEnabledAddingChange);
    this.markupService.enabled2D$.subscribe(this.handleEnabled2DChange);
  }

  private handleEnabledAddingChange = (enabled: boolean) => {
    const viewer = this.markupService.viewer$.value;
    if (!viewer) return;

    if (enabled) {
      this.is3DMode ? this.activate3DMode(viewer) : this.activate2DMode();
    } else {
      this.deactivate3DMode(viewer);
      this.deactivate2DMode();
    }
  };

  private handleEnabled2DChange = (enabled: boolean) => {
    this.is3DMode = !enabled;
    this.deactivate();
  };

  private activate3DMode(viewer: any) {
    viewer.toolController.activateTool("measure");
    this.addEventListeners3D();
  }

  private deactivate3DMode(viewer: any) {
    viewer.toolController.deactivateTool("measure");

    if (this.markup3D) {
      this.removeEventListeners3D();
      this.cleanupMarkup3D();
    }

    viewer.toolController.deactivateTool("measure");
  }

  private activate2DMode() {
    this.addEventListeners2D();
  }

  private deactivate2DMode() {
    if (this.markup2D) {
      this.removeEventListeners2D();
      this.cleanupMarkup2D();
    }
  }

  private cleanupMarkup3D() {
    if (this.markup3D) {
      this.markupService.svg3DCanvas?.removeChild(this.markup3D.svg);
      this.markupService.removeTempEnt3D("pending");
      this.markup3D = null;
    }
  }

  private cleanupMarkup2D() {
    if (this.markup2D) {
      this.markupService.svg2DCanvas?.removeChild(this.markup2D.svg);
      this.markup2D = null;
    }
  }

  public activate = () => {
    this.markupService.enabledAdding$.next(true);
  };

  public deactivate = () => {
    this.markupService.enabledAdding$.next(false);
  };

  /**
   * Adds an SVG element to the DOM to represent the pending markup.
   */
  private addPendingMarkup3D() {
    const svg = createMarkupSvg(1, "pending");
    svg.style.pointerEvents = "none";

    this.markup3D = {
      id: "pending",
      position: { x: 0, y: 0, z: 0 },
      svg,
    };

    this.markupService.svg3DCanvas?.appendChild(svg);

    this.markupService.addTempEnt3D({
      id: "pending",
      position: { x: 0, y: 0, z: 0 },
      callback: this.changeMarkupPosition,
    });
  }

  /**
   * Adds an SVG element to the DOM to represent the pending markup.
   */
  private addPendingMarkup2D() {
    const svg = createMarkupSvg(1, "pending");
    svg.style.pointerEvents = "none";

    this.markup2D = {
      id: "pending",
      position: { x: 0, y: 0 },
      svg,
    };

    this.markupService.svg2DCanvas?.appendChild(svg);
  }

  /**
   * Updates the position of the markup SVG based on screen coordinates.
   */
  private changeMarkupPosition = (xy: { x: number; y: number }) => {
    const markup = this.is3DMode ? this.markup3D : this.markup2D;

    if (markup) {
      markup.svg.style.transform = `translate(${xy.x}px, ${xy.y - 27}px)`;
    }
  };

  /**
   * Handles mouse move events to update the position of the pending markup based on the current pointer location.
   */
  private handleMouseMove3D = (event: any) => {
    const THREE = (window as any).THREE;
    const viewer = this.markupService.viewer$.value;
    const canvas = viewer.canvas;

    if (!this.markup3D) this.addPendingMarkup3D();

    const pointer = getPointer(event, canvas);
    const ray = new THREE.Ray();
    viewer.impl.viewportToRay(pointer, ray);
    const rayIntersect = viewer.impl.rayIntersect(ray, true, null);

    const measureTool = viewer.loadedExtensions["Autodesk.Measure"];
    const snapper = measureTool.measureTool.getSnapper();
    const snapResult = snapper.getSnapResult();

    if (snapResult.geomVertex) {
      const { intersectPoint } = snapResult;
      this.markupService.updateTempEnt3D("pending", intersectPoint);

      this.markup3D!.svg.style.display = "block";
    } else {
      this.markup3D!.svg.style.display = "none";
    }
  };

  /**
   * Handles mouse move 2D
   */
  private handleMouseMove2D = (event: any) => {
    const { clientX, clientY } = event;
    const { left, top } =
      this.markupService.svg2DCanvas!.getBoundingClientRect();

    const offsetX = clientX - left;
    const offsetY = clientY - top;

    if (!this.markup2D) this.addPendingMarkup2D();

    this.changeMarkupPosition({ x: offsetX, y: offsetY });
  };

  /**
   * handkes mouse down 2d
   */
  private handleMouseDown2D = (event: any) => {
    this.deactivate();
  };

  /**
   * Handles mouse down events to finalize the placement of a new markup based on the current pointer location.
   * @param {MouseEvent} event - The mouse event triggered by clicking the mouse button.
   */
  private handleMouseDown3D = (event: any) => {
    this.deactivate();
  };

  /**
   * Sets up necessary event listeners for interactive behavior during the markup placement process.
   */
  private addEventListeners3D() {
    const viewer = this.markupService.viewer$.value;
    const canvas = viewer.canvas;

    canvas!.addEventListener("mousemove", this.handleMouseMove3D);
    canvas!.addEventListener("mousedown", this.handleMouseDown3D);
  }

  /**
   * Sets up necessary event listeners for interactive behavior during the markup placement process.
   */
  private addEventListeners2D() {
    const canvas = document.getElementsByClassName(
      "paper-canvas"
    )[0] as HTMLElement;

    canvas?.addEventListener("mousemove", this.handleMouseMove2D);
    canvas?.addEventListener("mousedown", this.handleMouseDown2D);
  }

  /**
   * Removes event listeners previously set up for interactive markup behavior.
   */
  private removeEventListeners3D() {
    const viewer = this.markupService.viewer$.value;
    const canvas = viewer.canvas;

    canvas!.removeEventListener("mousemove", this.handleMouseMove3D);
    canvas!.removeEventListener("mousedown", this.handleMouseDown3D);
  }

  /**
   * Removes event listeners previously set up for interactive markup behavior.
   */
  private removeEventListeners2D() {
    const canvas = document.getElementsByClassName(
      "paper-canvas"
    )[0] as HTMLElement;

    canvas?.removeEventListener("mousemove", this.handleMouseMove2D);
    canvas?.removeEventListener("mousedown", this.handleMouseDown2D);
  }

  /**
   * Adds hotkey listeners for interactive markup behavior.
   */
  private addHotkeyListeners() {
    hotkeys("esc", this.deactivate);
    hotkeys("c, C", this.activate);
  }

  /**
   * Removes hotkey listeners for interactive markup behavior.
   */
  private removeHotkeyListeners() {
    hotkeys.unbind("esc", this.deactivate);
    hotkeys.unbind("c, C", this.activate);
  }

  public dispose() {
    this.removeEventListeners3D();
    this.removeEventListeners2D();
    this.removeHotkeyListeners();
  }
}

export default PendingMarkupService;
