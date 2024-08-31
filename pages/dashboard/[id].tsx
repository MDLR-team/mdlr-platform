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

const DashboardPage = () => {
  return (
    <WorkspaceProvider>
      <DashboardServiceProvider>
        <Wrapper>
          <Grid>
            <BarWrapper>
              <Bar />
              <Share />
            </BarWrapper>

            <ContentWrapper>{/* <CommentsBlock /> */}</ContentWrapper>

            <FooterWrapper style={{ justifyContent: "center" }}></FooterWrapper>
          </Grid>
        </Wrapper>
      </DashboardServiceProvider>
    </WorkspaceProvider>
  );
};

export default DashboardPage;
