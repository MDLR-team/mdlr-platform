// FeatureGrid.js
import React from "react";
import styled from "styled-components";

const GridContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(200px, auto);
  grid-gap: 20px;
  padding: 20px;

  max-width: 1200px;
  align-self: center;
`;

const FeatureCard = styled.div`
  //background: #1c1c1e;
  color: #fff;
  padding: 20px;
  border-radius: 20px;
  //box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  border: 10px solid rgba(0, 0, 0, 0.02);

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
`;

const FeatureGrid = () => {
  return (
    <GridContainer>
      <FeatureCard>
        <FeatureTitle>Interactive Commenting</FeatureTitle>
        <FeatureDescription>
          Add comments, scribbles, and media to 3D models. Tag team members,
          highlight areas, and embed images/videos for comprehensive reviews.
          Enhance communication and streamline feedback
        </FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <FeatureTitle>Smart Comment Categorization</FeatureTitle>
        <FeatureDescription>
          AI categorizes comments by topics. Visualize focus areas with
          percentage breakdowns to prioritize and address critical feedback
          efficiently
        </FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <FeatureTitle>Customizable Data Visualizations</FeatureTitle>
        <FeatureDescription>
          Create role-specific dashboards with interactive whiteboard tools.
          Drag-and-drop data widgets to generate customized charts and
          visualizations tailored to team needs
        </FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <FeatureTitle>Instant Dashboards via Chatbot</FeatureTitle>
        <FeatureDescription>
          Get your project dashboards through Telegram by text or voice commands
        </FeatureDescription>
      </FeatureCard>
    </GridContainer>
  );
};

export default FeatureGrid;
