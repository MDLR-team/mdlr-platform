import axios from "axios";
import React from "react";
import ViewerServiceAggr from "./viewer-service-aggr";

class Viewer extends React.Component {
  private _isViewerInitialized: boolean;

  private _viewer: any | null;
  private _viewerContainer: any;
  private _view: any;
  private _viewerService: ViewerServiceAggr | undefined;

  private _urns: string[];

  /**
   * Constructs the Viewer component.
   * @param props - The properties passed to the Viewer component.
   */
  constructor(props: any) {
    super(props);

    this._isViewerInitialized = false;

    this._urns = [];
  }

  /**
   * Component lifecycle method called after the component has mounted.
   * This is where we initialize the viewer.
   */
  public componentDidMount() {
    if (!this._isViewerInitialized) {
      this.initializeViewer();
    }
  }

  /**
   * Component lifecycle method called just before the component unmounts.
   * This is where we clean up the viewer to prevent memory leaks.
   */
  public componentWillUnmount() {
    if (this._viewer) {
      const Autodesk = (window as any).Autodesk;

      this._viewer.finish();
      this._viewer = null;
    }
  }

  /**
   * Initializes the Forge Viewer.
   * This includes setting up the environment, fetching the Forge token, and loading the viewer.
   */
  private initializeViewer = async (): Promise<void> => {
    this._isViewerInitialized = true;

    const Autodesk = (window as any).Autodesk;
    const forgeToken = await this._getForgeToken();
    if (!forgeToken) return;

    const options = {
      env: "AutodeskProduction2",
      api: "streamingV2",
    };

    Autodesk.Viewing.Initializer(
      {
        ...options,
        getAccessToken: (
          onTokenReady: (token: string, expires: number) => void
        ) => {
          onTokenReady(forgeToken.access_token, forgeToken.expires_in);
        },
      },
      async () => {
        const options3d = {
          viewerConfig: {
            disableBimWalkInfoIcon: true,
          },
        };

        const view = new Autodesk.Viewing.AggregatedView();
        const viewerDiv = this._viewerContainer;
        view.init(viewerDiv, options3d);

        this._viewer = view.viewer;
        this._view = view;

        // viewer service
        const viewerService = new ViewerServiceAggr(this._viewer, view, this);
        this._viewerService = viewerService;

        this.loadModels();
      }
    );
  };

  /**
   * Loads one or multiple models into the viewer based on the route.
   * If multiple models are to be loaded, it applies a theming color to all models after loading.
   */
  public async loadModels(): Promise<void> {
    const urns = this._urns;
    const viewerService = this._viewerService;

    await viewerService!.loadDocuments(urns);
  }

  /**
   * Fetches the Forge access token required to use the Forge Viewer.
   * @returns A promise that resolves to the ForgeTokenResponse or null if an error occurred.
   */
  private async _getForgeToken(): Promise<ForgeTokenResponse | null> {
    try {
      const response = await axios.get<ForgeTokenResponse>("/api/token");
      return response.data;
    } catch (error) {
      console.error("Error fetching Forge token:", error);
      return null;
    }
  }
}

interface ForgeTokenResponse {
  access_token: string;
  expires_in: number;
}

export default Viewer;
