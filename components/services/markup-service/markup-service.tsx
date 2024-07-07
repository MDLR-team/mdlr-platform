import ProjectService from "../project-services/project-service/project-service";

class MarkupService {
  // Everything related to the viewer
  private _viewer: any;
  private _canvas: HTMLCanvasElement | null = null;

  constructor(private _projectService: ProjectService) {}

  public dispose() {}
}

export default MarkupService;
