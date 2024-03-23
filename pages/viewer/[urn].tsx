import { CommentProvider } from "@/components/services/project-services/comment-service/comment-provider";
import { MarkupProvider } from "@/components/comments/markup-provider/markup-provider";
import { ViewerProvider } from "@/components/forge/viewer-provider";
import ViewerW from "@/components/forge/viewer-w";
import { ProjectProvider } from "@/components/services/project-services/project-service/project-provider";
import UIGrid from "@/components/ui/ui-grid";
import { GlobalStatesProvider } from "@/components/services/project-services/global-states-service/global-states-provider";
import PaperCanvas from "@/components/paper/paper";

const ViewerPage = () => {
  return (
    <GlobalStatesProvider>
      <ProjectProvider>
        <ViewerProvider>
          <CommentProvider>
            <MarkupProvider>
              <div
                style={{
                  display: "flex",
                  width: "100vw",
                  height: "100vh",
                  position: "relative",
                }}
              >
                <PaperCanvas />

                <UIGrid />

                <ViewerW />
              </div>
            </MarkupProvider>
          </CommentProvider>
        </ViewerProvider>
      </ProjectProvider>
    </GlobalStatesProvider>
  );
};

export default ViewerPage;
