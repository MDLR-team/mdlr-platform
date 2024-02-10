import { useEffect, useState } from "react";
import ViewerY from "./viewer-y";
import ViewerService from "./viewer-service";
import { useRouter } from "next/router";

const ViewerX = () => {
  const [viewer, setViewer] = useState<any>();

  const { query } = useRouter();
  const { urn } = query;

  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const onViewerCreated = async (viewer: any) => {
    const viewerService = new ViewerService(viewer);

    viewerService.provideStates({
      setIsModelLoaded,
    });

    await viewerService.init();

    setViewer(viewer);
    setViewerService(viewerService);
  };

  const [viewerService, setViewerService] = useState<any>();

  useEffect(() => {
    if (!urn) return;

    console.log("urn", urn);

    const load = async () => {
      if (viewerService) {
        await viewerService.loadDocument(urn as string);
      }
    };

    load();
  }, [urn]);

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <ViewerY onViewerCreated={onViewerCreated} />
    </div>
  );
};

export default ViewerX;
