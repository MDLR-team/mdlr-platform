import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";
import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, Button, IconButton } from "@mui/material";
import styled from "styled-components";
import { Paper } from "@mui/material";
import { useMarkup3D } from "@/components/services/project-services/markup-3d-service/markup-3d-provider";
import { useMarkup2D } from "@/components/services/project-services/markup-2d-service/markup-2d-provider";
import { PointXY } from "@/components/services/project-services/active-comment-service/active-comment-service";
import Markup3DService from "@/components/services/project-services/markup-3d-service/markup-3d-service";
import Markup2DService from "@/components/services/project-services/markup-2d-service/markup-2d-service";
import { useActiveComment } from "@/components/services/project-services/active-comment-service/active-comment-provider";
import PencilIcon from "../../icons/pencil-icon";
import PlusIcon from "../../icons/plus-icon";
import ThreadIcon from "../../icons/thread-icon";
import ImageIcon from "../../icons/image-icon";
import { supabase } from "@/components/supabase-client";
import { useViewer } from "@/components/forge/viewer-provider";
import { useMarkup } from "@/components/services/markup-service/markup-provider";
import { Comment } from "@/components/services/project-services/comment-service/comment-service";

export const FloatingComment = () => {
  const { markupService } = useMarkup();

  const [pendingComment, setPendingComment] = useState<Partial<Comment> | null>(
    null
  );
  const [xy, setXY] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const sub1 = markupService.pendingComment$.subscribe((comment) =>
      setPendingComment(comment)
    );

    const sub2 = markupService.pendingCommentService.xy$.subscribe((xy) =>
      setXY(xy)
    );

    return () => {
      sub1.unsubscribe();
      sub2.unsubscribe();
    };
  });

  console.log(pendingComment, xy);

  if (!pendingComment || !xy) return <></>;

  return <CommentForm markupPosition={xy} />;
};

const CommentForm: React.FC<{
  markupPosition: { x: number; y: number };
}> = ({ markupPosition }) => {
  return (
    <Paper
      sx={{
        position: "absolute",
        minWidth: "250px",
        maxWidth: "250px",
        display: "flex",
        padding: "4px !important",
        left: `${markupPosition.x + 27 + 10}px`,
        top: `${markupPosition.y - 27}px`,
        flexDirection: "column",
        pointerEvents: "all",
      }}
    >
      <CommentMessage />
    </Paper>
  );
};

const CommentMessage: React.FC<{}> = () => {
  const [comment, setComment] = useState("");
  const [enabledPen, setEnabledPen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { markupService } = useMarkup();

  useEffect(() => {
    const sub = markupService.pendingCommentService.enabledPen$.subscribe(
      (enabledPen) => setEnabledPen(enabledPen)
    );

    return () => sub.unsubscribe();
  }, [markupService]);

  const handlePenClick = () => {
    if (enabledPen) {
      markupService.pendingCommentService.deactivatePenTool();
    } else {
      markupService.pendingCommentService.activatePenTool();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      inputRef.current?.focus();
    }, 100); // Adjust the delay as necessary

    return () => clearTimeout(timeoutId);
  }, []);

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();

    await markupService.saveComment(comment);
    setComment("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const saveView = async () => {
    /* if (!activeComment) return;

    const viewState = viewer.getState({ viewport: true });

    try {
      await supabase
        .from("comments")
        .update({ view_state: viewState })
        .eq("id", activeComment.id);
    } catch (error) {
      console.error("Error updating comment:", error);
    }

    activeCommentService.togglePaperMode(false); */
  };

  return (
    <Wrapper>
      <Box
        component="form"
        sx={{
          margin: `0px !important`,
          flexShrink: 0,
          display: "flex",
          alignItems: "flex-end",
          width: "100%",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <TextField
            placeholder="Write a comment..."
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

export const Wrapper = styled.div`
  &&&& {
    &,
    & * {
      font-size: 12px;
    }
  }

  z-index: 4;

  & form.MuiBox-root {
    padding: 0px;
    border-color: rgba(0, 0, 0, 0);

    & .MuiFormControl-root {
      margin-top: 0px;
      margin-bottom: 0px;

      & .MuiInputBase-root {
        &::before {
          display: none;
        }

        &::after {
          display: none;
        }
      }
    }
  }
`;

export default FloatingComment;
