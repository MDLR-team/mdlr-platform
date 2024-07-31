import { Box, Button } from "@mui/material";
import styled from "styled-components";

const Cover = () => {
  return (
    <Wrapper>
      <Box data-type="cover">
        Transform project insights
        <br />
        with AI-powered precision.
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          maxWidth: "400px",
        }}
      ></Box>

      <Box data-type="description">
        MdIr is an AI-driven data visualization, analysis, and optimization
        <br />
        platform for the projects in the AEC sector
      </Box>

      <Button
        sx={{
          width: "200px",
          height: "80px !important",
          padding: "0px 30px",
          borderRadius: "25px",
          fontSize: "24px !important",
          backgroundColor: "black !important",
          color: "white !important",
        }}
        variant="contained"
      >
        <span
          style={{
            color: "white !important",
            fontSize: "24px !important",
          }}
        >
          Join the waitlist
        </span>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 0px 80px;
  gap: 50px;

  max-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &,
  & * {
    text-align: center;
  }

  && div[data-type="cover"] {
    &,
    & * {
      font-size: 80px;
      color: rgba(0, 0, 0, 1);
      font-weight: 300;

      & b {
        color: rgb(16 60 247) !important;
        font-weight: 700;
        font-family: Born;
      }
    }
  }

  && div[data-type="description"] {
    font-size: 32px;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 300;
  }
`;

export default Cover;
