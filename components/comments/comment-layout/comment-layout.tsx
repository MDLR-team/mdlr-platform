import React, { useMemo } from "react";

import { useComment } from "../../services/project-services/comment-service/comment-provider";
import { Box, Button, IconButton, Paper } from "@mui/material";
import CommentsIcon from "@/components/ui/icons/comments-icon";
import MessageItem from "./blocks/comment/comment";
import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";
import { CommentList, Header, List } from "./comment-layout.styled";
import SearchBar from "./blocks/search-bar/search-bar";
import { useMarkup } from "@/components/services/markup-service/markup-provider";
import styled from "styled-components";
import TopicsWindow from "./blocks/topics-window/topics-window";

const CommentsBlock: React.FC = () => {
  const { comments, search } = useComment();
  const { markupService } = useMarkup();
  const { isCommentsPanelOpen, setIsAiTopicsOpen } = useGlobalStates();

  const filteredComments = useMemo(() => {
    return comments
      .filter((comment) => !comment.parent_id)
      .filter((comment) => {
        if (!search) return true;

        // search by content or author name
        return (
          comment.content.toLowerCase().includes(search.toLowerCase()) ||
          comment.author_username.toLowerCase().includes(search.toLowerCase())
        );
      });
  }, [comments, search]);

  if (!isCommentsPanelOpen) return null;

  return (
    <>
      <Paper sx={{ flexDirection: "column" }}>
        {/* Header */}
        <Header>
          <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <IconButton>
              <CommentsIcon />
            </IconButton>

            <div>Comments</div>
          </Box>

          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => setIsAiTopicsOpen(true)}
          >
            AI topics
          </Button>
        </Header>

        <Header>
          <SearchBar />
        </Header>

        <CommentList>
          <List>
            {filteredComments
              .filter(markupService.checkFilters)
              .map((comment, i) => (
                <MessageItem
                  {...comment}
                  selectComment={() => markupService.selectComment(comment.id)}
                  key={comment.id}
                  hideActions={true}
                />
              ))}
          </List>
        </CommentList>
      </Paper>

      <TopicsWindow />
    </>
  );
};

const AIButton = styled(Button)`
  background: conic-gradient(
    from -160deg at 50% 50%,
    #e92a67 0deg,
    #a853ba 120deg,
    #2a8af6 240deg,
    #e92a67 360deg
  ) !important;
  box-shadow: 6px 2px 15px rgba(42, 138, 246, 0.3),
    -6px 2px 15px rgba(233, 42, 103, 0.3);

  &&::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    bottom: 0;
    background: white;
    opacity: 0.3;
    border-radius: 4px;
  }
`;

export default CommentsBlock;
