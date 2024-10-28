import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import styled from "styled-components";
import { Paper } from "@mui/material";
import PencilIcon from "../../icons/pencil-icon";
import PlusIcon from "../../icons/plus-icon";
import ThreadIcon from "../../icons/thread-icon";
import ImageIcon from "../../icons/image-icon";
import { useMarkup } from "@/components/services/markup-service/markup-provider";
import { Comment } from "@/components/services/project-services/comment-service/comment-service";
import { MentionsInput, Mention } from "react-mentions";
import { ProjectUser } from "@/components/services/project-services/project-service/project-service";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import handleImageUpload from "./blocks/utils/handle-image-upload";

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
  const { projectService } = useProject();
  const { markupService } = useMarkup();

  const [comment, setComment] = useState("");
  const [enabledPen, setEnabledPen] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const mentionRef = useRef<any>(null);

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

    await markupService.saveComment({ content: comment, images });
    setComment("");
    setImages([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const [projectUsers, setProjectUsers] = useState<ProjectUser[]>([]);

  useEffect(() => {
    const sub = projectService.projectUsers$.subscribe((users) =>
      setProjectUsers(users)
    );

    return () => sub.unsubscribe();
  }, [projectService]);

  const handleThreadClick = () => {
    setComment(comment + "@");
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
          <InputFieldWrapper>
            <MentionsInput
              ref={mentionRef}
              placeholder="Write a comment..."
              value={comment}
              onChange={(e: any) => setComment(e.target.value)}
              inputRef={inputRef}
              onKeyDown={(e: any) => handleKeyDown(e)}
              spellCheck={false}
            >
              <Mention
                trigger="@"
                data={projectUsers.map((user) => ({
                  id: user.id,
                  display: user.username,
                }))}
              />
            </MentionsInput>
          </InputFieldWrapper>

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

              <IconButton data-active={"false"} onClick={handleThreadClick}>
                <ThreadIcon />
              </IconButton>

              <label htmlFor="image-upload">
                <input
                  style={{ display: "none" }}
                  id="image-upload"
                  name="image-upload"
                  type="file"
                  onChange={(e) =>
                    handleImageUpload(e, setImages, projectService)
                  }
                />
                <IconButton data-active={"false"} component="span">
                  <ImageIcon />
                </IconButton>
              </label>
            </Box>
          )}

          {images.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                marginTop: "4px",
              }}
              data-type="attached-images"
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "50px",
                    height: "50px",
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                    border: "var(--mr-border)",
                  }}
                ></Box>
              ))}
            </Box>
          )}
        </Box>

        <IconButton
          color="primary"
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

export const InputFieldWrapper = styled.div`
  padding: 5px;
  font-family: inherit !important;
  line-height: 1.43;

  &[data-type="subcomment"] {
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    width: 100%;
  }

  & > div > div > div:first-child {
    padding: 0px;
    border: none !important;
    z-index: 2 !important;
    pointer-events: none !important;
  }

  &,
  & * {
    font-size: inherit !important;
    line-height: 1.4 !important;
  }

  & strong {
    background-color: white !important;
    color: blue !important;
  }

  & textarea {
    &,
    &:focus,
    &:focus-visible {
      padding: 0px;
      border: none;
      outline: none;
    }
  }
`;

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
