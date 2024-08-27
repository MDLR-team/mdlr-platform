import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useRouter } from "next/router"; // Assuming you are using Next.js
import ProjectService, { ProjectUser } from "./project-service";
import { supabase } from "@/components/supabase-client";
import AuthService from "../../app-services/auth/auth-service";
import { useAuth } from "../../app-services/auth/auth-provider";
import { useWorkspace } from "../../workspace-services/workspace/workspace-provider";

interface ProjectProviderProps {
  children: React.ReactNode;
}

interface ProjectProviderState {
  title: string;
  thumbnail: string | null;
  projectUsers: ProjectUser[];
  isReady: boolean;
  projectService: ProjectService;
}

const ProjectContext = createContext<ProjectProviderState | undefined>(
  undefined
);

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  children,
}) => {
  const { authService } = useAuth();
  const { workspaceService } = useWorkspace();

  const [title, setTitle] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [projectUsers, setProjectUsers] = useState<ProjectUser[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);

  const router = useRouter();
  const { urn } = router.query as { urn: string };

  const [projectService] = useState(
    () => new ProjectService(supabase, authService, workspaceService, urn)
  );

  const projectServiceRef = useRef<ProjectService | null>(null);

  useEffect(() => {
    projectServiceRef.current = projectService;

    const t = projectService.title$.subscribe(setTitle);
    const th = projectService.thumbnail$.subscribe(setThumbnail);
    const pu = projectService.projectUsers$.subscribe(setProjectUsers);
    const r = projectService.isReady$.subscribe(setIsReady);

    const wp = projectService.workspaceId$.subscribe(async (workspaceId) => {
      if (workspaceId) {
        await workspaceService.setActiveWorkspace(workspaceId);
      }
    });

    return () => {
      projectService.dispose();

      t.unsubscribe();
      th.unsubscribe();
      pu.unsubscribe();
      r.unsubscribe();
    };
  }, [router.isReady]);

  if (!projectServiceRef.current) return null;

  return (
    <ProjectContext.Provider
      value={{
        title,
        thumbnail,
        projectUsers,
        isReady,
        projectService: projectServiceRef.current,
      }}
    >
      {isReady && children}
    </ProjectContext.Provider>
  );
};

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}

export default ProjectProvider;
