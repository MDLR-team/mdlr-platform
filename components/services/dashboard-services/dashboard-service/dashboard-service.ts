import AuthService from "../../app-services/auth/auth-service";
import WorkspaceService from "../../workspace-services/workspace/workspace-service";

class DashboardService {
  constructor(
    private authService: AuthService,
    private workspaceService: WorkspaceService,
    private _id: string
  ) {}

  public dispose() {}
}

export default DashboardService;
