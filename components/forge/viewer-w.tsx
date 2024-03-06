import axios from "axios";
import { useRouter } from "next/router";
import { use, useEffect, useRef, useState } from "react";
import MarkupExtension from "./markup-extension";
import { useViewer } from "./viewer-provider";

const ViewerW = () => {
  const { viewer, setViewer } = useViewer();
  const { isModelLoaded, setIsModelLoaded } = useViewer();

  console.log("viewer", viewer);

  const router = useRouter();

  const viewerDiv = useRef<HTMLDivElement>(null);
  const viewerInit = useRef<any>();

  const [initialized, setInitialized] = useState(false);

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
        },
      });
    });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
        }}
        xmlns="http://www.w3.org/2000/svg"
        id="comments_layer"
      ></svg>

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

          viewer.setLightPreset(1);
          // set background color
          viewer.setBackgroundColor(241, 240, 238, 241, 240, 238);

          // hide the toolbar
          viewer.toolbar.setVisible(false);
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

    Autodesk.Viewing.Document.load(
      "urn:" + urn,
      onDocumentLoadSuccess,
      onDocumentLoadFailure
    );
  });
}

export default ViewerW;
