import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";
import Topics from "@/components/ui/bar/blocks/topics/topics";
import { Box, Modal } from "@mui/material";
import styled from "styled-components";
import { CommentList, List } from "../../comment-layout.styled";
import MessageItem from "../comment/comment";
import { useMemo } from "react";
import { useComment } from "@/components/services/project-services/comment-service/comment-provider";
import { useMarkup } from "@/components/services/markup-service/markup-provider";

const TopicsWindow = () => {
  const { isAiTopicsOpen, setIsAiTopicsOpen } = useGlobalStates();

  const handleClose = () => setIsAiTopicsOpen(false);

  const { comments, search } = useComment();
  const { markupService } = useMarkup();

  const filteredComments = useMemo(() => {
    return comments.filter((comment) => !comment.parent_id);
  }, [comments, search]);

  return (
    <Modal
      open={isAiTopicsOpen}
      onClose={handleClose}
      aria-labelledby="share-modal-title"
      aria-describedby="share-modal-description"
    >
      <ModalBox>
        <Box
          sx={{
            width: "100%",
            overflowY: "scroll",
            height: "auto",
          }}
        >
          <Topics />
        </Box>

        <Box
          sx={{
            width: "100%",
            overflowY: "scroll",
            height: "auto",
            padding: "10px",
          }}
        >
          <CommentList>
            <List>
              {filteredComments
                .filter(markupService.checkFilters)
                .map((comment, i) => (
                  <MessageItem
                    {...comment}
                    selectComment={() => true}
                    key={comment.id}
                    hideActions={true}
                    showTopicTags={true}
                  />
                ))}
            </List>
          </CommentList>
        </Box>
      </ModalBox>
    </Modal>
  );
};

// Styled components
const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 800px;
  background-color: white;
  box-shadow: 24px;
  padding: 10px;
  border-radius: 8px;
  max-height: 80vh;

  display: flex;
`;

export default TopicsWindow;
