import { createMarkupSvg } from "../../project-services/markup-3d-service/utils/create-markup-svg";
import { getPointer } from "../../project-services/pending-markup-3d-service/utils/get-pointer";
import ProjectService from "../../project-services/project-service/project-service";
import MarkupService from "../markup-service";
import { Markup3D } from "./top-markup-service";
import hotkeys from "hotkeys-js";

class PendingMarkupService {
  private markup: Markup3D | null = null;

  constructor(
    private projectService: ProjectService,
    private markupService: MarkupService
  ) {
    this.addHotkeyListeners();

    this.markupService.enabledAdding$.subscribe((enabled) => {
      const viewer = this.markupService.viewer$.value;
      if (!viewer) return;

      if (enabled) {
        viewer.toolController.activateTool("measure");
        this.addEventListeners();
      } else {
        viewer.toolController.deactivateTool("measure");
        this.removeEventListeners();
      }
    });
  }

  public activate = () => {
    this.markupService.enabledAdding$.next(true);
  };

  public deactivate = () => {
    this.markupService.enabledAdding$.next(false);

    if (this.markup) {
      this.markupService.svg3DCanvas?.removeChild(this.markup.svg);
      this.markupService.removeTempEnt3D("pending");
      this.markup = null;
    }
  };

  /**
   * Adds an SVG element to the DOM to represent the pending markup.
   */
  private addPendingMarkup() {
    const svg = createMarkupSvg(1, "pending");
    svg.style.pointerEvents = "none";

    this.markup = {
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
   * Updates the position of the markup SVG based on screen coordinates.
   */
  private changeMarkupPosition = (xy: { x: number; y: number }) => {
    if (this.markup) {
      this.markup.svg.style.transform = `translate(${xy.x}px, ${xy.y - 27}px)`;
    }
  };

  /**
   * Handles mouse move events to update the position of the pending markup based on the current pointer location.
   */
  private handleMouseMove = (event: any) => {
    const THREE = (window as any).THREE;
    const viewer = this.markupService.viewer$.value;
    const canvas = viewer.canvas;

    if (!this.markup) {
      this.addPendingMarkup();
    }

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

      this.markup!.svg.style.display = "block";
    } else {
      this.markup!.svg.style.display = "none";
    }
  };

  /**
   * Handles mouse down events to finalize the placement of a new markup based on the current pointer location.
   * @param {MouseEvent} event - The mouse event triggered by clicking the mouse button.
   */
  private handleMouseDown = (event: any) => {
    this.deactivate();
  };

  /**
   * Sets up necessary event listeners for interactive behavior during the markup placement process.
   */
  private addEventListeners() {
    const viewer = this.markupService.viewer$.value;
    const canvas = viewer.canvas;

    canvas!.addEventListener("mousemove", this.handleMouseMove);
    canvas!.addEventListener("mousedown", this.handleMouseDown);
  }

  /**
   * Removes event listeners previously set up for interactive markup behavior.
   */
  private removeEventListeners() {
    const viewer = this.markupService.viewer$.value;
    const canvas = viewer.canvas;

    canvas!.removeEventListener("mousemove", this.handleMouseMove);
    canvas!.removeEventListener("mousedown", this.handleMouseDown);
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
    this.removeEventListeners();
    this.removeHotkeyListeners();
  }
}

export default PendingMarkupService;
