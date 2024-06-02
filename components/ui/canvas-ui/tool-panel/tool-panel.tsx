import { Box, Divider, IconButton, Paper } from "@mui/material";
import CursorIcon from "../../icons/cursor-icon";
import CommentIcon from "../../icons/comment-icon";
import PencilIcon from "../../icons/pencil-icon";
import AiStickerIcon from "../../icons/ai-sticker-icon";
import AiUploadIcon from "../../icons/ai-upload-icon";

const ToolPanel = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box
      sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}
      data-type="tool-panel"
    >
      <Paper
        sx={{
          display: "flex",
          gap: "6px",
          alignItems: "center",
          minWidth: "max-content",
        }}
      >
        <IconButton>
          <CursorIcon />
        </IconButton>

        <Divider orientation="vertical" />

        <IconButton onDragStart={(e) => onDragStart(e, "thumbnail")} draggable>
          <AiUploadIcon />
        </IconButton>

        <IconButton onDragStart={(e) => onDragStart(e, "sticker")} draggable>
          <AiStickerIcon />
        </IconButton>

        <Divider orientation="vertical" />

        <IconButton>
          <CommentIcon />
        </IconButton>

        <IconButton>
          <PencilIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default ToolPanel;
