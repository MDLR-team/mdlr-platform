import { Box } from "@mui/material";
import styled from "styled-components";

const Bar = () => {
  return (
    <Wrapper>
      <div className="left">
        <Box>MDLR</Box>

        <div className="pricing-tab">Pricing</div>
        <div className="contact-tab">Contact</div>
      </div>
      <div className="right">
        <Box>Book demo</Box>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  z-index: 1000;
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
      font-family: Born;
    }

    &,
    & * {
      font-size: 18px;
    }
  }
`;

export default Bar;
