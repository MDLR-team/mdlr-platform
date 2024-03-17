import MarkupExtension from "@/components/forge/markup-extension";
import { useViewer } from "@/components/forge/viewer-provider";
import { createContext, useContext, useEffect, useState } from "react";
import { useComment } from "../../services/project-services/comment-service/comment-provider";
import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";

interface MarkupProviderProps {
  markupsExtension: MarkupExtension | null;
  markupPosition: markupPosition | null;
  setMarkupPosition: any;
}

const MarkupContext = createContext<MarkupProviderProps | undefined>(undefined);

export function MarkupProvider({ children }: any) {
  const { viewer, isModelLoaded } = useViewer();
  const { globalStatesService } = useGlobalStates();
  const { selectedCommentId } = useGlobalStates();

  const [markupPosition, setMarkupPosition] = useState<markupPosition | null>(
    null
  );

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
        console.log("MarkupsExtension loaded");
        this.markupsExtension = new MarkupExtension(
          this.viewer,
          undefined,
          globalStatesService
        );
        this.markupsExtension.provideStates({
          setMarkupPosition,
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

    console.log("Autodesk.Viewing", Autodesk.Viewing);
    console.log("registeredExtensions", registeredExtensions);

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
    if (!selectedCommentId) return;

    markupsExtension.selectComment(selectedCommentId);
  }, [selectedCommentId, markupsExtension]);

  return (
    <MarkupContext.Provider
      value={{
        markupsExtension,
        markupPosition,
        setMarkupPosition,
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
