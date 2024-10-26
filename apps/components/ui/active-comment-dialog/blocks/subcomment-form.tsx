import { Box, IconButton, TextField } from "@mui/material";
import {
  InputFieldWrapper,
  Wrapper,
} from "../../floating-dialogs/comment-form/comment-form";
import PlusIcon from "../../icons/plus-icon";
import PencilIcon from "../../icons/pencil-icon";
import ThreadIcon from "../../icons/thread-icon";
import ImageIcon from "../../icons/image-icon";
import { useEffect, useRef, useState } from "react";
import { useMarkup } from "@/components/services/markup-service/markup-provider";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import { ProjectUser } from "@/components/services/project-services/project-service/project-service";
import { Mention, MentionsInput } from "react-mentions";
import handleImageUpload from "../../floating-dialogs/comment-form/blocks/utils/handle-image-upload";

const SubcommentForm = () => {
  const { projectService } = useProject();
  const { markupService } = useMarkup();

  const [comment, setComment] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const mentionRef = useRef<any>(null);

  const handlePenClick = () => {
    markupService.activateTool("ADD_COMMENT");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    markupService.pendingCommentService.activateSubComment();
    await new Promise((resolve) => setTimeout(resolve, 500)); // Add a 3-second delay
    await markupService.pendingCommentService.saveComment({
      content: comment,
      images,
    });

    setComment("");
    setImages([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
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
          <InputFieldWrapper data-type="subcomment">
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
              <IconButton data-active={"false"} onClick={handlePenClick}>
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

export default SubcommentForm;
