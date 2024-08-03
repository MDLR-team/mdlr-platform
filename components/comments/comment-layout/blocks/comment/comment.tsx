import Avatar from "@/components/layout/avatar/avatar";
import { useComment } from "@/components/services/project-services/comment-service/comment-provider";
import { Comment } from "@/components/services/project-services/comment-service/comment-service";
import ResolveIcon from "@/components/ui/icons/resolve-icon";
import { Box, IconButton } from "@mui/material";
import moment from "moment";
import { useMemo } from "react";
import stc from "string-to-color";
import styled from "styled-components";

interface MessageItemProps extends Comment {
  selectComment: (id: any) => void;
  hideActions?: boolean;
  showTopicTags?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({
  topic_tags,
  id,
  content,
  created_at,
  selectComment,
  view_state,
  annotation,
  author_username,
  resolved,
  hideActions,
  showTopicTags = false,
}) => {
  const { commentService } = useComment();

  // date to comment format when if it was recently we can show "just now" or "1 minute ago" or "x dayes ago" or "x months ago"
  const time = moment(created_at).fromNow();

  const handleResolveComment = (e: any) => {
    e.stopPropagation();
    commentService.handleResolveComment(id, true);
  };

  const allTags = useMemo(() => {
    if (!topic_tags) return [];

    return Object.values(topic_tags).reduce((acc, val) => {
      return [...acc, ...val];
    }, []) as any as [string, number][];
  }, [topic_tags]);

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
            <Avatar username={author_username} size="small" />

            <Box sx={{ display: "flex", gap: "2px", flexDirection: "column" }}>
              <Box sx={{ display: "flex", gap: "9px" }}>
                <Box sx={{ fontWeight: "500" }}>{author_username}</Box>
                {/*  <Box sx={{ color: "#999999" }}>{time}</Box> */}
              </Box>

              <Box
                sx={{ color: "#999999", fontSize: "9px", fontWeight: "500" }}
              >
                {time}
              </Box>
            </Box>
          </Box>

          <Box
            data-type={"action-panel"}
            sx={{ display: "flex", gap: "0px" }}
            data-hideactions={hideActions ? "true" : "false"}
          >
            <IconButton onClick={handleResolveComment}>
              <ResolveIcon />
            </IconButton>

            {/* <IconButton
              disabled={view_state ? false : true}
              onClick={
                () => {}
              }
            >
              <FitIcon />
            </IconButton> */}
          </Box>

          {/* annotation && (
            <IconButton>
              <PencilIcon />
            </IconButton>
          ) */}
        </Box>

        <Box sx={{ wordWrap: "break-word" }}>{content}</Box>
      </Box>

      {showTopicTags && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
          }}
        >
          {allTags.map(([tag, percentage], i) => (
            <Box
              key={i}
              sx={{
                //backgroundColor: "#f0f0f0",
                padding: "2px 4px",
                borderRadius: "5px",
                fontSize: "12px",
                color: "rgba(0, 0, 0, 1)",
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  minWidth: "6px",
                  width: "6px",
                  height: "6px",
                  minHeight: "6px",
                  borderRadius: "50%",
                  backgroundColor: stc(tag),
                }}
              />

              {`${tag} - ${percentage}%`}
            </Box>
          ))}
        </Box>
      )}
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

      & div[data-type="action-panel"] {
        display: flex;
      }
    }

    & div[data-hideactions="true"] {
      display: none;
    }
  }
`;

export default MessageItem;
