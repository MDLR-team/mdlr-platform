import Bar from "./bar/bar";
import CommentsBlock from "../comments/comment-layout/comment-layout";
import Share from "../layout/share/share";
import ToolPanel from "./tool-panel/tool-panel";
import ActiveCommentDialog from "./active-comment-dialog/active-comment-dialog";
import ViewStateMode from "./view-state-mode/view-state-mode";
import CommentForm from "./floating-dialogs/comment-form/comment-form";
import {
  BarWrapper,
  ContentWrapper,
  FloatingWrapper,
  FooterWrapper,
  Grid,
  Wrapper,
} from "./ui-grid.styled";
import LeftSidebar from "./left-sidebar/left-sidebar";
import { Box } from "@mui/material";
import Split from "react-split";
import ViewerW from "../forge/viewer-w";
import { useGlobalStates } from "../services/project-services/global-states-service/global-states-provider";

const UIGrid = () => {
  const { isNotePanelOpen } = useGlobalStates();

  return (
    <>
      <Wrapper>
        <Split
          sizes={isNotePanelOpen ? [40, 60] : [0, 100]} // Adjust sizes based on sidebar state
          minSize={isNotePanelOpen ? 200 : 0} // Minimum size when sidebar is open
          gutterSize={isNotePanelOpen ? 1 : 0}
          gutterAlign="center"
          direction="horizontal"
          style={{ display: "flex", width: "100%", height: "100%" }}
        >
          <LeftSidebar />

          <Box
            sx={{
              width: "100%",
              position: "relative",
            }}
            className="viewer"
          >
            <ViewStateMode />

            <FloatingWrapper className="floating-wrapper">
              <CommentForm />
              <ActiveCommentDialog />
            </FloatingWrapper>

            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
              }}
            >
              <ViewerW />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
                position: "relative",
                zIndex: 21,
                pointerEvents: "none",
              }}
            >
              {/* <TopBar /> */}

              <Grid>
                <BarWrapper>
                  <Bar />
                  <Share />
                </BarWrapper>

                <ContentWrapper>
                  <CommentsBlock />
                </ContentWrapper>

                <FooterWrapper style={{ justifyContent: "center" }}>
                  <ToolPanel />
                </FooterWrapper>
              </Grid>
            </Box>
          </Box>
        </Split>
      </Wrapper>
    </>
  );
};

export default UIGrid;
