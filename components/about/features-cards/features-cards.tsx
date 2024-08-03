// FeatureGrid.js
import { Box } from "@mui/material";
import React, { useMemo } from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(250px, auto);
  grid-gap: 0px;
  padding: 20px;

  max-width: 1200px;
  align-self: center;

  border: 1px solid #212121;
  border-radius: 10px;

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const FeatureCard = styled.div`
  //background: #1c1c1e;
  color: #fff;
  padding: 20px;
  border-radius: 0px;
  //box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  border: 0.5px solid #212121;
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

const FeatureTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.5;
  font-weight: 500;

  opacity: 0.5;
`;

const FeatureGrid = () => {
  return (
    <>
      <GridContainer>
        <FeatureCard>
          <Badge type="viewer" />
          <FeatureTitle>Interactive Commenting</FeatureTitle>
          <FeatureDescription>
            Add comments, scribbles, and media to 3D models. Tag team members,
            highlight areas, and embed images/videos for comprehensive reviews.
            Enhance communication and streamline feedback
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
            </Box>
          </Box>
        </FeatureCard>
        <FeatureCard>
          <Badge type="whiteboard" />
          <FeatureTitle>Smart Comment Categorization</FeatureTitle>
          <FeatureDescription>
            AI categorizes comments by topics. Visualize focus areas with
            percentage breakdowns to prioritize and address critical feedback
            efficiently
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
            </Box>
          </Box>
        </FeatureCard>
        <FeatureCard>
          <Badge type="whiteboard" />
          <FeatureTitle>Customizable Data Visualizations</FeatureTitle>
          <FeatureDescription>
            Create role-specific dashboards with interactive whiteboard tools.
            Drag-and-drop data widgets to generate customized charts and
            visualizations tailored to team needs
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
          <FeatureTitle>Instant Dashboards via Chatbot</FeatureTitle>
          <FeatureDescription>
            Get your project dashboards through Telegram by text or voice
            commands
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

const Badge: React.FC<{
  type: "viewer" | "whiteboard" | "dashboard";
}> = ({ type }) => {
  const label = useMemo(() => {
    switch (type) {
      case "viewer":
        return "3D Viewer";
      case "whiteboard":
        return "Insight Whiteboard";
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
        fontSize: "1.25rem",
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
