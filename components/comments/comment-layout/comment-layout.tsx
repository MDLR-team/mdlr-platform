import React from "react";
import CommentMessage from "./blocks/comment-message/comment-message";
import styled from "styled-components";

import { useComment } from "../../services/project-services/comment-service/comment-provider";
import { Box, IconButton, Paper } from "@mui/material";
import { useMarkup } from "../markup-provider/markup-provider";
import PlusIcon from "@/components/ui/icons/plus-icon";
import CommentsIcon from "@/components/ui/icons/comments-icon";
import MessageItem from "./blocks/comment/comment";
import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";
import { useViewer } from "@/components/forge/viewer-provider";
import { CommentList, Header, List } from "./comment-layout.styled";

const CommentsBlock: React.FC = () => {
  const { globalStatesService } = useGlobalStates();
  const { comments, commentService } = useComment();
  const { markupsExtension } = useMarkup();
  const { isCommentsPanelOpen } = useGlobalStates();

  const { viewer } = useViewer();

  if (!isCommentsPanelOpen) return null;

  return (
    <Paper sx={{ flexDirection: "column" }}>
      {/* Header */}
      <Header>
        <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <IconButton>
            <CommentsIcon />
          </IconButton>

          <div>Comments</div>
        </Box>

        <Box>
          <IconButton
            data-type="exception"
            data-add="comment"
            onClick={() => markupsExtension?.enable(true)}
          >
            <PlusIcon />
          </IconButton>
        </Box>
      </Header>

      <CommentMessage />

      <CommentList>
        <List>
          {comments.map((comment) => (
            <MessageItem
              {...comment}
              selectComment={() => {
                if (!comment.markup_position) return;

                globalStatesService.selectComment(comment.id);
              }}
              key={comment.id}
            />
          ))}
        </List>
      </CommentList>
    </Paper>
  );
};

export default CommentsBlock;
