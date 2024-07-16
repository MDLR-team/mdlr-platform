import { Box, IconButton, Paper } from "@mui/material";
import CursorIcon from "../icons/cursor-icon";
import CommentIcon from "../icons/comment-icon";
import PencilIcon from "../icons/pencil-icon";
import MeasureIcon from "../icons/measure-icon";
import SecondaryToolPanel from "./blocks/secondary-tool-panel/secondary-tool-panel";
import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import { useActiveComment } from "@/components/services/project-services/active-comment-service/active-comment-provider";
import { useMarkup3D } from "@/components/services/project-services/markup-3d-service/markup-3d-provider";
import { useMarkup2D } from "@/components/services/project-services/markup-2d-service/markup-2d-provider";
import { useMarkup } from "@/components/services/markup-service/markup-provider";
import { useEffect, useState } from "react";

const ToolPanel = () => {
  /* const { commentAdding, globalStatesService } = useGlobalStates();
  const { markup3DService, measureEnabled } = useMarkup3D();
  const { markup2DService } = useMarkup2D();

  const { isPaperMode, isPaperEditing, viewType, activeCommentService } =
    useActiveComment(); */
  const { markupService } = useMarkup();

  const [commentAdding, setCommentAdding] = useState(false);

  useEffect(() => {
    const sub = markupService.enabledAdding$.subscribe((enabledAdding) =>
      setCommentAdding(enabledAdding)
    );

    return () => sub.unsubscribe();
  }, [markupService]);

  return (
    <Box sx={{ position: "relative" }}>
      {/* <SecondaryToolPanel /> */}

      <Paper sx={{ display: "flex", gap: "6px", minWidth: "max-content" }}>
        {
          <>
            <IconButton data-active="true">
              <CursorIcon />
            </IconButton>

            <IconButton
              data-active={commentAdding ? "true" : "false"}
              onClick={() => {
                markupService.activateTool("ADD_COMMENT");
                //markupService.toggleAddComment();
              }}
            >
              <CommentIcon />
            </IconButton>

            <IconButton
              data-active={/* measureEnabled ? "true" : */ "false"}
              onClick={() => {
                //markup3DService.toggleMeasure(true);
              }}
            >
              <MeasureIcon />
            </IconButton>
          </>
        }

        {/* isPaperMode && !isPaperEditing && (
          <>
            <IconButton data-active="true">
              <CursorIcon />
            </IconButton>

            <IconButton
              data-active={commentAdding ? "true" : "false"}
              onClick={() => {
                markup2DService.toggleAddComment();
              }}
            >
              <CommentIcon />
            </IconButton>
          </>
        ) */}
      </Paper>
    </Box>
  );
};

export default ToolPanel;
