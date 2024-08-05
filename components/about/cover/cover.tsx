import { Box, Button } from "@mui/material";
import styled from "styled-components";

const Cover = () => {
  return (
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

      <Box
        data-type="divider"
        sx={{
          width: "100%",
          height: "10px",
          backgroundColor: "rgba(255, 255, 255, .2)",
          maxWidth: "300px",
        }}
      ></Box>

      <Box
        data-type="description"
        sx={{
          maxWidth: "750px",
        }}
      >
        {/* MdIr is an AI-driven data visualization, analysis, and optimization */}
        Optimize workflows and unite teams with Mdlr, an AI-driven tool
        integrating 3D, 2D, and tabular data. <br />
        Use features like{" "}
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

      <Button
        sx={{
          width: "200px",
          height: "80px !important",
          padding: "0px 30px",
          borderRadius: "25px",
          fontSize: "24px !important",
          backgroundColor: "white !important",
          color: "black !important",
        }}
        variant="contained"
      >
        <span
          style={{
            color: "black !important",
            fontSize: "24px !important",
          }}
        >
          Sign up for free
        </span>
      </Button>
    </Wrapper>
  );
};

const EntityLabel = styled.span<{
  color: string;
}>`
  gap: 10px;

  /* &&::before {
    content: "";
    width: 10px;
    height: 10px;
    min-width: 10px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
  } */

  color: white;
`;

const Wrapper = styled.div`
  width: 100vw;

  min-height: max-content;

  padding: 0px 80px;
  gap: 50px;

  @media (max-width: 576px) {
    padding: 0px 20px;
  }

  @media (min-width: 1200px) {
    height: 100vh;
    max-height: 800px;
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
    max-width: 1000px;

    &,
    & * {
      font-size: 80px;
      font-weight: 300;

      & b {
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

    color: rgba(255, 255, 255, 0.5);
    font-weight: 300;
  }
`;

export default Cover;
