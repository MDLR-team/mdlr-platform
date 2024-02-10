import CommentsBlock from "@/components/comments/comment-layout/comment-layout";
import { CommentProvider } from "@/components/comments/comment-provider/comment-provider";
import { MarkupProvider } from "@/components/comments/markup-provider/markup-provider";
import { ViewerProvider } from "@/components/forge/viewer-provider";
import ViewerW from "@/components/forge/viewer-w";
import styled from "styled-components";

const ViewerPage = () => {
  return (
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
            <CommentsBlock />

            <ViewerW />
          </div>
        </MarkupProvider>
      </CommentProvider>
    </ViewerProvider>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100
  height: 100vh;
`;

export default ViewerPage;
