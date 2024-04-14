import { createContext, useContext, useEffect, useState } from "react";
import ProjectService, { ProjectUser } from "./project-service";
import { useRouter } from "next/router";
import { supabase } from "@/components/supabase-client";
import { useAuth } from "../../app-services/auth/auth-provider";

interface ProjectContentProps {
  projectService: ProjectService;
  isReady: boolean;
  title: string;
  thumbnail: string | null;
  projectUsers: ProjectUser[];
}

const ProjectContext = createContext<ProjectContentProps | undefined>(
  undefined
);

export function ProjectProvider({ children, authService }: any) {
  const router = useRouter();

  const [projectService] = useState(
    () => new ProjectService(supabase, authService)
  );

  const [title, setTitle] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const [projectUsers, setProjectUsers] = useState<ProjectUser[]>([]);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    projectService.provideStates({
      router,
      setIsReady,
      setTitle,
      setThumbnail,
      setProjectUsers,
    });

    return () => {
      projectService.dispose();
    };
  }, [router]);

  return (
    <ProjectContext.Provider
      value={{ projectService, isReady, title, thumbnail, projectUsers }}
    >
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
