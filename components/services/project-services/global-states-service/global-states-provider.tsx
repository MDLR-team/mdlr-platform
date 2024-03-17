import { createContext, useContext, useEffect, useState } from "react";
import GlobalStatesService, {
  SelectedCommentPositionXY,
} from "./global-states-service";
import { useRouter } from "next/router";

interface GlobalStatesProps {
  globalStatesService: GlobalStatesService;
  isSettingsPanelOpen: boolean;
  isCommentsPanelOpen: boolean;
  selectedCommentId: string | null;
  selectedCommentPosition: SelectedCommentPositionXY | null;
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

  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );
  const [selectedCommentPosition, setSelectedCommentPosition] =
    useState<SelectedCommentPositionXY | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    globalStatesService.provideStates({
      setIsSettingsPanelOpen,
      setIsCommentsPanelOpen,
      setSelectedCommentId,
      setSelectedCommentPosition,
    });
  }, [router]);

  return (
    <GlobalStatesContext.Provider
      value={{
        globalStatesService,
        isSettingsPanelOpen,
        isCommentsPanelOpen,
        selectedCommentId,
        selectedCommentPosition,
      }}
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
