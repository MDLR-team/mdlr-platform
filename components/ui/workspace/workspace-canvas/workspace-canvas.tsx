import { Box, Paper } from "@mui/material";
import styled from "styled-components";
import React from "react";

interface WorkspaceItemProps {}

const CatalogCanvas: React.FC<WorkspaceItemProps> = () => {
  const handleNavigate = (e: any) => {
    e.preventDefault(); // Prevent default link behavior
    window.location.href = `/canvas`; // Navigate with a full page reload
  };

  return (
    <Wrapper onClick={handleNavigate}>
      <Paper
        sx={{ padding: "0px", overflow: "hidden", border: "1px solid grey" }}
      >
        <Thumb
          style={{
            backgroundColor: "white",
            backgroundImage: "/thumb/schema.png",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Thumb>
      </Paper>

      <Box
        sx={{
          display: "flex",
          columnGap: "18px",
          justifyContent: "space-between",
          width: "100%",
          padding: "0px 18px 4px 18px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            gap: "2px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            Insight Whiteboard (Beta)
          </Box>

          <Box sx={{ opacity: 0.8 }}>
            Interactive insights across project data
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 9px;
  position: relative;
  height: max-content;

  cursor: pointer;

  background-color: #f2f2f2 !important;
  border: 1px solid black !important;
  //background-image: url("/thumb/schema.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 8px;

  & [data-type="users"] {
    & > * {
      margin-left: -8px;
    }
  }
`;

const Thumb = styled.div`
  width: 100%;
  padding-bottom: 50%;
  background: white;
  position: relative;

  background-image: url("/thumb/schema.png");
  background-size: cover;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Ava = styled.div<{
  color: string;
}>`
  min-width: 27px;
  max-width: 27px;
  min-height: 27px;
  max-height: 27px;

  border-radius: 50%;

  background-color: ${({ color }) => color};
  margin-left: -8px;
`;

export default CatalogCanvas;
