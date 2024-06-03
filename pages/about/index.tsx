import Bar from "@/components/about/bar/bar";
import CoverVer1 from "@/components/about/cover-1/cover";
import Cover from "@/components/about/cover/cover";
import Features from "@/components/about/features/features";
import Feedback from "@/components/about/feedback/feedback";
import UseCase from "@/components/about/use-case/use-case";
import styled, { createGlobalStyle } from "styled-components";

const AboutPage = () => {
  return (
    <>
      <Wrapper>
        <Bar />

        <CoverVer1 />

        <UseCase
          title={"For Real Estate Development Companies"}
          description={[
            "Gather feedback from citizens about the project using a collaborative dashboard where users can pin their ideas for improvement. Analyse the data using AI, and communicate it to all stakeholders in a user-friendly way.",
            "Make sensible decisions about the project for social impact and better urban environment",
          ]}
          v2={true}
          index={0}
        />
        <UseCase
          title={"For Construction and Design Teams"}
          description={[
            "Use our 3D model viewer to leave comments, address issues, and manage feedback directly within the 3D environment. Roles like contractors, architects, engineers, and clients can interact seamlessly.",
            "Enhance collaboration by providing role-specific summaries, charts, and filtered lists of comments. Enable users to focus on relevant content and make informed decisions based on comprehensive feedback",
          ]}
          v2={true}
          index={3}
        />
        <UseCase
          title={"For Deep Tech Companies using Generative Algorithms"}
          description={[
            "Integrate an API to extract data, study it using AI and improve the algorithms on every stage of its lifecycle.",
            "Enhance the quality and economics of the project",
          ]}
          v2={true}
          index={1}
        />
        <UseCase
          title={"For Application Developers"}
          description={[
            "Seamlessly integrate MdIr as a library into applications to enhance functionality with AI-driven data visualization.",
            "Augment 3D viewers, GIS software, or any application with advanced analysis, providing better data insights and visualization tools.",
          ]}
          v2={true}
          index={2}
        />

        <Features />

        <Feedback />
      </Wrapper>

      <GlobalStyle />
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
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

  background-color: rgb(249, 249, 249);

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
        font-family: Born;
        font-weight: 700;
      }
    }
  }
`;

export default AboutPage;
