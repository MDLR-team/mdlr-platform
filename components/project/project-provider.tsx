import { createContext, useState } from "react";
import ProjectService from "./project-service";
import { useRouter } from "next/router";

interface ProjectContentProps {
  projectService: ProjectService;
}

const ProjectContext = createContext<ProjectContentProps | undefined>(
  undefined
);

export function ProjectProvider({ children }: any) {
  const router = useRouter();

  const [projectService] = useState(() => new ProjectService());

  return (
    <ProjectContext.Provider value={{ projectService }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = ProjectContext;
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
