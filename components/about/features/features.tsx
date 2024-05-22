import { Box } from "@mui/material";
import styled from "styled-components";

const Features = () => {
  return (
    <Wrapper>
      <Box>
        <h1>Features and Functions of MdIr</h1>
      </Box>

      <DataGrid>
        {data.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
            <p>0{index + 1}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </DataGrid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  && {
    margin-top: 80px;
    width: 100%;
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    & p {
        font-size: 14px;
        line-height: 1.2;
    }

    & h1 {
      font-size: 56px;
      font-weight: 700;
      margin-bottom: 40px;
    }

    & h2 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 100px;
  padding: 80px 160px;
  max-width: 1400px;
`;

const data = [
  {
    title: (
      <>
        Any Input
        <br />
        Data
      </>
    ),
    description: (
      <>
        Handle any input data, from 3D models with non-organized metadata to
        various endpoints. MdIr polishes and organizes data internally.
      </>
    ),
  },
  {
    title: <>High-Quality Data Visualization</>,
    description: (
      <>Access a wide variety of high-quality visualizations and charts.</>
    ),
  },
  {
    title: <>Flexible Presentation Creation</>,
    description: (
      <>Create customized presentations from your data visualizations.</>
    ),
  },
  {
    title: <>Generative Algorithms Management</>,
    description: (
      <>
        Organize and optimize generative algorithms for the AEC sector using the
        whiteboard.
      </>
    ),
  },
  {
    title: (
      <>
        Integration
        <br />
        with Your Apps
      </>
    ),
    description: (
      <>
        Integrate MdIr into existing applications for enhanced AI-driven data
        visualization and analysis.
      </>
    ),
  },
  {
    title: <>3D Model and Endpoint Viewing</>,
    description: (
      <>View uploaded models or endpoints in a comprehensive 3D viewer.</>
    ),
  },
];

export default Features;
