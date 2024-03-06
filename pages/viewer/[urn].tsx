import CommentsBlock from "@/components/comments/comment-layout/comment-layout";
import { CommentProvider } from "@/components/comments/comment-provider/comment-provider";
import { MarkupProvider } from "@/components/comments/markup-provider/markup-provider";
import { ViewerProvider } from "@/components/forge/viewer-provider";
import ViewerW from "@/components/forge/viewer-w";
import { ProjectProvider } from "@/components/project/project-provider";
import UIGrid from "@/components/ui/ui-grid";
import styled from "styled-components";

const ViewerPage = () => {
  return (
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
              <UIGrid />

              {/* <CommentsBlock /> */}

              <ViewerW />
            </div>
          </MarkupProvider>
        </CommentProvider>
      </ViewerProvider>
    </ProjectProvider>
  );
};

export default ViewerPage;
