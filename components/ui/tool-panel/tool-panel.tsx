import { Box, IconButton, Paper } from "@mui/material";
import CursorIcon from "../icons/cursor-icon";
import CommentIcon from "../icons/comment-icon";
import PencilIcon from "../icons/pencil-icon";
import MeasureIcon from "../icons/measure-icon";
import SecondaryToolPanel from "./blocks/secondary-tool-panel/secondary-tool-panel";
import { useMarkup } from "@/components/comments/markup-provider/markup-provider";
import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import { useActiveComment } from "@/components/services/project-services/active-comment-service/active-comment-provider";

const ToolPanel = () => {
  const { commentAdding, globalStatesService } = useGlobalStates();
  const { markupPosition, markupsExtension } = useMarkup();

  const { isPaperMode, viewType, activeCommentService } = useActiveComment();

  return (
    <Box sx={{ position: "relative" }}>
      <SecondaryToolPanel />

      <Paper sx={{ display: "flex", gap: "6px", minWidth: "max-content" }}>
        <IconButton data-active="true">
          <CursorIcon />
        </IconButton>

        <IconButton
          data-active={commentAdding ? "true" : "false"}
          onClick={() => {
            globalStatesService.toggleCommentsPanel(true);

            markupsExtension?.enable(true);
          }}
        >
          <CommentIcon />
        </IconButton>

        <IconButton>
          <PencilIcon />
        </IconButton>

        <IconButton>
          <MeasureIcon />
        </IconButton>

        {isPaperMode && (
          <>
            <IconButton
              data-active={viewType === "assembled" ? "true" : "false"}
              onClick={() => activeCommentService.toggleViewType("assembled")}
            >
              <FormatListBulletedIcon sx={{ fontSize: 16 }} />
            </IconButton>

            <IconButton
              data-active={viewType === "exploded" ? "true" : "false"}
              onClick={() => activeCommentService.toggleViewType("exploded")}
            >
              <AutoAwesomeMotionOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ToolPanel;
