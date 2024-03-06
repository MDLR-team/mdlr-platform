import { Comment } from "@/components/comments/comment-service/comment-service";
import { Box } from "@mui/material";
import moment from "moment";
import styled from "styled-components";

const MessageItem: React.FC<Comment> = ({ content, created_at, id }) => {
  // date to comment format when if it was recently we can show "just now" or "1 minute ago" or "x dayes ago" or "x months ago"
  const time = moment(created_at).fromNow();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "9px" }}>
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
  );
};

const Avatar = styled.div`
  min-width: 24px;
  min-height: 24px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: black;
`;

export default MessageItem;
