import MarkupExtension from "@/components/forge/markup-extension";
import { useViewer } from "@/components/forge/viewer-provider";
import { createContext, useContext, useEffect, useState } from "react";
import { useComment } from "../comment-provider/comment-provider";

interface MarkupProviderProps {
  markupsExtension: MarkupExtension | null;
  markupPosition: markupPosition | null;
}

const MarkupContext = createContext<MarkupProviderProps | undefined>(undefined);

export function MarkupProvider({ children }: any) {
  const { viewer, isModelLoaded } = useViewer();

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
        this.markupsExtension = new MarkupExtension(this.viewer);
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

  return (
    <MarkupContext.Provider
      value={{
        markupsExtension,
        markupPosition,
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
