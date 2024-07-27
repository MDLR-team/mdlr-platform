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
        <Thumb style={{ backgroundColor: "white" }}></Thumb>
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
            }}
          >
            Project Board
          </Box>

          <Box>{" "}</Box>
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

  background-color: #94c2db !important;
  border: 1px solid black !important;
  border-radius: 8px;

  &:hover {
    & {
      background-color: #e4e2df;
      border: 1px solid #999999;
    }
  }

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
