import { Box } from "@mui/material";
import styled from "styled-components";

const Cover = () => {
  return (
    <Wrapper>
      <Box data-type="cover">
        We&apos;re an <b>AI-driven&nbsp;mind&nbsp;map</b>
        <br /> for&nbsp;<b>visualizing</b> and&nbsp;
        <b>optimizing</b>
        <br /> project planning.
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  padding: 0px 80px;

  max-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;

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
`;

export default Cover;
