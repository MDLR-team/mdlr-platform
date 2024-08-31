import { Box, IconButton, Paper } from "@mui/material";
import CursorIcon from "../../icons/cursor-icon";
import CommentIcon from "../../icons/comment-icon";
import MeasureIcon from "../../icons/measure-icon";

import ConfigsIcon from "../../icons/configs-icon";

const ToolPanel = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Paper sx={{ display: "flex", gap: "6px", minWidth: "max-content" }}>
        <IconButton data-active="true">
          <CursorIcon />
        </IconButton>

        <IconButton data-active={false ? "true" : "false"} onClick={() => {}}>
          <CommentIcon />
        </IconButton>

        <IconButton data-active={false ? "true" : "false"} onClick={() => {}}>
          <MeasureIcon />
        </IconButton>

        {true && (
          <IconButton data-active={false ? "true" : "false"} onClick={() => {}}>
            <ConfigsIcon />
          </IconButton>
        )}
      </Paper>
    </Box>
  );
};

export default ToolPanel;
