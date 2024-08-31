import DashboardViewer from "@/components/dashboard-viewer/dashboard-viewer";
import { DashboardServiceProvider } from "@/components/services/dashboard-services/dashboard-service/dashboard-service-provider";
import { WorkspaceProvider } from "@/components/services/workspace-services/workspace/workspace-provider";
import Bar from "@/components/ui/dashboard-page/bar/bar";
import Share from "@/components/ui/dashboard-page/share/share";
import {
  BarWrapper,
  ContentWrapper,
  FooterWrapper,
  Grid,
  Wrapper,
} from "@/components/ui/ui-grid.styled";
import { Box } from "@mui/material";
import "reactflow/dist/style.css";

const DashboardPage = () => {
  return (
    <WorkspaceProvider>
      <DashboardServiceProvider>
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
                <Bar />
                <Share />
              </BarWrapper>

              <ContentWrapper>{/* <CommentsBlock /> */}</ContentWrapper>

              <FooterWrapper
                style={{ justifyContent: "center" }}
              ></FooterWrapper>
            </Grid>
          </Wrapper>

          <DashboardViewer />
        </div>
      </DashboardServiceProvider>
    </WorkspaceProvider>
  );
};

export default DashboardPage;
