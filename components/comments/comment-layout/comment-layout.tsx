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

const CommentsBlock: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentService] = useState(() => new CommentService(supabase));

  useEffect(() => {
    commentService.provideStates({
      setComments,
    });

    commentService.init();

    return () => {
      commentService.dispose();
    };
  }, []);

  return (
    <Box
      sx={{
        width: 300,
        height: "100vh",
        overflow: "auto",
        borderRight: 1,
        borderColor: "divider",
        display: "flex",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Typography variant="h6" component="div" sx={{ p: 2 }}>
          Comments
        </Typography>

        <CommentList>
          <List style={{ minHeight: "max-content" }}>
            {comments.map((comment) => (
              <MessageItem {...comment} key={comment.id} />
            ))}
          </List>
        </CommentList>

        <CommentMessage />
      </div>
    </Box>
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
