import { useViewer } from "@/components/viewer-entity/forge-viewer/viewer-provider";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const SelectionPanel = () => {
  const { viewer } = useViewer();
  const [isolatedCount, setIsolatedCount] = useState(0);

  useEffect(() => {
    if (viewer) {
      // Handler to update isolated elements count
      const onIsolationChanged = (e: any) => {
        if (e) {
          const { nodeIdArray } = e;

          setIsolatedCount(nodeIdArray.length);
        }
      };

      const Autodesk = (window as any).Autodesk;

      // Subscribe to the isolation event
      viewer.addEventListener(
        Autodesk.Viewing.ISOLATE_EVENT,
        onIsolationChanged
      );

      // Cleanup on unmount
      return () => {
        viewer.removeEventListener(
          Autodesk.Viewing.ISOLATE_EVENT,
          onIsolationChanged
        );
      };
    }
  }, [viewer]);

  const handleRemoveIsolation = () => {
    if (viewer) {
      // Clear isolation and return to home view
      viewer.clearThemingColors();
      viewer.showAll();
      viewer.fitToView();
      setIsolatedCount(0); // Reset the count after removing isolation
    }
  };

  if (isolatedCount === 0) return null;

  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, -110%)",
        minWidth: "max-content",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <>
        <Box>{isolatedCount} group(s) are currently isolated.</Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRemoveIsolation}
          size="small"
        >
          Remove Isolation
        </Button>
      </>
    </Box>
  );
};

export default SelectionPanel;
