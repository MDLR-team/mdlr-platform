import axios from "axios";
import { useRouter } from "next/router";
import { use, useEffect, useRef, useState } from "react";
import MarkupExtension from "./markup-extension";
import { useViewer } from "./viewer-provider";
import Viewer from "./viewer-aggr";

const ViewerW = () => {
  const { viewer, setViewer } = useViewer();
  const { isModelLoaded, setIsModelLoaded } = useViewer();
  const { setViewerService } = useViewer();

  console.log("viewer", viewer);

  const router = useRouter();
  const [urns, setUrns] = useState<string[] | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    // Assuming 'urn' query parameter can be a single value or an array
    const newUrns = [router.query.urn as string];
    setUrns(newUrns);
  }, [router.isReady]);

  return (
    <Viewer
      urns={urns}
      setViewer={setViewer}
      setIsModelLoaded={setIsModelLoaded}
      setViewerService={setViewerService}
    />
  );
};

export default ViewerW;
