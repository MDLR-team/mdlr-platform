import { Box } from "@mui/material";
import styled from "styled-components";

const Bar = () => {
  return (
    <Wrapper>
      <div className="left">
        <Box>MDLR</Box>

        <div className="pricing-tab">About</div>
      </div>
      <div className="right">
        <Box>Sign up for free</Box>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  z-index: 1000;
  background-color: white;
  height: 80px;
  padding: 0px 80px;
  align-items: center;
  justify-content: space-between;

  .left,
  .right {
    display: flex;
    align-items: center;
    margin-right: 20px;
    gap: 40px;

    & > div:first-child {
      font-size: 24px;
      font-weight: 700;
      //font-family: Born;
    }

    &,
    & * {
      font-size: 18px;
    }
  }

  @media (max-width: 800px) {
    & .right {
      display: none;
    }
  }

  @media (max-width: 576px) {
    & .pricing-tab,
    & .contact-tab {
      display: none;
    }
  }
`;

export default Bar;