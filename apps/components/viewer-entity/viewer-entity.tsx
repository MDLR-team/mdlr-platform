import { useEffect, useState } from "react";
import { useProject } from "../services/project-services/project-service/project-provider";
import WhiteboardViewer from "../whiteboard-viewer/whiteboard-viewer";
import ViewerW from "./forge-viewer/viewer-w";
import { ViewerType } from "../services/project-services/project-service/project-service.types";

const ViewerEntity = () => {
  const { projectService } = useProject();

  const [viewerType, setViewerType] = useState<ViewerType>(null);

  useEffect(() => {
    const vt = projectService.viewerType$.subscribe(setViewerType);

    return () => {
      vt.unsubscribe();
    };
  }, [projectService]);

  switch (viewerType) {
    case "aps":
      return <ViewerW />;
    case "rf":
      return <WhiteboardViewer />;
  }
};

export default ViewerEntity;
