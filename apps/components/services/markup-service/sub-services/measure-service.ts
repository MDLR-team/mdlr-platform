import { BehaviorSubject } from "rxjs";
import ProjectService from "../../project-services/project-service/project-service";
import MarkupService from "../markup-service";
import hotkeys from "hotkeys-js";

class MeasureService {
  public enabled$ = new BehaviorSubject<boolean>(false);

  constructor(
    private projectService: ProjectService,
    private markupService: MarkupService
  ) {}

  public activate = () => {
    this.markupService.activatedService = this;

    this.enabled$.next(true);

    const viewer = this.projectService.viewerServiceAggr.viewer$.value;
    if (!viewer) return;

    viewer.toolController.activateTool("measure");
    this.addHotkeyListeners();
  };

  public deactivate = () => {
    const viewer = this.projectService.viewerServiceAggr.viewer$.value;
    if (!viewer) return;

    const measureTool = viewer.toolController.getTool("measure");

    measureTool.deleteMeasurements();
    measureTool.deactivate();

    viewer.toolController.deactivateTool("measure");

    this.enabled$.next(false);
    if (this.markupService.activatedService instanceof MeasureService) {
      this.markupService.activatedService = null;
    }

    this.removeHotkeyListeners();
  };

  /**
   * Adds hotkey listeners for interactive markup behavior.
   */
  private addHotkeyListeners() {
    hotkeys("esc", this.deactivate);
  }

  /**
   * Removes hotkey listeners for interactive markup behavior.
   */
  private removeHotkeyListeners() {
    hotkeys.unbind("esc", this.deactivate);
  }

  public dispose() {
    this.enabled$.complete();
  }
}

export default MeasureService;
