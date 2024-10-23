import { CommentProvider } from "@/components/services/project-services/comment-service/comment-provider";
import { ViewerProvider } from "@/components/forge/viewer-provider";
import ViewerW from "@/components/forge/viewer-w";
import { ProjectProvider } from "@/components/services/project-services/project-service/project-provider";
import UIGrid from "@/components/ui/ui-grid";
import { GlobalStatesProvider } from "@/components/services/project-services/global-states-service/global-states-provider";
import React from "react";
import { MarkupProvider } from "@/components/services/markup-service/markup-provider";
import { WorkspaceProvider } from "@/components/services/workspace-services/workspace/workspace-provider";

const ViewerPage = () => {
  return (
    <WorkspaceProvider>
      <ProjectProvider>
        <GlobalStatesProvider>
          <ViewerProvider>
            <CommentProvider>
              <MarkupProvider>
                <div
                  style={{
                    display: "flex",
                    width: "100vw",
                    height: "100vh",
                    maxHeight: "100vh",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <UIGrid />
                </div>
              </MarkupProvider>
            </CommentProvider>
          </ViewerProvider>
        </GlobalStatesProvider>
      </ProjectProvider>
    </WorkspaceProvider>
  );
};

export default ViewerPage;
