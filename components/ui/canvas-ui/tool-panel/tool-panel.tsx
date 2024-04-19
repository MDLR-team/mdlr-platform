import { Box, IconButton, Paper } from "@mui/material";
import CursorIcon from "../../icons/cursor-icon";

const ToolPanel = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Paper sx={{ display: "flex", gap: "6px", minWidth: "max-content" }}>
        <IconButton data-active="true">
          <CursorIcon />
        </IconButton>

        <IconButton data-active="true">
          <CursorIcon />
        </IconButton>

        <IconButton data-active="true">
          <CursorIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default ToolPanel;
