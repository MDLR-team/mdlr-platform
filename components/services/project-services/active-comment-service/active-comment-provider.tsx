import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/components/supabase-client";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import ActiveCommentService from "./active-comment-service";
import { useGlobalStates } from "../global-states-service/global-states-provider";
import { useComment } from "../comment-service/comment-provider";

interface ActiveCommentContentProps {}

const ActiveCommentContext = createContext<
  ActiveCommentContentProps | undefined
>(undefined);

export function ActiveCommentProvider({ children }: any) {
  const { globalStatesService, selectedCommentId } = useGlobalStates();
  const { commentService } = useComment();

  const [activeCommentService] = useState(
    () =>
      new ActiveCommentService(supabase, globalStatesService, commentService)
  );

  useEffect(() => {
    activeCommentService.init();

    return () => {
      activeCommentService.dispose();
    };
  }, []);

  return (
    <ActiveCommentContext.Provider value={{}}>
      {children}
    </ActiveCommentContext.Provider>
  );
}

export function useActiveComment() {
  const context = useContext(ActiveCommentContext);
  if (!context) {
    throw new Error("useComment must be used within a CommentProvider");
  }
  return context;
}
