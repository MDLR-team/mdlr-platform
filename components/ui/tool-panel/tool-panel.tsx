import { Box, IconButton, Paper } from "@mui/material";
import CursorIcon from "../icons/cursor-icon";
import CommentIcon from "../icons/comment-icon";
import PencilIcon from "../icons/pencil-icon";
import MeasureIcon from "../icons/measure-icon";

const ToolPanel = () => {
  return (
    <Paper sx={{ display: "flex", gap: "6px", minWidth: "max-content" }}>
      <IconButton data-active="true">
        <CursorIcon />
      </IconButton>

      <IconButton>
        <CommentIcon />
      </IconButton>

      <IconButton>
        <PencilIcon />
      </IconButton>

      <IconButton>
        <MeasureIcon />
      </IconButton>
    </Paper>
  );
};

export default ToolPanel;
