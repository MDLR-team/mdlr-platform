import styled from "styled-components";

const Feedback = () => {
  return (
    <Wrapper>
      <Form>
        <h1>We're Almost There!</h1>
        <p>
          We're currently working hard to bring you the best experience with
          MdIr. Interested in testing our features early?
          <br />
          <br />
          Don't hesitate to <u>contact us!</u>
        </p>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;

  padding: 80px 80px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
  background-color: rgb(244, 244, 248);
  padding: 60px 100px;
  justify-content: center;

  &,
  & * {
    color: black;
    font-size: 36px;
  }

  & h1 {
    font-size: 56px;
    font-weight: 700;
  }
`;

export default Feedback;
