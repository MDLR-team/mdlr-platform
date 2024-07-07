import { createContext, useContext, useState } from "react";
import { useProject } from "../project-services/project-service/project-provider";
import MarkupService from "./markup-service";

interface Markup3DContentProps {
  markupService: MarkupService;
}

const MarkupContext = createContext<Markup3DContentProps | undefined>(
  undefined
);

export function MarkupProvider({ children }: any) {
  const { projectService } = useProject();

  const [markupService] = useState(() => projectService.markupService);

  return (
    <MarkupContext.Provider
      value={{
        markupService,
      }}
    ></MarkupContext.Provider>
  );
}

export function useMarkup() {
  const context = useContext(MarkupContext);
  if (!context) {
    throw new Error("useMarkup must be used within a MarkupProvider");
  }
  return context;
}
