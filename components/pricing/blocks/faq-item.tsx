import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQBlock = styled.div`
  margin-bottom: 20px;
`;

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <FAQBlock>
      <Typography variant="h6">{question}</Typography>
      <Typography variant="body1">{answer}</Typography>
    </FAQBlock>
  );
};

export default FAQItem;
