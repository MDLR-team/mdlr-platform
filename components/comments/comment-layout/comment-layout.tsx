import React from "react";
import CommentMessage from "./blocks/comment-message/comment-message";
import { Comment } from "../comment-service/comment-service";
import styled from "styled-components";

import moment from "moment";
import { useComment } from "../comment-provider/comment-provider";
import { Box, Divider, IconButton, Paper } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { useMarkup } from "../markup-provider/markup-provider";
import PlusIcon from "@/components/ui/icons/plus-icon";
import CommentIcon from "@/components/ui/icons/comment-icon";
import CommentsIcon from "@/components/ui/icons/comments-icon";
import MessageItem from "./blocks/comment/comment";

const CommentsBlock: React.FC = () => {
  const { comments, commentService } = useComment();
  const { markupsExtension } = useMarkup();

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
            <MessageItem {...comment} key={comment.id} />
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
  gap: 18px;
  min-height: max-content;
`;

export default CommentsBlock;
