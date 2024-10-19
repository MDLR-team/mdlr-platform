import { Box, IconButton, Paper } from "@mui/material";
import CursorIcon from "../../icons/cursor-icon";
import CommentIcon from "../../icons/comment-icon";
import MeasureIcon from "../../icons/measure-icon";

import ConfigsIcon from "../../icons/configs-icon";
import AiUploadIcon from "../../icons/ai-upload-icon";
import AiStickerIcon from "../../icons/ai-sticker-icon";
import PencilIcon from "../../icons/pencil-icon";
import TextIcon from "../../icons/text-icon";

const ToolPanel: React.FC<{
  isWhiteboard?: boolean;
}> = ({ isWhiteboard }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Paper sx={{ display: "flex", gap: "6px", minWidth: "max-content" }}>
        <IconButton data-active="true">
          <CursorIcon />
        </IconButton>

        {isWhiteboard && (
          <>
            <IconButton>
              <AiUploadIcon />
            </IconButton>

            <IconButton>
              <AiStickerIcon />
            </IconButton>

            <IconButton>
              <TextIcon />
            </IconButton>

            <IconButton>
              <PencilIcon />
            </IconButton>
          </>
        )}

        <IconButton data-active={false ? "true" : "false"} onClick={() => {}}>
          <CommentIcon />
        </IconButton>

        {!isWhiteboard && (
          <IconButton data-active={false ? "true" : "false"} onClick={() => {}}>
            <MeasureIcon />
          </IconButton>
        )}

        {true && !isWhiteboard && (
          <IconButton data-active={false ? "true" : "false"} onClick={() => {}}>
            <ConfigsIcon />
          </IconButton>
        )}
      </Paper>
    </Box>
  );
};

export default ToolPanel;
