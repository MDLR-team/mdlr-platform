import ProjectService from "../project-service/project-service";

class TopicsService {
  constructor(private _projectService: ProjectService) {}

  public dispose() {}
}

export default TopicsService;
