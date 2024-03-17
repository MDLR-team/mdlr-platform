import MessageItem from "@/components/comments/comment-layout/blocks/comment/comment";
import {
  CommentList,
  List,
} from "@/components/comments/comment-layout/comment-layout.styled";
import { useComment } from "@/components/services/project-services/comment-service/comment-provider";
import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";
import { Paper, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ActiveCommentDialog = () => {
  const { globalStatesService, selectedCommentId, selectedCommentPosition } =
    useGlobalStates();

  const { comments } = useComment();

  if (!selectedCommentPosition) return null;

  return (
    <Paper
      sx={{
        position: "absolute",
        left: `${selectedCommentPosition.x}px`,
        top: `${selectedCommentPosition.y}px`,
        minWidth: "250px",
        maxWidth: "250px",
        display: "flex",
        flexDirection: "column",
        pointerEvents: "all",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2px",
        }}
      >
        <div />
        <IconButton
          onClick={() => globalStatesService.deselectComment()}
          sx={{ fontSize: "12px !important" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>

      <CommentList>
        <List>
          {comments
            .filter((comment) => comment.id === selectedCommentId)
            .map((comment) => (
              <MessageItem
                {...comment}
                selectComment={() => {}}
                key={comment.id}
              />
            ))}
        </List>
      </CommentList>
    </Paper>
  );
};

export default ActiveCommentDialog;
