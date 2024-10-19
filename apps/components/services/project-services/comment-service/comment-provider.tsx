import { createContext, useContext, useEffect, useState } from "react";
import CommentService, { Comment } from "./comment-service";
import { supabase } from "@/components/supabase-client";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import { useGlobalStates } from "../global-states-service/global-states-provider";
import { v4 as uuidv4 } from "uuid";

interface CommentContentProps {
  comments: Comment[];
  commentService: CommentService;
  commentLogId: string;
  search: string;
  setSearch: (search: string) => void;
  mlSearch: Set<string> | null;
  setMlSearch: (mlSearch: Set<string> | null) => void;
  searchType: "default" | "ml";
  setSearchType: (searchType: "default" | "ml") => void;
}

const CommentContext = createContext<CommentContentProps | undefined>(
  undefined
);

export function CommentProvider({ children }: any) {
  const { projectService } = useProject();

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentLogId, setCommentLogId] = useState<string>(uuidv4());
  const [commentService] = useState(() => projectService.commentService);

  const [search, setSearch] = useState<string>("");
  const [mlSearch, setMlSearch] = useState<Set<string> | null>(null);

  const [searchType, setSearchType] = useState<"default" | "ml">("ml");

  useEffect(() => {
    commentService.provideStates({
      setComments,
      setCommentLogId,
    });

    return () => {
      commentService.dispose();
    };
  }, []);

  return (
    <CommentContext.Provider
      value={{
        comments,
        commentService,
        commentLogId,
        search,
        setSearch,
        mlSearch,
        setMlSearch,
        searchType,
        setSearchType,
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
