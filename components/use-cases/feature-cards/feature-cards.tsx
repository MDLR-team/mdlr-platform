import { EntityLabel } from "@/components/about/cover/cover";
import {
  FeatureDescription,
  FeatureTitle,
} from "@/components/about/features-cards/features-cards";
import { Box } from "@mui/material";
import styled from "styled-components";

const FeatureCards = () => {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          padding: "10px",
          color: "var(--text-color)",
          //border: "1px solid var(--border-color)",
          width: "100%",
          maxWidth: "200px",
          margin: "0 auto",
          borderRadius: "100px",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
          }}
        >
          How it works
        </h2>
      </Box>

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

          <FeatureTitle>Step 1: Upload Your Project Data </FeatureTitle>
          <FeatureDescription>
            Begin by uploading your project files into Mdlr. Whether it's 3D
            models or other data formats, our platform supports various inputs
            to get your project set up quickly.
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

          <FeatureTitle>Step 2: Collaborate in Real Time</FeatureTitle>
          <FeatureDescription>
            Utilise the 3D Viewer to explore and interact with your project
            data. Collaborate with your team in real time by visualising the
            models, tagging team members, and providing feedback directly within
            the 3D environment.
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

          <FeatureTitle>Step 3: Analyse and Gain Insights</FeatureTitle>
          <FeatureDescription>
            Access the Whiteboard to analyse your project data using AI-driven
            tools and interactive charts. Generate valuable insights and
            understand key project metrics through advanced visualisations
            tailored to your needs.
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

          <FeatureTitle>Step 4: Present and Finalise Decisions</FeatureTitle>
          <FeatureDescription>
            Use the Dashboard to compile and present your insights. Create
            detailed, ready-to-use presentations that communicate your findings
            clearly and support decision-making with comprehensive project
            overviews.
          </FeatureDescription>
        </FeatureCard>
      </GridContainer>
    </>
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
              'url("https://liveblocks.io/_next/image?url=%2Fimages%2Fproducts%2Fdashboard.png&w=256&q=75")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <FeatureTitle>Step 1: Integrate the API</FeatureTitle>
        <FeatureDescription>
          Begin by integrating Mdlr's API into your existing platform. Our team
          will guide you through the setup process, ensuring a smooth
          integration.
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

        <FeatureTitle>Step 2: Configure Visualisation Features </FeatureTitle>
        <FeatureDescription>
          Once integrated, configure the advanced visualisation capabilities to
          suit your needs. Utilise our 3D Viewer, Whiteboard, and Dashboard to
          enhance your system's functionality.
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

        <FeatureTitle>Step 3: Enable Data Analysis</FeatureTitle>
        <FeatureDescription>
          Leverage our AI-driven tools to add robust data analysis features to
          your platform. Set up the AI tools to generate insights and
          visualisations from your data.
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

        <FeatureTitle>Step 4: Customise User Experience</FeatureTitle>
        <FeatureDescription>
          Tailor the user interface and experience to match your platform’s
          design. Customise the integration to ensure seamless interaction
          between your system and Mdlr’s advanced features.
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

        <FeatureTitle>Step 5: Test and Validate</FeatureTitle>
        <FeatureDescription>
          Thoroughly test the integration to ensure all functionalities work as
          expected. Validate the visualisations, analytics, and presentation
          features to guarantee they meet your requirements.
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

        <FeatureTitle>Step 6: Deploy and Monitor</FeatureTitle>
        <FeatureDescription>
          Deploy the integrated features to your live environment. Continuously
          monitor the performance and gather feedback to make any necessary
          adjustments for optimal performance.
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
    & > div:nth-child(3),
    & > div:nth-child(5) {
      border-right: 0px solid var(--border-color);
    }

    & > div:nth-child(1),
    & > div:nth-child(2),
    & > div:nth-child(3),
    & > div:nth-child(4) {
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
