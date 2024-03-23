import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import GlobalStatesService, {
  SelectedCommentPositionXY,
} from "./global-states-service";
import { useRouter } from "next/router";
import { Comment } from "../comment-service/comment-service";

// Interface definitions for global states
interface GlobalStatesProps {
  globalStatesService: GlobalStatesService;
  isSettingsPanelOpen: boolean;
  isCommentsPanelOpen: boolean;
  selectedCommentId: string | null;
  selectedCommentPosition: SelectedCommentPositionXY | null;
  selectedComment: Comment | null;
  isPaperOpen: boolean;
  commentAdding: boolean;
  commentAwaitingSelection: boolean;
  commentPointSelected: boolean;
  commentAdjustingView: boolean;
  isViewStateEditing: boolean;
}

// Context creation
const GlobalStatesContext = createContext<GlobalStatesProps | undefined>(
  undefined
);

// Interface for component props
interface ProviderProps {
  children: ReactNode;
}

// Context provider component
export const GlobalStatesProvider: React.FC<ProviderProps> = ({ children }) => {
  // Router for handling routing-related logic
  const router = useRouter();

  // State definitions
  // Service instance
  const [globalStatesService] = useState(new GlobalStatesService());

  // UI Panel States
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);

  // Comment-related States
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );
  const [selectedCommentPosition, setSelectedCommentPosition] =
    useState<SelectedCommentPositionXY | null>(null);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  // Paper.js canvas open state
  const [isPaperOpen, setPaperOpen] = useState(false);
  const [isViewStateEditing, setIsViewStateEditing] = useState(false);

  // States related to the comment adding process
  const [commentAdding, setCommentAdding] = useState(false);
  const [commentAwaitingSelection, setCommentAwaitingSelection] =
    useState(false);
  const [commentPointSelected, setCommentPointSelected] = useState(false);
  const [commentAdjustingView, setCommentAdjustingView] = useState(false);

  // Effect hook for initializing and updating global states
  useEffect(() => {
    // Only proceed once the router is ready
    if (!router.isReady) return;

    // Provide component states to the global state service
    globalStatesService.provideStates({
      setIsSettingsPanelOpen,
      setIsCommentsPanelOpen,
      setSelectedCommentId,
      setSelectedCommentPosition,
      setSelectedComment,
      setPaperOpen,
      setCommentAdding,
      setCommentAwaitingSelection,
      setCommentPointSelected,
      setCommentAdjustingView,
      setIsViewStateEditing,
    });
  }, [router.isReady]); // Depend on router readiness

  // Context provider value
  const value = {
    globalStatesService,
    isSettingsPanelOpen,
    isCommentsPanelOpen,
    selectedCommentId,
    selectedCommentPosition,
    selectedComment,
    isPaperOpen,
    commentAdding,
    commentAwaitingSelection,
    commentPointSelected,
    commentAdjustingView,
    isViewStateEditing,
  };

  // Render provider with context
  return (
    <GlobalStatesContext.Provider value={value}>
      {children}
    </GlobalStatesContext.Provider>
  );
};

// Custom hook for consuming context
export const useGlobalStates = (): GlobalStatesProps => {
  const context = useContext(GlobalStatesContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalStates must be used within a GlobalStatesProvider"
    );
  }
  return context;
};
