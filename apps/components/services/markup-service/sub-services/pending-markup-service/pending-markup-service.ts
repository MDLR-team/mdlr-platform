import { transformPointToNormalizedCoords } from "../utils/point-2-normalized-coord";
import { createMarkupSvg, MarkupSVGType } from "../utils/create-markup-svg";
import { getPointer } from "../utils/get-pointer";
import ProjectService from "../../../project-services/project-service/project-service";
import MarkupService from "../../markup-service";
import { Markup2D } from "../spatial-markup-service";
import { Markup3D } from "../top-markup-service";
import hotkeys from "hotkeys-js";

export interface PendingCommentOptions {
  svgType?: MarkupSVGType;
  id?: string;
}

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

  /**
   * Activates markup addition mode, setting the state to enabled.
   */
  public activate = () => {
    this.markupService.activatedService = this;
    this.markupService.enabledAdding$.next(true);
  };

  /**
   * Deactivates markup addition mode, cleaning up and resetting the state.
   */
  public deactivate = () => {
    if (this.markupService.activatedService instanceof PendingMarkupService) {
      this.markupService.activatedService = null;
    }

    this.markupService.enabledAdding$.next(false);
  };

  /**
   * Handles changes to the enabling state of adding markups, activating or deactivating the appropriate mode.
   */
  private handleEnabledAddingChange = (enabled: boolean) => {
    const viewerType = this.projectService.viewerType$.value;

    if (viewerType === "aps") {
      // APS viewer
      const viewer = this.markupService.viewer$.value;
      if (!viewer) return;

      if (enabled) {
        this.is3DMode ? this.activate3DMode(viewer) : this.activate2DMode();
      } else {
        this.deactivate3DMode(viewer);
        this.deactivate2DMode();
      }
    } else {
      // 2D viewer
      if (enabled) {
        this.activate2DMode();
      } else {
        this.deactivate2DMode();
      }
    }
  };

  /**
   * Handles changes to the dimension mode (2D/3D), switching the current mode and deactivating the previous mode.
   */
  private handleEnabled2DChange = (enabled: boolean) => {
    this.is3DMode = !enabled;
    this.deactivate();
  };

  /**
   * Activates the 3D mode, enabling the measure tool and adding necessary event listeners.
   */
  private activate3DMode(viewer: any) {
    viewer.toolController?.activateTool("measure");
    this.addEventListeners3D();
  }

  /**
   * Deactivates the 3D mode, disabling the measure tool and removing event listeners.
   */
  private deactivate3DMode(viewer: any) {
    viewer.toolController?.deactivateTool("measure");

    if (this.markup3D) {
      this.removeEventListeners3D();
      this.cleanupMarkup3D();
    }

    viewer.toolController.deactivateTool("measure");
  }

  /**
   * Activates the 2D mode, adding necessary event listeners for 2D interactions.
   */
  private activate2DMode() {
    this.addEventListeners2D();
  }

  /**
   * Deactivates the 2D mode, removing event listeners and cleaning up any existing 2D markups.
   */
  private deactivate2DMode() {
    if (this.markup2D) {
      this.removeEventListeners2D();
      this.cleanupMarkup2D();
    }
  }

  /**
   * Cleans up and removes the 3D markup from the canvas.
   */
  private cleanupMarkup3D() {
    if (this.markup3D) {
      this.markupService.svg3DCanvas?.removeChild(this.markup3D.svg);
      this.markupService.removeTempEnt3D("pending");
      this.markup3D = null;
    }
  }

  /**
   * Cleans up and removes the 2D markup from the canvas.
   */
  private cleanupMarkup2D() {
    if (this.markup2D) {
      console.log("this.markup2D", this.markup2D);

      this.markupService.svg2DCanvas?.removeChild(this.markup2D.svg);
      this.markupService.removeTempEnt2D("pending");
      this.markup2D = null;
    }
  }

  /**
   * Adds an SVG element to the DOM to represent the pending markup.
   */
  public addPendingMarkup3D() {
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
  public addPendingMarkup2D() {
    const svg = createMarkupSvg(1, "pending");
    svg.style.pointerEvents = "none";

    this.markup2D = {
      id: "pending",
      position: { x: 0, y: 0 },
      svg,
    };

    this.markupService.svg2DCanvas?.appendChild(svg);

    this.markupService.addTempEnt2D({
      id: "pending",
      position: { x: 0, y: 0 },
      callback: this.changeMarkupPosition,
    });
  }

  /**
   * Updates the position of the markup SVG based on screen coordinates.
   */
  private changeMarkupPosition = (xy: { x: number; y: number }) => {
    const markup = this.is3DMode ? this.markup3D : this.markup2D;

    if (markup) {
      this.moveMarkup(markup.svg, xy);
    }
  };

  /**
   * Moves the markup SVG to the specified screen coordinates.
   */
  public moveMarkup = (svg: SVGElement, xy: { x: number; y: number }) => {
    if (!svg) return;
    svg.style.transform = `translate(${xy.x}px, ${xy.y - 27}px)`;
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
  private handleMouseMove2D = (e: any) => {
    const x = e.clientX;
    const y = e.clientY;

    const canvasRef = document.getElementsByClassName(
      "paper-canvas"
    )[0] as HTMLElement;

    if (!this.markup2D) this.addPendingMarkup2D();

    const normilizedCoords = transformPointToNormalizedCoords(
      { x, y },
      canvasRef!
    );

    console.log(normilizedCoords);

    this.markupService.updateTempEnt2D("pending", normilizedCoords);
  };

  /**
   * handkes mouse down 2d
   */
  private handleMouseDown2D = (e: any) => {
    this.deactivate();

    const x = e.clientX;
    const y = e.clientY;

    const canvasRef = document.getElementsByClassName(
      "paper-canvas"
    )[0] as HTMLElement;

    const normilizedCoords = transformPointToNormalizedCoords(
      { x, y },
      canvasRef!
    );

    this.markupService.pendingCommentService.activate(normilizedCoords, "2D");
  };

  /**
   * Handles mouse down events to finalize the placement of a new markup based on the current pointer location.
   * @param {MouseEvent} event - The mouse event triggered by clicking the mouse button.
   */
  private handleMouseDown3D = (event: any) => {
    const ent3D = this.markupService.tempEnt3D$.value.find(
      ({ id }) => id === "pending"
    );
    const { position } = ent3D!;
    this.markupService.pendingCommentService.activate(position, "3D");

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

    console.log("AAAa");
    console.log(canvas);

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
    hotkeys("c, C", this.openTool);
  }

  private openTool = () => {
    this.markupService.activateTool("ADD_COMMENT");
  };

  /**
   * Removes hotkey listeners for interactive markup behavior.
   */
  private removeHotkeyListeners() {
    hotkeys.unbind("esc", this.deactivate);
    hotkeys.unbind("c, C", this.openTool);
  }

  public dispose() {
    this.removeEventListeners3D();
    this.removeEventListeners2D();
    this.removeHotkeyListeners();
  }
}

export default PendingMarkupService;
