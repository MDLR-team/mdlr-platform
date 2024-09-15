import { Box, Button } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";
import { FeatureDescription } from "../../features-cards/features-cards";

const EnterpriseFeedback = () => {
  return (
    <Wrapper>
      <Form>
        <h1>Need a Custom AEC Solution, Fast?</h1>
      </Form>

      <FeatureDescription
        style={{
          maxWidth: "800px",
          textAlign: "center",
        }}
      >
        Fill out a quick form, and we&apos;ll reach out within one business day
        to discuss how MDLR can streamline your projects.
      </FeatureDescription>

      <a
        href="https://calendly.com/mdlr-team/ai-strategy-implementation-with-mdlr"
        target="_blank"
      >
        <Button
          sx={{
            marginTop: "50px",
            width: "200px",
            height: "80px !important",
            padding: "0px 30px",
            borderRadius: "25px",
            fontSize: "24px !important",
            backgroundColor: "var(--button-primary) !important",
            color: "var(--button-text-primary) !important",
          }}
          variant="contained"
          size="large"
        >
          <span
            style={{
              color: "var(--button-text-primary) !important",
            }}
          >
            Book a Free Consultation
          </span>
        </Button>
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;

  @media (min-width: 576px) {
    padding: 80px 80px;
  }

  @media (max-width: 576px) {
    padding: 0px 20px;
  }

  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  margin-bottom: 150px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;

  &,
  & * {
    color: var(--text-primary);
    font-size: 36px;
  }

  @media (max-width: 576px) {
    &,
    & * {
      font-size: 30px !important;
    }
  }

  & h1 {
    font-size: var(--font-size-2);
    line-height: var(--line-height-1);
    text-align: center;
    max-width: 800px;

    @media (max-width: 576px) {
      font-size: 36px;
    }
  }
`;

export default EnterpriseFeedback;
