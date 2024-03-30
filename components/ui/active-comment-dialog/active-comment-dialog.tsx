import MessageItem from "@/components/comments/comment-layout/blocks/comment/comment";
import {
  CommentList,
  List,
} from "@/components/comments/comment-layout/comment-layout.styled";
import { useComment } from "@/components/services/project-services/comment-service/comment-provider";
import { Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useActiveComment } from "@/components/services/project-services/active-comment-service/active-comment-provider";
import ActiveCommentMessage from "../active-comment-message/active-comment-message";
import MiniComment from "@/components/comments/comment-layout/blocks/comment/mini-comment";

const ActiveCommentDialog = () => {
  const {
    activeCommentService,
    activeComment,
    activeCommentPosition,
    childComments,
    viewType,
  } = useActiveComment();

  if (!activeComment || !activeCommentPosition) return null;

  return (
    <Paper
      sx={{
        position: "absolute",
        left: `${activeCommentPosition?.x + 27 + 10 || 0}px`,
        top: `${activeCommentPosition?.y - 27 || 0}px`,
        minWidth: "250px",
        maxWidth: "250px",
        display: "flex",
        flexDirection: "column",
        pointerEvents: "all",
        ...(viewType === "exploded"
          ? {
              background: "transparent",
            }
          : {}),
      }}
    >
      {viewType === "assembled" && (
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
            onClick={() => activeCommentService.deselectComment()}
            sx={{ fontSize: "12px !important" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      )}

      <CommentList>
        <List>
          {childComments
            .filter((comment) => {
              return !comment.markup_position_2d;
            })
            .map((comment) => (
              <>
                {viewType === "assembled" ? (
                  <MessageItem
                    {...comment}
                    selectComment={() => {}}
                    key={comment.id}
                  />
                ) : (
                  <MiniComment {...comment} key={comment.id} />
                )}
              </>
            ))}
        </List>
      </CommentList>
    </Paper>
  );
};

export default ActiveCommentDialog;
