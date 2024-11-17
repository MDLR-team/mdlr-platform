import MessageItem from "@/components/comments/comment-layout/blocks/comment/comment";
import {
  CommentList,
  List,
} from "@/components/comments/comment-layout/comment-layout.styled";
import { Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMarkup } from "@/components/services/markup-service/markup-provider";
import { useEffect, useState } from "react";
import { Comment } from "@/components/services/project-services/comment-service/comment-service";
import SubcommentForm from "./blocks/subcomment-form";
import { useProject } from "@/components/services/project-services/project-service/project-provider";

const ActiveCommentDialog = () => {
  const { viewerType } = useProject();
  const { markupService } = useMarkup();
  const activeCommentService = markupService.activeCommentService;

  const [xy, setXY] = useState<{ x: number; y: number } | null>(null);
  const [activeComment, setActiveComment] = useState<Comment | null>(null);

  const [subComments, setSubComments] = useState<Comment[]>([]);

  useEffect(() => {
    const sub = activeCommentService.xy$.subscribe((xy) => setXY(xy));
    const sub2 = markupService.activeComment$.subscribe((comment) =>
      setActiveComment(comment)
    );
    const sub3 = markupService.subComments$.subscribe((comments) =>
      setSubComments(comments)
    );

    return () => {
      sub.unsubscribe();
      sub2.unsubscribe();
      sub3.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (viewerType === "es") {
      setXY({
        x: 500,
        y: 500,
      });
    }
  }, [viewerType]);

  if (!activeComment || !xy) return null;

  return (
    <Paper
      sx={{
        position: "absolute",
        left: `${xy.x + 27 + 10 || 0}px`,
        top: `${xy.y - 27 || 0}px`,
        minWidth: "250px",
        maxWidth: "250px",
        display: "flex",
        flexDirection: "column",
        pointerEvents: "all",
        gap: "0px",
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
          sx={{
            minWidth: "18px !important",
            minHeight: "18px !important",
            width: "18px !important",
            height: "18px !important",
            fontSize: "12px !important",
          }}
          size="small"
          onClick={() => markupService.closeComment()}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>

      {
        <CommentList>
          <List>
            <MessageItem {...activeComment} selectComment={() => {}} />

            {subComments.map((comment) => (
              <>
                <MessageItem
                  {...comment}
                  selectComment={() => {}}
                  key={comment.id}
                />
              </>
            ))}

            <SubcommentForm />
          </List>
        </CommentList>
      }
    </Paper>
  );
};

export default ActiveCommentDialog;
