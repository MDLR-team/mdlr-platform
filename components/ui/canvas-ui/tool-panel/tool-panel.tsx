import { Box, Button, Divider, IconButton, Paper } from "@mui/material";
import CursorIcon from "../../icons/cursor-icon";
import CommentIcon from "../../icons/comment-icon";
import PencilIcon from "../../icons/pencil-icon";
import AiStickerIcon from "../../icons/ai-sticker-icon";
import AiUploadIcon from "../../icons/ai-upload-icon";
import { useState } from "react";

const ToolPanel = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const [dismissed, setDismissed] = useState(false);
  const handleDismiss = () => {
    setDismissed(true);
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        data-type="tool-panel"
      >
        {!dismissed && (
          <Paper
            sx={{
              position: "absolute",
              display: "flex",
              top: "-60px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              gap: "12px",
              minWidth: "max-content",
              alignItems: "center",
            }}
          >
            <Box sx={{ color: "inherit" }}>
              Drag and drop widgets to the whiteboard
            </Box>

            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={handleDismiss}
            >
              Dismiss
            </Button>
          </Paper>
        )}

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

          {/* <IconButton onDragStart={(e) => onDragStart(e, "thumbnail")} draggable>
          <AiUploadIcon />
        </IconButton> */}

          <IconButton onDragStart={(e) => onDragStart(e, "viewer")} draggable>
            <AiUploadIcon />
          </IconButton>

          {
            <IconButton
              onDragStart={(e) => onDragStart(e, "sticker")}
              draggable
            >
              <AiStickerIcon />
            </IconButton>
          }

          {/* <Divider orientation="vertical" /> */}

          {/* <IconButton>
          <CommentIcon />
        </IconButton> */}

          {/* <IconButton>
          <PencilIcon />
        </IconButton> */}
        </Paper>
      </Box>
    </>
  );
};

export default ToolPanel;
