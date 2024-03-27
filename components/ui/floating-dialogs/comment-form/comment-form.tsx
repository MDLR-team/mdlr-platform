import CommentMessage from "@/components/comments/comment-layout/blocks/comment-message/comment-message";
import { useMarkup } from "@/components/comments/markup-provider/markup-provider";
import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";
import { Paper } from "@mui/material";

const CommentForm = () => {
  const { commentAdding, commentPointSelected } = useGlobalStates();
  const { markup2DPosition } = useMarkup();

  console.log("markup2DPosition", markup2DPosition);

  if (!(commentAdding && commentPointSelected)) return <></>;

  if (!markup2DPosition) return <></>;

  return (
    <Paper
      sx={{
        position: "absolute",
        minWidth: "250px",
        maxWidth: "250px",
        display: "flex",
        padding: "4px !important",
        left: `${markup2DPosition.x}px`,
        top: `${markup2DPosition.y}px`,
        flexDirection: "column",
        pointerEvents: "all",
      }}
    >
      <CommentMessage />
    </Paper>
  );
};

export default CommentForm;
