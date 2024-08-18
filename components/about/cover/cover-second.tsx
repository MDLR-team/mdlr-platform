import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Cover: React.FC<{
  type?: "startups" | "teams";
}> = ({ type = "teams" }) => {
  return (
    <Wrapper>
      {type === "teams" && (
        <Box data-type="cover">
          How Mdlr Benefits Architects, Developers, and AEC Professionals
        </Box>
      )}

      {type === "startups" && (
        <Box data-type="cover">
          Integrating Mdlr's Tools into Your Startup or Small Business
        </Box>
      )}

      {type === "teams" && (
        <Box
          data-type="description"
          sx={{
            maxWidth: "750px",
          }}
        >
          Mdlr is designed to streamline project management and enhance
          collaboration for architects, developers, and AEC professionals.
          <br />
          <br />
          Our platform integrates powerful tools like the 3D Viewer, Insight
          Whiteboard, and Interactive Dashboards to help you manage complex
          projects efficiently, all within a secure environment.
        </Box>
      )}

      {type === "startups" && (
        <Box
          data-type="description"
          sx={{
            maxWidth: "750px",
          }}
        >
          Mdlr’s powerful tools, like the 3D Viewer, Insight Whiteboard, and
          Interactive Dashboards, aren’t just for our platform. They can be
          integrated into your startup, enhancing your existing AEC solutions
          with advanced visualization and analysis capabilities.
        </Box>
      )}
    </Wrapper>
  );
};

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
      font-size: 64px;
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
