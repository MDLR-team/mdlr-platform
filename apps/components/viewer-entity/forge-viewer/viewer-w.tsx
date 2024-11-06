import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useViewer } from "./viewer-provider";
import Viewer from "./viewer-aggr";
import { useProject } from "../../services/project-services/project-service/project-provider";
import { useGlobalStates } from "../../services/project-services/global-states-service/global-states-provider";
import WhiteboardViewer from "../../whiteboard-viewer/whiteboard-viewer";

const ViewerW = () => {
  const { projectService } = useProject();
  const { setViewer, viewer, setIsModelLoaded, setViewerService } = useViewer();
  const { isNotePanelOpen } = useGlobalStates();

  const router = useRouter();
  const [urns, setUrns] = useState<string[] | null>(null);

  useEffect(() => {
    if (!router?.isReady) return;

    // Assuming 'urn' query parameter can be a single value or an array
    const newUrns = [router.query.urn as string];
    setUrns(newUrns);
  }, [router?.isReady]);

  useEffect(() => {
    const handleResize = () => {
      if (viewer) {
        viewer.resize();
      }
    };

    const callResizeMultipleTimes = () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(handleResize, i * 200); // Call handleResize 5 times within 1 second
      }
    };

    callResizeMultipleTimes(); // Immediate invocation on mount or state change
  }, [viewer, isNotePanelOpen]);

  return (
    <Viewer
      projectService={projectService}
      urns={urns}
      setViewer={setViewer}
      setIsModelLoaded={setIsModelLoaded}
      setViewerService={setViewerService}
    />
  );
};

export default ViewerW;
