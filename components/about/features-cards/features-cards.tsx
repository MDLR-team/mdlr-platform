// FeatureGrid.js
import { Box } from "@mui/material";
import React, { useMemo } from "react";
import styled from "styled-components";

const GridContainer = styled(Box)`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(250px, auto);
  grid-gap: 0px;

  max-width: 1200px;
  align-self: center;

  border: 1px solid var(--border-color);
  border-radius: 10px;

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 576px) {
    & > div:nth-child(1),
    & > div:nth-child(4) {
      border-right: 0px solid var(--border-color);
    }

    & > div:nth-child(1),
    & > div:nth-child(2) {
      border-bottom: 0px solid var(--border-color);
    }
  }
`;

const FeatureCard = styled.div`
  //background: #1c1c1e;
  color: #fff;
  padding: 20px;
  border-radius: 0px;
  //box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  border: 0.5px solid var(--border-color);
  overflow: hidden;

  display: flex;
  flex-direction: column;

  &:nth-child(1) {
    grid-row: span 3;
  }

  &:nth-child(2) {
    grid-row: span 2;
  }

  &:nth-child(3) {
    grid-row: span 3;
  }

  &:nth-child(4) {
    grid-row: span 2;
  }
`;

export const FeatureTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;

  &,
  & * {
    color: var(--text-primary);
  }
`;

export const FeatureDescription = styled.p`
  &,
  & * {
    font-size: var(--font-size-m);
    line-height: 1.5;
    font-weight: 500;
    color: var(--text-secondary) !important;
  }
`;

const FeatureGrid = () => {
  return (
    <>
      <GridContainer
        sx={{
          padding: {
            xs: "15px",
            sm: "20px",
          },
        }}
      >
        <FeatureCard>
          <Badge type="viewer" />
          <FeatureTitle>
            Share 3D models in any format with your team
          </FeatureTitle>
          <FeatureDescription>
            Comment and discuss project changes at each stage in a real-time,
            multiplayer 3D environment — tag team members, highlight areas, and
            embed files for comprehensive reviews.
          </FeatureDescription>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              right: "0",
              bottom: "0",
            }}
          >
            <ImageWrapper1
              sx={{
                position: "absolute",
                width: "100%",
                right: "0",
                bottom: "0",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: "68.8%",
                  width: "100%",
                  backgroundImage: 'url("/previews/a.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></Box>
            </ImageWrapper1>
          </Box>
        </FeatureCard>
        <FeatureCard>
          <Badge type="whiteboard" />
          <FeatureTitle>AI-Driven Task and Comment Dashboards</FeatureTitle>
          <FeatureDescription>
            Use AI to analyse and manage comments and tasks by topic, performer,
            and date within a 3D model environment. Effortlessly track and
            organise project details to enhance collaboration and efficiency.
          </FeatureDescription>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              right: "0",
              bottom: "0",
              minHeight: "200px",
            }}
          >
            <ImageWrapper2
              sx={{
                position: "absolute",
                width: "80%",
                right: "0",
                bottom: "0",
                transform: "translate(-10%, 30%)",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: "56%",
                  width: "100%",
                  backgroundImage: 'url("/previews/b.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></Box>
            </ImageWrapper2>
          </Box>
        </FeatureCard>
        <FeatureCard>
          <Badge type="whiteboard" />
          <FeatureTitle>
            Access 3D Model Specifications through Collaborative Whiteboards
          </FeatureTitle>
          <FeatureDescription>
            Create role-specific whiteboards and use drag-and-drop data widgets
            to generate customised project charts and visualisations. Enhance
            your workflow with an AI-driven chatbot, making it easier to access
            and manage all 3D model specifications collaboratively.
          </FeatureDescription>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              right: "0",
              bottom: "0",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                right: "0",
                bottom: "0",
                transform: "translate(10%, 10%)",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: "69.9%",
                  width: "100%",
                  backgroundImage: 'url("/previews/c.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></Box>
            </Box>
          </Box>
        </FeatureCard>
        <FeatureCard>
          <Badge type="dashboard" />
          <FeatureTitle>Instant Dashboards</FeatureTitle>
          <FeatureDescription>
            The dashboard allows you to create and present comprehensive,
            data-rich visualisations and presentations, providing a clear,
            organised view of project progress and insights.
          </FeatureDescription>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "none",
              right: "0",
              bottom: "0",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "40%",
                right: "0",
                bottom: "0",
                transform: "translate(10%, 10%)",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  paddingBottom: "121.7%",
                  width: "100%",
                  backgroundImage: 'url("/previews/d.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></Box>
            </Box>
          </Box>
        </FeatureCard>
      </GridContainer>
    </>
  );
};
const ImageWrapper1 = styled(Box)`
  @media (max-width: 576px) {
    transform: scale(1.3) translate(-20px, -30px);
  }
`;

const ImageWrapper2 = styled(Box)`
  @media (max-width: 576px) {
    transform: scale(1.3) translate(-10%, 0px);
  }

  @media (min-width: 576px) {
    transform: translate(-10%, 30%);
  }
`;

const Badge: React.FC<{
  type: "viewer" | "whiteboard" | "dashboard";
}> = ({ type }) => {
  const label = useMemo(() => {
    switch (type) {
      case "viewer":
        return "3D Viewer";
      case "whiteboard":
        return "Whiteboard";
      case "dashboard":
        return "Dashboard";
    }
  }, [type]);

  const image = useMemo(() => {
    switch (type) {
      case "viewer":
        return "/previews/a1.svg";
      case "whiteboard":
        return "/previews/a3.svg";
      case "dashboard":
        return "/previews/a2.svg";
    }
  }, [type]);

  return (
    <Box
      sx={{
        display: "flex",
        fontWeight: "bold",
        alignItems: "center",
        gap: "10px",
        fontSize: "var(--font-size-d)",
        border: "1px solid #212121",
        maxWidth: "max-content",
        padding: "5px 10px",
        borderRadius: "20px",
      }}
    >
      <img src={image} width="24" height="24" />

      {label}
    </Box>
  );
};

export default FeatureGrid;
