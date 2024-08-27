import React, { useMemo } from "react";

import { useComment } from "../../services/project-services/comment-service/comment-provider";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import CommentsIcon from "@/components/ui/icons/comments-icon";
import MessageItem from "./blocks/comment/comment";
import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";
import { CommentList, Header, List } from "./comment-layout.styled";
import SearchBar from "./blocks/search-bar/search-bar";
import { useMarkup } from "@/components/services/markup-service/markup-provider";
import styled from "styled-components";
import TopicsWindow from "./blocks/topics-window/topics-window";
import PromptSearchBar from "@/components/prompt-search/blocks/search-bar/search-bar";

const CommentsBlock: React.FC = () => {
  const { comments, search, mlSearch, searchType, setSearchType } =
    useComment();
  const { markupService } = useMarkup();
  const { isCommentsPanelOpen, setIsAiTopicsOpen } = useGlobalStates();

  const filteredComments = useMemo(() => {
    if (searchType === "default") {
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
    } else {
      return comments
        .filter((comment) => !comment.parent_id)
        .filter((comment) => {
          if (!mlSearch) return true;

          return mlSearch.has(`${comment.id}`);
        });
    }
  }, [comments, search, searchType, mlSearch]);

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

            <Box
              sx={{
                fontSize: "14px",
              }}
            >
              Comments
            </Box>
          </Box>

          {/* <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setIsAiTopicsOpen(true)}
          >
            AI topics
          </Button> */}
        </Header>

        {/* <Header>
          <Tabs
            value={searchType === "default" ? 0 : 1}
            onChange={(_, value) =>
              setSearchType(value === 0 ? "default" : "ml")
            }
            aria-label="settings tabs"
            sx={{
              maxWidth: "max-content",
            }}
          >
            <Tab label="Default" />
            <Tab label="AI Search" />
          </Tabs>
        </Header> */}

        {searchType === "ml" && (
          <Header>
            <PromptSearchBar />
          </Header>
        )}

        {searchType === "default" && (
          <Header>
            <SearchBar />
          </Header>
        )}

        <CommentList>
          <List>
            {filteredComments
              .filter(markupService.checkFilters)
              .map((comment, i) => (
                <React.Fragment key={comment.id}>
                  <MessageItem
                    {...comment}
                    selectComment={() =>
                      markupService.selectComment(comment.id)
                    }
                    key={comment.id}
                    hideActions={true}
                  />

                  <Divider />
                </React.Fragment>
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
