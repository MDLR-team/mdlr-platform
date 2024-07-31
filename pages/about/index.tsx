import Bar from "@/components/about/bar/bar";
import Cover from "@/components/about/cover/cover";
import FeatureGrid from "@/components/about/features-cards/features-cards";
import Features from "@/components/about/features/features";
import Feedback from "@/components/about/feedback/feedback";
import UseCase from "@/components/about/use-case/use-case";
import styled from "styled-components";

const AboutPage = () => {
  return (
    <>
      <Bar />

      <Wrapper>
        <Cover />

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

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  @font-face {
    font-family: Born;
    src: url("/fonts/born.otf");
  }

  background-color: white;

  && {
    &,
    & * {
      color: black;

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
