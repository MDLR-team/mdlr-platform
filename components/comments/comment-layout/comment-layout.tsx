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

const CommentsBlock: React.FC = () => {
  const { comments, commentService } = useComment();
  const { markupsExtension } = useMarkup();
  const { isCommentsPanelOpen } = useGlobalStates();

  const { viewer } = useViewer();

  const navigateToComment = (markup_position: any) => {
    if (markup_position) {
      const position = markup_position;

      const camera = viewer.getCamera();
      const navapi = viewer.navigation;

      navapi.setTarget(position);
    }
  };

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
              navigateToComment={navigateToComment}
              key={comment.id}
            />
          ))}
        </List>
      </CommentList>
    </Paper>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .MuiIconButton-root[data-add="comment"] {
    background-color: #fae57e;
    border-radius: 50% !important;

    &:hover {
      background-color: #f9e05e;
    }
  }
`;

const CommentList = styled.div`
  justify-content: flex-end;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;

  overflow-y: scroll;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  min-height: max-content;
`;

export default CommentsBlock;
