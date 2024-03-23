import { createContext, useContext, useEffect, useState } from "react";
import CommentService, { Comment } from "./comment-service";
import { supabase } from "@/components/supabase-client";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import { useGlobalStates } from "../global-states-service/global-states-provider";

interface CommentContentProps {
  comments: Comment[];
  commentService: CommentService;
}

const CommentContext = createContext<CommentContentProps | undefined>(
  undefined
);

export function CommentProvider({ children }: any) {
  const { globalStatesService, selectedCommentId } = useGlobalStates();
  const { projectService } = useProject();

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentService] = useState(() => new CommentService(supabase));

  useEffect(() => {
    globalStatesService.provideCommentService(commentService);

    commentService.provideStates({
      projectService,
      setComments,
    });

    commentService.init();

    return () => {
      commentService.dispose();
    };
  }, []);

  useEffect(() => {
    const handleCommentsUpdated = (comments: Map<string, Comment>) => {
      const selectedCommentId = globalStatesService.selectedCommentId;

      console.log("selectedCommentIsssd", selectedCommentId);

      if (selectedCommentId) {
        const comment = comments.get(selectedCommentId as string);

        globalStatesService.setSelectedComment(comment as Comment);
      }
    };

    commentService.on("COMMENTS_UPDATED", handleCommentsUpdated);

    if (selectedCommentId) {
      const comments = commentService.comments;
      const comment = comments.get(selectedCommentId);

      globalStatesService.setSelectedComment(comment as Comment);
    }

    return () => {
      commentService.off("COMMENTS_UPDATED", handleCommentsUpdated);
    };
  }, [comments, selectedCommentId]);

  return (
    <CommentContext.Provider
      value={{
        comments,
        commentService,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export function useComment() {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComment must be used within a CommentProvider");
  }
  return context;
}
