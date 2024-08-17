import { Box, Button } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";

const Cover = () => {
  return (
    <>
      <CoverWrapper>
        <Background></Background>

        <Wrapper>
          <Box data-type="cover">
            Manage your AEC projects efficiently with MDLR
          </Box>

          {/* 
        <Box data-type="cover">
          Transform AEC Projects
          <br />
          with AI-Powered Precision
        </Box> */}

          {/* <Box
          data-type="divider"
          sx={{
            width: "100%",
            height: "10px",
            backgroundColor: "rgba(255, 255, 255, .2)",
            maxWidth: "300px",
          }}
        ></Box> */}

          <Box
            data-type="description"
            sx={{
              maxWidth: "750px",
            }}
          >
            {/* MdIr is an AI-driven data visualization, analysis, and optimization */}
            Optimize workflows and unite teams with Mdlr, an AI-driven tool
            integrating 3D, 2D, and tabular data. Use features like{" "}
            <EntityLabel color="orange">
              <img src="/previews/a1.svg" width="24" height="24" />
              &nbsp;3D&nbsp;Viewer
            </EntityLabel>
            ,{" "}
            <EntityLabel color="orange">
              <img src="/previews/a3.svg" width="24" height="24" />
              &nbsp;Whiteboard
            </EntityLabel>{" "}
            and{" "}
            <EntityLabel color="orange">
              <img src="/previews/a2.svg" width="24" height="24" />
              &nbsp;Dashboards
            </EntityLabel>{" "}
            to gain valuable project insights
            <br />
            {/* <br />
        The tool is designed as a collaborative environment, integrating a
        whiteboard with AI chats, a 3D viewer, and a dashboard that presents
        easy-to-understand project data. */}
          </Box>

          <Link href="/requestdemo">
            <Button variant="contained" color="primary" size="large">
              Request a demo
            </Button>
          </Link>
        </Wrapper>
      </CoverWrapper>

      <CoverImage>
        <Img></Img>
      </CoverImage>
    </>
  );
};

const CoverImage = styled.div`
  width: 1200px;
  position: relative;
  align-self: center;
  margin: 50px 0px;
`;

const Img = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 23.25%;
  background-image: url("/thumbs/cover.svg");
  background-size: cover;
  background-position: center;
`;

const EntityLabel = styled.span<{
  color: string;
}>`
  gap: 10px;
  white-space: nowrap;

  /* &&::before {
    content: "";
    width: 10px;
    height: 10px;
    min-width: 10px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
  } */
`;

const CoverWrapper = styled.div`
  width: 100vw;

  position: relative;
`;

const Background = styled.div`
  position: absolute;
  z-index: -0;
  width: 100vw;
  height: 100vh;
  /* background: radial-gradient(
    rgb(68, 91, 222) 0%,
    rgb(215, 78, 243) 25%,
    rgb(255, 255, 255) 50%
  ); */
`;

const Wrapper = styled.div`
  width: 100vw;
  position: relative;
  z-index: 1;

  min-height: max-content;

  padding: 0px 80px;
  gap: 50px;

  @media (max-width: 576px) {
    padding: 0px 20px;
  }

  @media (min-width: 1200px) {
    height: 100vh;
    max-height: 600px;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &,
  & * {
    text-align: center;
  }

  && div[data-type="cover"] {
    max-width: 1200px;

    &,
    & * {
      font-size: 80px;
      font-family: "Euclid Circular A", sans-serif;
      font-weight: & b {
        font-weight: 700;
        font-family: Born;
      }
    }

    @media (max-width: 800px) {
      &,
      & * {
        font-size: 40px;
      }

      & {
        margin-top: 100px;
      }
    }
  }

  @media (max-width: 576px) {
    & div[data-type="divider"] {
      display: none;
    }
  }

  && div[data-type="description"] {
    &,
    & span {
      font-size: 24px;
    }

    @media (max-width: 576px) {
      &,
      & span {
        font-size: 18px;
      }

      & img {
        width: 18px;
        height: 18px;
      }
    }

    & span {
      font-weight: 700;
    }

    color: var(--text-secondary);
    font-weight: 300;
  }
`;

export default Cover;
