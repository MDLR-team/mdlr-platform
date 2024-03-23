import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useViewer } from "./viewer-provider";
import Viewer from "./viewer-aggr";

const ViewerW = () => {
  const { setViewer, setIsModelLoaded, setViewerService } = useViewer();

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
