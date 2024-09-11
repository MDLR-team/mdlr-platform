import { Button } from "@mui/material";
import Link from "next/link";
import styled from "styled-components";

const Feedback = () => {
  return (
    <Wrapper>
      <Form>
        <h1>
          Achieve Better Results by&nbsp;Streamlining Your&nbsp;Project Workflow
          Today
        </h1>
      </Form>

      <Link href="/requestdemo">
        <Button
          sx={{
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
            Request a demo
          </span>
        </Button>
      </Link>
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

export default Feedback;
