import { Box, Divider } from "@mui/material";
import styled from "styled-components";
import {
  FeatureDescription,
  FeatureTitle,
} from "../../features-cards/features-cards";
import WideScreen from "../../layout/wide-screen";
import WideHeader from "../../layout/wide-header";

const EnterpriseInterests = () => {
  return (
    <WideScreen>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <WideHeader>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxWidth: { xs: "auto", sm: "50%" },
            }}
          >
            <Box
              sx={{
                fontSize: "var(--font-size-3)",
                lineHeight: "var(--line-height-1)",
                fontFamily: "var(--primary-font-family)",
                fontWeight: "bold",
              }}
            >
              AI-Powered Solutions for the AEC Industry
            </Box>
            <Box
              sx={{
                fontSize: "var(--font-size-p)",
              }}
            >
              Accelerate the development of custom AEC tools with MDLR&apos;s
              AI-enhanced platform, tailored to your needs.
            </Box>
          </Box>
        </WideHeader>

        {/* Block */}
        <GridContainer>
          <FeatureCard>
            <FeatureTitle>Unified Toolset</FeatureTitle>
            <FeatureDescription>
              Components work individually or integrate seamlessly into a
              cohesive workflow.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Future-Proof Technology</FeatureTitle>
            <FeatureDescription>
              Stay ahead with our continuously updated AI-driven insights.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Tailored for Your Projects</FeatureTitle>
            <FeatureDescription>
              Flexible components adapt to optimize your workflows or build
              startup interfaces for any need.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard></FeatureCard>
        </GridContainer>
      </Box>
    </WideScreen>
  );
};

const GridContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(250px, auto);
  grid-gap: 0px;
  padding: 20px;

  max-width: 1200px;
  align-self: center;

  border: 1px solid var(--border-color);
  border-radius: 10px;

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 576px) {
    & > div:nth-child(4) {
      grid-column: 2 / 3;
      grid-row: 1 / 4;
    }

    & > div:nth-child(1),
    & > div:nth-child(2),
    & > div:nth-child(3) {
      border-right: 0px solid var(--border-color);
    }

    & > div:nth-child(1),
    & > div:nth-child(2) {
      border-bottom: 0px solid var(--border-color);
    }
  }

  & > div {
    padding-bottom: 80px;
  }

  // additonal styling
  margin: 30px auto;
  max-width: 1300px;

  & > div {
    padding-bottom: 60px !important;
  }

  grid-auto-rows: minmax(auto, auto);
`;

const FeatureCard = styled.div`
  color: #fff;
  padding: 20px;
  border-radius: 0px;
  position: relative;
  border: 0.5px solid var(--border-color);
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

export default EnterpriseInterests;
