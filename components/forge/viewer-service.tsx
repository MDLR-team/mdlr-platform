import axios from "axios";

class ViewerService {
  private $setIsModelLoaded: React.Dispatch<React.SetStateAction<boolean>> =
    () => {};

  constructor(private _viewer: any) {}

  private async _getToken(): Promise<{
    access_token: string;
    expires_in: number;
  }> {
    const { data } = await axios.get("/api/token");
    const { access_token, expires_in } = data;

    return { access_token, expires_in };
  }

  public viewerEvent(event: any) {
    return new Promise((resolve, reject) => {
      const handler = (e: any) => {
        this._viewer.removeEventListener(event, handler);
        resolve(e);
      };

      this._viewer.addEventListener(event, handler);
    });
  }

  public async init() {
    const Autodesk = (window as any).Autodesk;

    console.log("Autodeks", Autodesk);

    const events = [
      this.viewerEvent(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT),
      this.viewerEvent(Autodesk.Viewing.GEOMETRY_LOADED_EVENT),
    ];

    Promise.all(events).then(() => {
      this.$setIsModelLoaded(true);
    });

    return new Promise((resolve, reject) => {
      const options = {
        env: "AutodeskProduction",
        api: "derivativeV2",
        getAccessToken: async (callback: any) => {
          const { access_token, expires_in } = await this._getToken();
          callback(access_token, expires_in);
        },
      };

      Autodesk.Viewing.Initializer(options, () => {
        resolve(null);
      });
    });
  }

  public async loadDocument(urn: string) {
    const Autodesk = (window as any).Autodesk;

    return new Promise((resolve, reject) => {
      Autodesk.Viewing.Document.load(`urn:${urn}`, (doc: any) => {
        const viewables = doc.getRoot().getDefaultGeometry();

        this._viewer.loadDocumentNode(doc, viewables).then((model: any) => {
          resolve(model);
        });
      });
    });
  }

  public provideStates(states: any) {
    this.$setIsModelLoaded = states.setIsModelLoaded;
  }
}

export default ViewerService;
