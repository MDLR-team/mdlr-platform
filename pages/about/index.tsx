import Bar from "@/components/about/bar/bar";
import Cover from "@/components/about/cover/cover";
import FeatureGrid from "@/components/about/features-cards/features-cards";
import Features from "@/components/about/features/features";
import Feedback from "@/components/about/feedback/feedback";
import UseCase from "@/components/about/use-case/use-case";
import { Box } from "@mui/material";
import styled from "styled-components";

const AboutPage = () => {
  return (
    <>
      <Bar />

      <Wrapper>
        <Cover />

        <IssueDescription>
          AEC projects involve managing numerous file types, often linked to 3D
          data, making real-time insights challenging. Traditional tools fall
          short in providing dynamic and collaborative environments for quick
          analysis.
          <br />
          <br />
          MdIr addresses this with:
          <br />
          <span style={{ color: "white", fontWeight: "bold" }}>3D Viewer</span>:
          For detailed model interaction.
          <br />
          <span style={{ color: "white", fontWeight: "bold" }}>
            Insight Whiteboard
          </span>
          : For dynamic data visualization.
          <br />
          <span style={{ color: "white", fontWeight: "bold" }}>AI Chats</span>:
          For smart data retrieval and analysis.
          <br />
          <span style={{ color: "white", fontWeight: "bold" }}>
            Interactive Dashboards
          </span>
          : For comprehensive project overviews.
          <br />
          <br />
          With MdIr, users can quickly analyze content and generate insights
          using the Insight Whiteboard. Describe what you need, and our platform
          creates various charts and visualizations. These can be integrated
          into the whiteboard and accessed instantly via chatbots and other
          methods.
          <br />
          <br />
          MdIr streamlines workflows, enhances collaboration, and delivers
          real-time project insights effortlessly.
          <br />
          <br />
          <span style={{ color: "white", fontWeight: "bold" }}>
            MdIr makes it possible.
          </span>
        </IssueDescription>

        <FeatureGrid />

        {/*  <UseCase
          title={"Visualise"}
          description={[
            "Drop any 3D model or endpoint, and MdIr will extract, visualize, and present the data, regardless of its initial organization.",
            "Collect and turn visualizations into a final, clean presentation",
          ]}
          index={0}
        />
        <UseCase
          title={"Evaluate and Enhance"}
          description={[
            "Integrate and manage parts of generative algorithms for the AEC sector. Use the whiteboard to organize them.",
            "Apply a consistent method to utilize these parts. Combine results to generate new parameters and improve the algorithm.",
          ]}
          index={1}
        />
        <UseCase
          title={"Integrate"}
          description={[
            "Seamlessly integrate MdIr as a library into applications to enhance functionality with AI-driven data visualization.",
            "Augment 3D viewers, GIS software, or any application with advanced analysis, providing better data insights and visualization tools.",
          ]}
          index={2}
        /> */}

        {/* <Features /> */}

        <Feedback />
      </Wrapper>
    </>
  );
};

const IssueDescription = styled(Box)`
  font-size: 1.25rem;
  line-height: 1.5;
  font-weight: 500;
  padding: 20px;
  align-self: center;
  max-width: 600px;

  &,
  & *:not(span) {
    color: rgba(255, 255, 255, 0.5) !important;
  }

  &,
  & * {
    font-size: 1.25rem;
  }

  & span {
    font-weight: 700;
    color: white;
  }
  margin-bottom: 150px;

  @media (max-width: 576px) {
    &,
    & * {
      font-size: 18px;
      line-height: 1.25;
    }

    & {
      margin-top: 100px;
    }
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  @font-face {
    font-family: Born;
    src: url("/fonts/born.otf");
  }

  background-color: black;

  && {
    &,
    & * {
      color: white;

      & h1,
      & h2,
      & h3,
      & h4,
      & h5,
      & h6 {
        //font-family: Born;
        font-weight: 700;
      }
    }
  }
`;

export default AboutPage;
