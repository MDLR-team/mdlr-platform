import { Box, IconButton, Paper } from "@mui/material";
import CursorIcon from "../icons/cursor-icon";
import CommentIcon from "../icons/comment-icon";
import MeasureIcon from "../icons/measure-icon";

import { useMarkup } from "@/components/services/markup-service/markup-provider";
import { useEffect, useState } from "react";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import { useViewer } from "@/components/forge/viewer-provider";
import ConfigsIcon from "../icons/configs-icon";
import SelectionPanel from "./blocks/selection-panel";

const ToolPanel = () => {
  const { markupService } = useMarkup();
  const { viewer } = useViewer();

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

  const openStructurePanel = () => {
    const settingsTools = viewer.getToolbar().getControl("settingsTools");
    const modelStructureTool = settingsTools.getControl(
      "toolbar-modelStructureTool"
    );

    const Autodesk = (window as any).Autodesk;

    modelStructureTool.onClick();
  };

  return (
    <Box sx={{ position: "relative" }}>
      <SelectionPanel />

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

        {viewer && (
          <IconButton
            data-active={measureEnabled ? "true" : "false"}
            onClick={openStructurePanel}
          >
            <ConfigsIcon />
          </IconButton>
        )}
      </Paper>
    </Box>
  );
};

export default ToolPanel;
