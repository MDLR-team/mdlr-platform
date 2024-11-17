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
import { useAuth } from "../../app-services/auth/auth-provider";
import { useWorkspace } from "../../workspace-services/workspace/workspace-provider";
import { ViewerType } from "./project-service.types";

interface ProjectProviderProps {
  children: React.ReactNode;
}

interface ProjectProviderState {
  title: string;
  thumbnail: string | null;
  projectUsers: ProjectUser[];
  isReady: boolean;
  projectService: ProjectService;
  metadata: any;
  viewerType: ViewerType | null;
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
  const [metadata, setMetadata] = useState<any>(null);
  const [viewerType, setViewerType] = useState<ViewerType | null>(null);

  const router = useRouter();
  const { project_id } = router.query as {
    project_id: string;
  };

  const [projectService] = useState(
    () =>
      new ProjectService(supabase, authService, workspaceService, project_id)
  );

  const projectServiceRef = useRef<ProjectService | null>(null);

  useEffect(() => {
    projectServiceRef.current = projectService;

    const t = projectService.title$.subscribe(setTitle);
    const th = projectService.thumbnail$.subscribe(setThumbnail);
    const pu = projectService.projectUsers$.subscribe(setProjectUsers);
    const r = projectService.isReady$.subscribe(setIsReady);
    const m = projectService.metadata$.subscribe(setMetadata);
    const vt = projectService.viewerType$.subscribe(setViewerType);

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
      m.unsubscribe();
      wp.unsubscribe();
      vt.unsubscribe();
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
        metadata,
        viewerType,
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
