import { CommentProvider } from "@/components/services/project-services/comment-service/comment-provider";
import { ViewerProvider } from "@/components/forge/viewer-provider";
import ViewerW from "@/components/forge/viewer-w";
import { ProjectProvider } from "@/components/services/project-services/project-service/project-provider";
import UIGrid from "@/components/ui/ui-grid";
import { GlobalStatesProvider } from "@/components/services/project-services/global-states-service/global-states-provider";
import { ActiveCommentProvider } from "@/components/services/project-services/active-comment-service/active-comment-provider";
import { Markup3DProvider } from "@/components/services/project-services/markup-3d-service/markup-3d-provider";
import { Markup2DProvider } from "@/components/services/project-services/markup-2d-service/markup-2d-provider";
import { useAuth } from "@/components/services/app-services/auth/auth-provider";
import { useRouter } from "next/router";
import React from "react";
import { MarkupProvider } from "@/components/services/markup-service/markup-provider";

const ViewerPage = () => {
  return (
    <ProjectProvider>
      <GlobalStatesProvider>
        <ViewerProvider>
          <CommentProvider>
            <MarkupProvider>
              {/* <ActiveCommentProvider>
              <Markup3DProvider>
                <Markup2DProvider> */}
              <div
                style={{
                  display: "flex",
                  width: "100vw",
                  height: "100vh",
                  position: "relative",
                }}
              >
                <UIGrid />

                <ViewerW />
              </div>
              {/* </Markup2DProvider>
              </Markup3DProvider>
            </ActiveCommentProvider> */}
            </MarkupProvider>
          </CommentProvider>
        </ViewerProvider>
      </GlobalStatesProvider>
    </ProjectProvider>
  );
};

export default ViewerPage;
