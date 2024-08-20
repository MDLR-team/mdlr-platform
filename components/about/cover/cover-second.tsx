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
          Integrating Mdlr&apos;s Tools into Your Startup or Small Business
        </Box>
      )}

      {type === "teams" && (
        <Box
          data-type="description"
          sx={{
            maxWidth: "750px",
          }}
        >
          Mdlr is a powerful, standalone tool designed to streamline your
          project workflows, allowing you to manage 3D models, collaborate with
          your team, and make data-driven decisions efficiently.
        </Box>
      )}

      {type === "startups" && (
        <Box
          data-type="description"
          sx={{
            maxWidth: "750px",
          }}
        >
          Mdlr can be seamlessly integrated into your existing platforms through
          an API, enhancing your system with advanced visualisation and analysis
          capabilities tailored for your sector.
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
