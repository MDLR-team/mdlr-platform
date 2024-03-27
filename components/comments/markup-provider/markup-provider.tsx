import MarkupExtension, {
  Markup2DPosition,
} from "@/components/forge/markup-extension";
import { useViewer } from "@/components/forge/viewer-provider";
import { createContext, useContext, useEffect, useState } from "react";
import { useComment } from "../../services/project-services/comment-service/comment-provider";
import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";
import hotkeys from "hotkeys-js";
import { useActiveComment } from "@/components/services/project-services/active-comment-service/active-comment-provider";

interface MarkupProviderProps {
  markupsExtension: MarkupExtension | null;
  markupPosition: markupPosition | null;
  setMarkupPosition: any;
  markup2DPosition: Markup2DPosition | null;
}

const MarkupContext = createContext<MarkupProviderProps | undefined>(undefined);

export function MarkupProvider({ children }: any) {
  const { viewer, isModelLoaded } = useViewer();
  const { globalStatesService } = useGlobalStates();
  const { activeComment, activeCommentService } = useActiveComment();

  const [markupPosition, setMarkupPosition] = useState<markupPosition | null>(
    null
  );
  const [markup2DPosition, setMarkup2DPosition] =
    useState<Markup2DPosition | null>(null);

  const [markupsExtension, setMarkupsExtension] =
    useState<MarkupExtension | null>(null);

  useEffect(() => {
    if (!viewer) return;
    if (!isModelLoaded) return;

    const Autodesk = (window as any).Autodesk;

    class MarkupsExtension extends Autodesk.Viewing.Extension {
      constructor(viewer: any, options: any) {
        super(viewer, options);

        this.markupsExtension = null;
      }

      load() {
        this.markupsExtension = new MarkupExtension(
          this.viewer,
          globalStatesService,
          activeCommentService
        );
        this.markupsExtension.provideStates({
          setMarkupPosition,
          setMarkup2DPosition,
        });

        this.markupsExtension.enable(false);

        setMarkupsExtension(this.markupsExtension);

        return true;
      }

      unload() {
        if (this.markupsExtension) {
          this.markupsExtension.enable(false);
          this.markupsExtension.dispose();
          this.markupsExtension = null;

          setMarkupsExtension(null);
        }

        return true;
      }
    }

    const registeredExtensions: Map<string, any> =
      Autodesk.Viewing.theExtensionManager.registeredExtensions;

    if (!registeredExtensions.has("MarkupsExtension")) {
      // add the new extension to the viewer
      Autodesk.Viewing.theExtensionManager.registerExtension(
        "MarkupsExtension",
        MarkupsExtension
      );

      viewer.loadExtension("MarkupsExtension");
    }
  }, [viewer, isModelLoaded]);

  const { comments } = useComment();
  useEffect(() => {
    if (!markupsExtension) return;
    if (!comments) return;

    markupsExtension.updateComments(comments);
  }, [comments, markupsExtension]);

  useEffect(() => {
    if (!markupsExtension) return;
    if (!activeComment) return;

    markupsExtension.selectComment(activeComment.id, false);
  }, [activeComment, markupsExtension]);

  // Hotkey for toggling comment adding
  // Hotkey bindings
  useEffect(() => {
    const hotKeyString = "esc";
    const hotKeyCallback = (event: KeyboardEvent, handler: any) => {
      event.preventDefault();
      switch (handler.key) {
        case "esc":
          markupsExtension?.enable(false);
          activeCommentService.togglePaperMode(false);
          break;
        default:
          break;
      }
    };

    hotkeys(hotKeyString, hotKeyCallback);
    return () => hotkeys.unbind(hotKeyString, hotKeyCallback);
  }, [markupsExtension]);

  return (
    <MarkupContext.Provider
      value={{
        markupsExtension,
        markupPosition,
        setMarkupPosition,
        markup2DPosition,
      }}
    >
      {children}
    </MarkupContext.Provider>
  );
}

interface markupPosition {
  x: number;
  y: number;
  z: number;
}

export function useMarkup() {
  const context = useContext(MarkupContext);
  if (!context) {
    throw new Error("useMarkup must be used within a MarkupProvider");
  }
  return context;
}
