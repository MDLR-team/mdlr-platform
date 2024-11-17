import PaperCanvas from "@/components/paper/paper";
import { useMarkup } from "@/components/services/markup-service/markup-provider";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ViewStateMode = () => {
  const { viewerType } = useProject();
  const { markupService } = useMarkup();

  const [enabled2D, setEnabled2D] = useState(false);
  const [enabledViewState, setEnabledViewState] = useState(false);

  useEffect(() => {
    const sub = markupService.enabled2D$.subscribe((enabled2D) =>
      setEnabled2D(enabled2D)
    );
    const sub2 =
      markupService.pendingCommentService.enabledViewState$.subscribe(
        (enabledViewState) => setEnabledViewState(enabledViewState)
      );

    return () => {
      sub.unsubscribe();
      sub2.unsubscribe();
    };
  }, [markupService]);

  if (viewerType === "es") return null;
  if (!enabled2D && !enabledViewState && viewerType === "aps") return null;

  return (
    <>
      {viewerType !== "rf" && (
        <FloatingWrapper
          data-mode={/* isPaperMode && isPaperEditing ? "edit" : */ "workspace"}
        >
          <Darkarea />
          <Darkarea />
          <Darkarea />
          <Darkarea />
          <Box sx={{ border: "2px solid black" }}></Box>
          <Darkarea />
          <Darkarea />
          <Darkarea />
          <Darkarea />
        </FloatingWrapper>
      )}

      {(enabled2D || enabledViewState || viewerType !== "aps") && (
        <FloatingWrapper data-type="draw">
          <PaperCanvas />
        </FloatingWrapper>
      )}
    </>
  );
};

const FloatingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;

  &&[data-mode="edit"] {
    pointer-events: none;
  }

  &&[data-mode="edit"],
  &&[data-mode="workspace"] {
    display: grid;

    grid-template-columns: 5px auto 5px;
    grid-template-rows: 58px auto 5px;
  }

  &&[data-mode="draw"] {
    display: flex;
  }
`;

const Darkarea = styled.div`
  background: rgba(0, 0, 0, 0.5);
`;

export default ViewStateMode;
