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
import CommentsBlockV2 from "@/components/ui/whiteboard-page/comment-layout/comment-layout-v2";
import WhiteboardViewer from "@/components/whiteboard-viewer/whiteboard-viewer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "reactflow/dist/style.css";

const WhiteboardPage = () => {
  const [experience, setExperience] = useState<Experience>(Experience.V1);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      const id = router.query.id as string;
      if (id === "v2") {
        setExperience(Experience.V2);
      }
    }
  }, [router.query.id]);

  return (
    <WorkspaceProvider experience={experience}>
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
              <CommentsBlockV2 />
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

export enum Experience {
  V1 = "v1",
  V2 = "v2",
}

export default WhiteboardPage;
