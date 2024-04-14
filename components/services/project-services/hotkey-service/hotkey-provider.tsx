import { createContext, useContext, useEffect } from "react";
import HotkeyService from "./hotkey-service";
import { useProject } from "../project-service/project-provider";
import { useActiveComment } from "../active-comment-service/active-comment-provider";

interface HotkeyContentProps {
  hotkeyService: HotkeyService;
}

const HotkeyContext = createContext<HotkeyContentProps | undefined>(undefined);

export function HotkeyProvider({ children }: any) {
  const { projectService } = useProject();
  const { isPaperEditing, isPaperMode } = useActiveComment();

  const hotkeyService = projectService.hotkeyService;

  return (
    <HotkeyContext.Provider
      value={{
        hotkeyService,
      }}
    >
      {children}
    </HotkeyContext.Provider>
  );
}

export function useHotkey() {
  const context = useContext(HotkeyContext);
  if (!context) {
    throw new Error("useHotkey must be used within a HotkeyProvider");
  }
  return context;
}
