import { Button } from "@mui/material";
import styled from "styled-components";

const Feedback = () => {
  return (
    <Wrapper>
      <Form>
        <h1>Add collaboration to your project today!</h1>
      </Form>

      <Button
        sx={{
          width: "200px",
          height: "80px !important",
          padding: "0px 30px",
          borderRadius: "25px",
          fontSize: "24px !important",
          backgroundColor: "white !important",
          color: "black !important",
        }}
        variant="contained"
      >
        <span
          style={{
            color: "black !important",
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
  width: 100%;
  display: flex;

  padding: 80px 80px;
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
    color: black;
    font-size: 36px;
  }

  & h1 {
    font-size: 56px;
    text-align: center;
    max-width: 800px;
  }
`;

export default Feedback;
