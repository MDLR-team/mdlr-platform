import CommentsBlock from "@/components/comments/comment-layout/comment-layout";
import ViewerW from "@/components/forge/viewer-w";
import ViewerX from "@/components/forge/viewer-x";
import ViewerY from "@/components/forge/viewer-y";
import styled from "styled-components";

const ViewerPage = () => {
  return (
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
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100
  height: 100vh;
`;

export default ViewerPage;
