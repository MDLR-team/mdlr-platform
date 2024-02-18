import { createContext, useContext, useEffect, useState } from "react";
import ProjectService from "./project-service";
import { useRouter } from "next/router";
import { supabase } from "@/components/supabase-client";

interface ProjectContentProps {
  projectService: ProjectService;
  isReady: boolean;
}

const ProjectContext = createContext<ProjectContentProps | undefined>(
  undefined
);

export function ProjectProvider({ children }: any) {
  const router = useRouter();

  const [projectService] = useState(() => new ProjectService(supabase));

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    projectService.provideStates({
      router,
      setIsReady,
    });
  }, [router]);

  return (
    <ProjectContext.Provider value={{ projectService, isReady }}>
      {isReady && children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
