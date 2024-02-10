import axios from "axios";
import { useRouter } from "next/router";
import { use, useEffect, useRef, useState } from "react";
import MarkupExtension from "./markup-extension";

const ViewerW = () => {
  const [viewer, setViewer] = useState<any>();

  const router = useRouter();

  const viewerDiv = useRef<HTMLDivElement>(null);
  const viewerInit = useRef<any>();

  const [initialized, setInitialized] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  useEffect(() => {
    if (!router.isReady || initialized) return;

    initializeViewer(router.query.urn as string);
    setInitialized(true);

    return () => {
      if (viewerInit.current) {
        viewerInit.current.finish();
        viewerInit.current = null;
      }
    };
  });

  const initializeViewer = async (urn: string) => {
    if (viewerInit.current) {
      return;
    }

    if (viewerDiv.current && viewerDiv.current.children.length > 0) {
      viewerInit.current.innerHTML = "";
    }

    const Autodesk = (window as any).Autodesk;
    const forgeToken = await axios.get("/api/token");

    const { access_token, expires_in } = forgeToken.data;

    if (!access_token) return;

    const options = {
      env: "AutodeskProduction",
      api: "derivativeV2",
      getAccessToken: (callback: any) => {
        callback(access_token, expires_in);
      },
    };

    class MarkupsExtension extends Autodesk.Viewing.Extension {
      constructor(viewer: any, options: any) {
        super(viewer, options);

        this.markupsExtension = null;
      }

      load() {
        console.log("MarkupsExtension loaded");
        this.markupsExtension = new MarkupExtension(this.viewer);
        this.markupsExtension.enable(true);

        return true;
      }

      unload() {
        if (this.markupsExtension) {
          this.markupsExtension.enable(false);
          this.markupsExtension.dispose();
          this.markupsExtension = null;
        }

        return true;
      }
    }

    Autodesk.Viewing.Initializer(options, () => {
      const config3d = {
        extensions: ["Autodesk.Viewing.MarkupsCore"],
      };

      const viewer = new Autodesk.Viewing.GuiViewer3D(
        viewerDiv.current,
        config3d
      );
      viewer.start();

      viewerInit.current = viewer;

      setViewer(viewer);

      loadModel(viewer, urn, {
        onSuccess: () => {
          setIsModelLoaded(true);

          const extension = viewer.getExtension("Autodesk.Viewing.MarkupsCore");

          console.log(extension);
        },
      });

      // add the new extension to the viewer
      Autodesk.Viewing.theExtensionManager.registerExtension(
        "MarkupsExtension",
        MarkupsExtension
      );

      viewer.loadExtension("MarkupsExtension");
    });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <div
        ref={viewerDiv}
        style={{
          backgroundColor: "lightgray",
          width: "100%",
          height: "100%",
        }}
        className="forge-viewer"
      ></div>
    </div>
  );
};

interface loadModelOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

function loadModel(viewer: any, urn: string, options: loadModelOptions) {
  return new Promise(function (resolve, reject) {
    function onDocumentLoadSuccess(doc: any) {
      const viewables = doc.getRoot().getDefaultGeometry();
      viewer.loadDocumentNode(doc, viewables).then((model: any) => {
        resolve(model);

        if (options.onSuccess) {
          options.onSuccess();
        }
      });

      resolve(viewer.loadDocumentNode(doc, viewables));
    }

    function onDocumentLoadFailure(code: any, message: any, errors: any) {
      reject({ code, message, errors });

      if (options.onError) {
        options.onError();
      }
    }

    const Autodesk = (window as any).Autodesk;

    viewer.setLightPreset(0);
    Autodesk.Viewing.Document.load(
      "urn:" + urn,
      onDocumentLoadSuccess,
      onDocumentLoadFailure
    );
  });
}

export default ViewerW;
