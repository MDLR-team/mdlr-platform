import { Box, IconButton, Paper } from "@mui/material";
import CursorIcon from "../icons/cursor-icon";
import CommentIcon from "../icons/comment-icon";
import MeasureIcon from "../icons/measure-icon";

import { useMarkup } from "@/components/services/markup-service/markup-provider";
import { useEffect, useState } from "react";

const ToolPanel = () => {
  const { markupService } = useMarkup();

  const [commentAdding, setCommentAdding] = useState(false);
  const [measureEnabled, setMeasureEnabled] = useState(false);

  useEffect(() => {
    const sub = markupService.enabledAdding$.subscribe((enabledAdding) =>
      setCommentAdding(enabledAdding)
    );

    const sub2 = markupService.measureService.enabled$.subscribe((enabled) =>
      setMeasureEnabled(enabled)
    );

    return () => {
      sub.unsubscribe();
      sub2.unsubscribe();
    };
  }, [markupService]);

  return (
    <Box sx={{ position: "relative" }}>
      {/* <SecondaryToolPanel /> */}

      <Paper sx={{ display: "flex", gap: "6px", minWidth: "max-content" }}>
        <IconButton data-active="true">
          <CursorIcon />
        </IconButton>

        <IconButton
          data-active={commentAdding ? "true" : "false"}
          onClick={() => {
            markupService.activateTool("ADD_COMMENT");
          }}
        >
          <CommentIcon />
        </IconButton>

        <IconButton
          data-active={measureEnabled ? "true" : "false"}
          onClick={() => {
            markupService.activateTool("MEASURE");
          }}
        >
          <MeasureIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default ToolPanel;
