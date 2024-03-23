import { useViewer } from "@/components/forge/viewer-provider";
import { useActiveComment } from "@/components/services/project-services/active-comment-service/active-comment-provider";
import { Comment } from "@/components/services/project-services/comment-service/comment-service";
import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";
import FitIcon from "@/components/ui/icons/fir-icon";
import PencilIcon from "@/components/ui/icons/pencil-icon";
import { Box, IconButton } from "@mui/material";
import moment from "moment";
import styled from "styled-components";

interface MessageItemProps extends Comment {
  selectComment: (id: any) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  content,
  created_at,
  selectComment,
  view_state,
  annotation,
  id,
}) => {
  const { viewer } = useViewer();
  const { globalStatesService } = useGlobalStates();
  const { activeCommentService } = useActiveComment();

  // date to comment format when if it was recently we can show "just now" or "1 minute ago" or "x dayes ago" or "x months ago"
  const time = moment(created_at).fromNow();

  return (
    <Wrapper>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: "9px" }}
        onClick={selectComment}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "9px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", columnGap: "9px" }}>
            <Avatar />

            <Box sx={{ display: "flex", gap: "2px", flexDirection: "column" }}>
              <Box sx={{ display: "flex", gap: "9px" }}>
                <Box sx={{ fontWeight: "500" }}>name</Box>
                <Box sx={{ color: "#999999" }}>{time}</Box>
              </Box>

              <Box
                sx={{ color: "#999999", fontSize: "9px", fontWeight: "500" }}
              >
                Comment #{id}
              </Box>
            </Box>
          </Box>

          {view_state && (
            <IconButton
              onClick={() => activeCommentService.togglePaperMode(true)}
              sx={{ border: "1px solid #f9e05e" }}
            >
              <FitIcon />
            </IconButton>
          )}

          {annotation && (
            <IconButton>
              <PencilIcon />
            </IconButton>
          )}
        </Box>

        <Box sx={{ wordWrap: "break-word" }}>{content}</Box>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    cursor: pointer;
    padding: 6px 6px;
    border-radius: 8px;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

const Avatar = styled.div`
  min-width: 24px;
  min-height: 24px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: black;
`;

export default MessageItem;
