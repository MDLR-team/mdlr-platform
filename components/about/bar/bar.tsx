import { Box, Button } from "@mui/material";
import styled from "styled-components";

const Bar = () => {
  return (
    <Wrapper>
      <div className="left">
        <Box>MDLR</Box>

        <div className="pricing-tab">About</div>
      </div>
      <Button
        sx={{
          padding: "25px 30px",
          borderRadius: "25px",
        }}
        variant="contained"
        color="primary"
      >
        Request a demo
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  z-index: 1000;
  background-color: var(--background-color);
  height: 80px;
  padding: 0px 80px;
  align-items: center;
  justify-content: space-between;

  & {
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px;
  }

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
