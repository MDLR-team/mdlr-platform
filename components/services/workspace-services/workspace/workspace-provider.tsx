import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/components/supabase-client";

import { useRouter } from "next/router";
import { Project, Workspace } from "@/components/types/supabase-data.types";
import WorkspaceService from "./workspace-service";
import { useAuth } from "../../app-services/auth/auth-provider";
import { UserMetadata } from "@supabase/supabase-js";
import { ProjectUser } from "../../project-services/project-service/project-service";

interface WorkspaceProps {
  workspaceService: WorkspaceService;
  projects: Project[];
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  workspaceUsers: ProjectUser[];
  isReady: boolean;
  settingsOpened: boolean;
  settingsTab: number;
  setSettingsOpened: (value: boolean) => void;
  setSettingsTab: (value: number) => void;
}

const WorkspaceContext = createContext<WorkspaceProps | undefined>(undefined);

export function WorkspaceProvider({ children }: any) {
  const router = useRouter();
  const { authService } = useAuth();

  const [workspaceService] = useState(
    () => new WorkspaceService(supabase, authService)
  );

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(
    null
  );
  const [workspaceUsers, setWorkspaceUsers] = useState<ProjectUser[]>([]);

  const [projects, setProjects] = useState<Project[]>([]);

  const [isReady, setIsReady] = useState<boolean>(false);

  const [settingsOpened, setSettingsOpened] = useState(false);
  const [settingsTab, setSettingsTab] = useState(0);

  useEffect(() => {
    if (!router?.isReady) return;

    const w = workspaceService.workspaces$.subscribe((workspaces) =>
      setWorkspaces(workspaces)
    );
    const a = workspaceService.activeWorkspace$.subscribe((workspace) =>
      setActiveWorkspace(workspace)
    );
    const p = workspaceService.workspaceUsers$.subscribe((users) =>
      setWorkspaceUsers(users)
    );

    const s = workspaceService.projects$.subscribe((projects) =>
      setProjects(projects)
    );

    const r = workspaceService.isReady$.subscribe((ready) => setIsReady(ready));

    workspaceService.provideStates();

    return () => {
      w.unsubscribe();
      a.unsubscribe();
      p.unsubscribe();
      s.unsubscribe();
      r.unsubscribe();
    };
  }, [router]);

  return (
    <WorkspaceContext.Provider
      value={{
        workspaceService,
        projects,
        workspaces,
        workspaceUsers,
        activeWorkspace,
        isReady,
        settingsOpened,
        settingsTab,
        setSettingsOpened,
        setSettingsTab,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
