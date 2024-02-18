import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import base64url from "base64url";

interface ViewerContentProps {
  viewer: any;
  setViewer: (value: any) => void;
  isModelLoaded: boolean;
  setIsModelLoaded: (value: boolean) => void;
}

const ViewerContext = createContext<ViewerContentProps | null>(null);

export function ViewerProvider({ children }: any) {
  const [viewer, setViewer] = useState<any>(null);
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false);

  const { query } = useRouter();
  const { urn } = query;

  useEffect(() => {
    if (urn) {
      try {
        // Decode base64 URN
        const decoded = base64url.decode(urn as string);
        console.log("decoded", decoded);

        const parts = decoded.split(":");
        const lastPart = parts[parts.length - 1];

        // Extract the substring after 'vf.' and before '?'
        const startIndex = lastPart.indexOf("vf.") + 3; // Add 3 to skip 'vf.'
        const endIndex = lastPart.indexOf("?");
        const projectId = lastPart.substring(startIndex, endIndex);

        console.log("Project ID:", projectId);
      } catch (err) {
        console.error("Error decoding URN", err);
      }
    }
  }, [urn]);

  return (
    <ViewerContext.Provider
      value={{
        viewer,
        setViewer,
        isModelLoaded,
        setIsModelLoaded,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
}

export function useViewer() {
  const context = useContext(ViewerContext);
  if (!context) {
    throw new Error("useViewer must be used within a ViewerProvider");
  }
  return context;
}
