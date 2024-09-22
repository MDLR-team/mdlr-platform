import Bar from "@/components/about/bar/bar";
import Cover from "@/components/about/cover/cover";
import FAQ from "@/components/about/faq/faq";
import FeatureGrid from "@/components/about/features-cards/features-cards";
import Features from "@/components/about/features/features";
import Feedback from "@/components/about/feedback/feedback";
import Footer from "@/components/about/footer/footer";
import UseCase from "@/components/about/use-case/use-case";
import FeatureColumns from "@/components/feature-columns/feature-columns";
import Screens from "@/components/screens/screens-v2";
import { Box } from "@mui/material";
import styled from "styled-components";

const AboutPage = () => {
  return (
    <>
      <Bar />

      <Wrapper>
        <Cover />

        <IssueDescription>
          <IssueDescription>
            Managing design and construction projects is challenging due to
            scattered data across tools, manual reporting processes, and
            inefficient role-based workflows.
            <br />
            <br />
            Traditional methods also fail to leverage AI for deeper insights,
            leaving teams with limited project visibility.
            <br />
            <br />
            MDLR centralizes project data, automates reporting, and provides
            customizable workflows for report delivery. With AI-driven insights,
            teams can generate real-time reports, track role-based dashboards,
            and make informed decisions with ease.
          </IssueDescription>
        </IssueDescription>

        <Screens />

        <FeatureColumns />

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

        <FAQ />

        <Feedback />

        <Footer />
      </Wrapper>
    </>
  );
};

const IssueDescription = styled(Box)`
  line-height: 1.5;
  font-weight: 500;
  padding: 20px;
  align-self: center;
  max-width: 600px;

  &,
  & *:not(span) {
    color: var(--text-secondary) !important;
  }

  &,
  & * {
    font-size: var(--font-size-m);
  }

  & span {
    font-weight: 700;
    color: var(--text-primary);
  }
  margin-bottom: 30px;

  @media (max-width: 576px) {
    &,
    & * {
      line-height: 1.25;
    }

    & {
      margin-top: 0px;
    }
  }
`;

export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  @font-face {
    font-family: Born;
    src: url("/fonts/born.otf");
  }

  background-color: var(--background-color);

  && {
    &,
    & * {
      color: var(--text-primary);

      & h1,
      & h2,
      & h3,
      & h4,
      & h5,
      & h6 {
        font-family: "Euclid Circular A", sans-serif;
        font-weight: 700;
      }
    }
  }
`;

export default AboutPage;
