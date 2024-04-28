import { Box, Divider, IconButton, Paper } from "@mui/material";
import CursorIcon from "../../icons/cursor-icon";
import FileUploader from "./blocks/file-uploader/file-uploader";
import CommentIcon from "../../icons/comment-icon";
import PencilIcon from "../../icons/pencil-icon";
import AiStickerIcon from "../../icons/ai-sticker-icon";

const ToolPanel = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box sx={{ position: "relative" }}>
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

        <FileUploader />

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
