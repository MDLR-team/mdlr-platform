import React, { useEffect, useState, Fragment } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CommentMessage from "./comment-message/comment-message";
import { supabase } from "@/components/supabase-client";
import CommentService, { Comment } from "../comment-service/comment-service";
import styled from "styled-components";

import moment from "moment";
import { useComment } from "../comment-provider/comment-provider";
import { Icon, IconButton } from "@mui/material";
import { AddOutlined, PlusOneOutlined } from "@mui/icons-material";
import { useMarkup } from "../markup-provider/markup-provider";

const CommentsBlock: React.FC = () => {
  const { comments, commentService } = useComment();
  const { markupsExtension } = useMarkup();

  return (
    <Wrapper>
      <Box
        sx={{
          width: "auto",
          position: "relative",
          overflow: "auto",
          borderRight: 1,
          borderColor: "divider",
          display: "flex",
          backgroundColor: "white",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div>
            <Typography variant="h6" component="div" sx={{ p: 2 }}>
              Comments
            </Typography>

            {/* MuiIcon button */}
            <IconButton
              style={{ position: "absolute", right: "10px", top: "10px" }}
              onClick={() => markupsExtension?.enable(true)}
            >
              <AddOutlined />
            </IconButton>
          </div>

          <CommentMessage />

          <CommentList>
            <List style={{ minHeight: "max-content" }}>
              {comments.map((comment) => (
                <MessageItem {...comment} key={comment.id} />
              ))}
            </List>
          </CommentList>
        </div>
      </Box>
    </Wrapper>
  );
};

const MessageItem: React.FC<Comment> = ({ content, created_at, id }) => {
  // date to comment format when if it was recently we can show "just now" or "1 minute ago" or "x dayes ago" or "x months ago"
  const time = moment(created_at).fromNow();

  return (
    <MessageWrapper>
      <ListItem alignItems="flex-start">
        <ListItemText primary={content} secondary={time} />
      </ListItem>
    </MessageWrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  min-width: 300px;

  position: fixed;
  z-index: 100;

  padding: 10px;
  height: 100vh;

  && > div {
    height: calc(100% - 20px);
    width: calc(100% - 20px);
    border-radius: 0px;

    border: 1px solid #e0e0e0;
  }
`;

const MessageWrapper = styled.div`
  && {
    &,
    & * {
      font-size: 12px;
    }
  }
`;

const CommentList = styled.div`
  justify-content: flex-end;
  overflow-y: auto;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;

  overflow-y: scroll;
`;

export default CommentsBlock;
