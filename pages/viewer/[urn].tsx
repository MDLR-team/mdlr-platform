import { CommentProvider } from "@/components/services/project-services/comment-service/comment-provider";
import { MarkupProvider } from "@/components/comments/markup-provider/markup-provider";
import { ViewerProvider } from "@/components/forge/viewer-provider";
import ViewerW from "@/components/forge/viewer-w";
import { ProjectProvider } from "@/components/services/project-services/project-service/project-provider";
import UIGrid from "@/components/ui/ui-grid";
import { GlobalStatesProvider } from "@/components/services/project-services/global-states-service/global-states-provider";
import PaperCanvas from "@/components/paper/paper";
import { ActiveCommentProvider } from "@/components/services/project-services/active-comment-service/active-comment-provider";

const ViewerPage = () => {
  return (
    <GlobalStatesProvider>
      <ProjectProvider>
        <ViewerProvider>
          <CommentProvider>
            <ActiveCommentProvider>
              <MarkupProvider>
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
              </MarkupProvider>
            </ActiveCommentProvider>
          </CommentProvider>
        </ViewerProvider>
      </ProjectProvider>
    </GlobalStatesProvider>
  );
};

export default ViewerPage;
