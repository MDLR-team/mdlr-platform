import { Box, Divider, IconButton, Paper } from "@mui/material";
import CursorIcon from "../../icons/cursor-icon";
import FileUploader from "./blocks/file-uploader/file-uploader";
import CommentIcon from "../../icons/comment-icon";
import PencilIcon from "../../icons/pencil-icon";
import AiStickerIcon from "../../icons/ai-sticker-icon";

const ToolPanel = () => {
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

        <IconButton>
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
