import { Box, Button } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";
import WideScreen from "../../layout/wide-screen";

const EnterpriseCover: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Box data-type="cover">Build AEC Tools, Fast</Box>
        <Box
          data-type="description"
          sx={{
            maxWidth: "750px",
          }}
        >
          MDLR empowers AEC professionals and startups to quickly design
          solutions using adaptable tools—no code required.
        </Box>

        <a
          href="https://calendly.com/mdlr-team/ai-strategy-implementation-with-mdlr"
          target="_blank"
        >
          <Button variant="contained" color="primary" size="large">
            Talk to Sales
          </Button>
        </a>
      </Wrapper>

      <WideScreen dividerDisabled>
        <Box
          sx={{
            width: "100%",
            paddingBottom: "48.2%",
            backgroundImage: "url(/thumbs/an.png)",
            backgroundSize: "contain",
            backgroundPosition: "center",
            overflow: "hidden",
            borderRadius: "20px",
          }}
        ></Box>
      </WideScreen>
    </>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  position: relative;
  z-index: 1;

  min-height: max-content;

  padding: 0px 80px;
  gap: 50px;

  @media (max-width: 576px) {
    padding: 0px 20px;
  }

  @media (min-width: 1200px) {
    height: 100vh;
    max-height: 400px;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &,
  & * {
    text-align: center;
  }

  && div[data-type="cover"] {
    max-width: 1200px;

    &,
    & * {
      font-size: var(--font-size-1);
      font-weight: 700;
      font-family: "Euclid Circular A", sans-serif;
      font-weight: & b {
        font-weight: 700;
        font-family: Born;
      }
    }

    @media (max-width: 800px) {
      &,
      & * {
        font-size: 40px;
      }

      & {
        margin-top: 100px;
      }
    }
  }

  @media (max-width: 576px) {
    & div[data-type="divider"] {
      display: none;
    }
  }

  && div[data-type="description"] {
    &,
    & span {
      font-size: 24px;
    }

    @media (max-width: 576px) {
      &,
      & span {
        font-size: 18px;
      }

      & img {
        width: 18px;
        height: 18px;
      }
    }

    & span {
      font-weight: 700;
    }

    color: var(--text-secondary);
    font-weight: 300;
  }
`;

export default EnterpriseCover;
