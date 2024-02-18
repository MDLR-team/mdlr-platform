import { createContext, useContext, useEffect, useState } from "react";
import CommentService, { Comment } from "../comment-service/comment-service";
import { supabase } from "@/components/supabase-client";
import { useProject } from "@/components/project/project-provider";

interface CommentContentProps {
  comments: Comment[];
  commentService: CommentService;
}

const CommentContext = createContext<CommentContentProps | undefined>(
  undefined
);

export function CommentProvider({ children }: any) {
  const { projectService } = useProject();

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentService] = useState(() => new CommentService(supabase));

  useEffect(() => {
    commentService.provideStates({
      projectService,
      setComments,
    });

    commentService.init();

    return () => {
      commentService.dispose();
    };
  }, []);

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
