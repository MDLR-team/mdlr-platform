import { Comment } from "@/components/services/project-services/comment-service/comment-service";
import { Box } from "@mui/material";
import moment from "moment";
import styled from "styled-components";

interface MessageItemProps extends Comment {
  navigateToComment: (markup_position: any) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  content,
  created_at,
  markup_position,
  navigateToComment,
  id,
}) => {
  // date to comment format when if it was recently we can show "just now" or "1 minute ago" or "x dayes ago" or "x months ago"
  const time = moment(created_at).fromNow();

  return (
    <Wrapper>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: "9px" }}
        onClick={() => markup_position && navigateToComment(markup_position)}
      >
        <Box sx={{ display: "flex", columnGap: "9px" }}>
          <Avatar />

          <Box sx={{ display: "flex", gap: "2px", flexDirection: "column" }}>
            <Box sx={{ display: "flex", gap: "9px" }}>
              <Box sx={{ fontWeight: "500" }}>name</Box>
              <Box sx={{ color: "#999999" }}>{time}</Box>
            </Box>

            <Box sx={{ color: "#999999", fontSize: "9px", fontWeight: "500" }}>
              Element #10
            </Box>
          </Box>
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
    padding: 4.5px 0px;
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
