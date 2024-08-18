import { EntityLabel } from "@/components/about/cover/cover";
import {
  FeatureDescription,
  FeatureTitle,
} from "@/components/about/features-cards/features-cards";
import { Box } from "@mui/material";
import styled from "styled-components";

const FeatureCards = () => {
  return (
    <GridContainer>
      <FeatureCard>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            backgroundImage:
              'url("https://liveblocks.io/_next/image?url=%2Fimages%2Fproducts%2Finfrastructure.png&w=256&q=75")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <FeatureTitle>Login and Secure Access</FeatureTitle>
        <FeatureDescription>
          Start by securely logging into the Mdlr platform. Your data is
          protected with advanced encryption and is accessible only to
          authorized team members.
        </FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            backgroundImage:
              'url("https://liveblocks.io/_next/image?url=%2Fimages%2Fproducts%2Fdashboard.png&w=256&q=75")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <FeatureTitle>Manage and Visualize Projects</FeatureTitle>
        <FeatureDescription>
          Use the 3D Viewer to interact with detailed models, making it easier
          to visualize and refine architectural designs.
          <br />
          <br />
          The Whiteboard allows you to dynamically visualize project data,
          enabling collaborative brainstorming and real-time updates.
          <br />
          <br />
          Track project progress with Dashboards that provide a comprehensive
          overview of all activities, milestones, and key metrics.
        </FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            backgroundImage:
              'url("https://liveblocks.io/_next/image?url=%2Fimages%2Fproducts%2Finfrastructure.png&w=256&q=75")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <FeatureTitle>Collaborate Across Teams</FeatureTitle>
        <FeatureDescription>
          Mdlr&rsquo;s tools are designed for seamless collaboration. Architects
          can refine designs, developers can track progress, and stakeholders
          can access real-time updates—all within one platform.
        </FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            backgroundImage:
              'url("https://liveblocks.io/_next/image?url=%2Fimages%2Fproducts%2Finfrastructure.png&w=256&q=75")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <FeatureTitle>Secure Data Management</FeatureTitle>
        <FeatureDescription>
          Every project is backed by robust security protocols, ensuring that
          your sensitive data remains secure and confidential.
        </FeatureDescription>
      </FeatureCard>
    </GridContainer>
  );
};

export const FeatureCardsForStartups = () => {
  return (
    <GridContainer>
      <FeatureCard>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            backgroundImage:
              'url("https://liveblocks.io/_next/image?url=%2Fimages%2Fproducts%2Finfrastructure.png&w=256&q=75")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <FeatureTitle>Reusable Components for AEC Startups</FeatureTitle>
        <FeatureDescription>
          Mdlr&rsquo;s tools are modular and can be easily integrated into other
          AEC-related platforms. Whether you're building a new application or
          enhancing an existing one, you can incorporate Mdlr&rsquo;s 3D Viewer,
          Insight Whiteboard, and Interactive Dashboards to enrich your
          offerings.
        </FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            backgroundImage:
              'url("https://liveblocks.io/_next/image?url=%2Fimages%2Fproducts%2Fdashboard.png&w=256&q=75")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <FeatureTitle>Seamless Integration</FeatureTitle>
        <FeatureDescription>
          Our tools are designed with flexibility in mind, ensuring they can be
          smoothly integrated with your startup&rsquo;s existing databases and
          systems. This allows your platform to leverage Mdlr&rsquo;s
          capabilities without disrupting your current operations.
        </FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            backgroundImage:
              'url("https://liveblocks.io/_next/image?url=%2Fimages%2Fproducts%2Finfrastructure.png&w=256&q=75")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <FeatureTitle>Enhance Your Product Offering</FeatureTitle>
        <FeatureDescription>
          By integrating Mdlr&rsquo;s components, your startup can offer users
          advanced features like real-time 3D model interaction, dynamic data
          visualization, and comprehensive project dashboards, making your
          product more attractive and competitive in the AEC market.
        </FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <Box
          sx={{
            width: "50px",
            height: "50px",
            backgroundImage:
              'url("https://liveblocks.io/_next/image?url=%2Fimages%2Fproducts%2Finfrastructure.png&w=256&q=75")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <FeatureTitle>Support and Security</FeatureTitle>
        <FeatureDescription>
          Mdlr provides extensive support for integration, ensuring that our
          tools work seamlessly within your environment. Additionally, our
          robust security measures protect your data and your users' data,
          ensuring compliance and peace of mind.
        </FeatureDescription>
      </FeatureCard>
    </GridContainer>
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
    & > div:nth-child(1),
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

export default FeatureCards;
