import { Box, IconButton, TextField } from "@mui/material";
import { Wrapper } from "../../floating-dialogs/comment-form/comment-form";
import PlusIcon from "../../icons/plus-icon";
import PencilIcon from "../../icons/pencil-icon";
import ThreadIcon from "../../icons/thread-icon";
import ImageIcon from "../../icons/image-icon";
import { useRef, useState } from "react";
import { useMarkup } from "@/components/services/markup-service/markup-provider";

const SubcommentForm = () => {
  const [comment, setComment] = useState("");
  const [enabledPen, setEnabledPen] = useState(false);

  const { markupService } = useMarkup();

  const inputRef = useRef<HTMLInputElement>(null);

  const handlePenClick = () => {
    markupService.activateTool("ADD_COMMENT");
  };

  const handleSubmit = () => {
    // handle submit
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // handle key down
  };

  return (
    <Wrapper>
      <Box
        component="form"
        sx={{
          margin: `0px !important`,
          flexShrink: 0,
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <TextField
            placeholder="Write a comment..."
            sx={{ backgroundColor: "rgba(0,0,0,0.08)", borderRadius: "8px" }}
            multiline
            fullWidth
            autoFocus
            minRows={1}
            maxRows={12}
            size="small"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="standard"
            required
            margin="normal"
            inputRef={inputRef}
          />

          {comment && (
            <Box
              sx={{
                display: "flex",
                gap: "3px",
                marginTop: "4px",
              }}
              data-type="comment-actions"
            >
              <IconButton
                data-active={enabledPen ? "true" : "false"}
                onClick={handlePenClick}
              >
                <PencilIcon />
              </IconButton>

              <IconButton data-active={"false"}>
                <ThreadIcon />
              </IconButton>

              <IconButton data-active={"false"}>
                <ImageIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        <IconButton
          sx={{ backgroundColor: "#FAE57E" }}
          type="submit"
          data-type="exception"
          data-add="comment"
        >
          <PlusIcon />
        </IconButton>
      </Box>
    </Wrapper>
  );
};

export default SubcommentForm;
