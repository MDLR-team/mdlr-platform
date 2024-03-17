import { createContext, useContext, useEffect, useState } from "react";
import GlobalStatesService from "./global-states-service";
import { useRouter } from "next/router";

interface GlobalStatesProps {
  globalStatesService: GlobalStatesService;
  isSettingsPanelOpen: boolean;
  isCommentsPanelOpen: boolean;
}

const GlobalStatesContext = createContext<GlobalStatesProps | undefined>(
  undefined
);

export function GlobalStatesProvider({ children }: any) {
  const router = useRouter();

  const [globalStatesService] = useState(() => new GlobalStatesService());

  const [isSettingsPanelOpen, setIsSettingsPanelOpen] =
    useState<boolean>(false);
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) return;

    globalStatesService.provideStates({
      setIsSettingsPanelOpen,
      setIsCommentsPanelOpen,
    });
  }, [router]);

  return (
    <GlobalStatesContext.Provider
      value={{ globalStatesService, isSettingsPanelOpen, isCommentsPanelOpen }}
    >
      {children}
    </GlobalStatesContext.Provider>
  );
}

export function useGlobalStates() {
  const context = useContext(GlobalStatesContext);
  if (!context) {
    throw new Error(
      "useGlobalStates must be used within a GlobalStatesProvider"
    );
  }
  return context;
}
