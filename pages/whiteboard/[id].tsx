import { WorkspaceProvider } from "@/components/services/workspace-services/workspace/workspace-provider";
import Bar from "@/components/ui/dashboard-page/bar/bar";
import Share from "@/components/ui/dashboard-page/share/share";
import ToolPanel from "@/components/ui/dashboard-page/tool-panel/tool-panel";
import {
  BarWrapper,
  ContentWrapper,
  FooterWrapper,
  Grid,
  Wrapper,
} from "@/components/ui/ui-grid.styled";
import CommentsBlock from "@/components/ui/whiteboard-page/comment-layout/comment-layout";
import WhiteboardViewer from "@/components/whiteboard-viewer/whiteboard-viewer";
import "reactflow/dist/style.css";

const WhiteboardPage = () => {
  return (
    <WorkspaceProvider>
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          position: "relative",
        }}
      >
        <Wrapper>
          <Grid>
            <BarWrapper>
              <Bar isWhiteboard />
              <Share />
            </BarWrapper>

            <ContentWrapper>
              <CommentsBlock />
            </ContentWrapper>

            <FooterWrapper style={{ justifyContent: "center" }}>
              <ToolPanel isWhiteboard />
            </FooterWrapper>
          </Grid>
        </Wrapper>

        <WhiteboardViewer />
      </div>
    </WorkspaceProvider>
  );
};

export default WhiteboardPage;
