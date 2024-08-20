import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  Box,
} from "@mui/material";
import styled from "styled-components";
import FeatureItem from "./feature-item";
import {
  FeatureDescription,
  FeatureTitle,
} from "@/components/about/features-cards/features-cards";

interface PriceCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
}

const PricingCard = styled(Card)`
  border-radius: 15px;
`;

const PriceTag = styled(Typography)`
  font-size: 1.5rem;
  font-weight: bold;

  margin-top: 20px;
`;

const PriceCard: React.FC<PriceCardProps> = ({
  title,
  description,
  price,
  features,
  buttonText,
}) => {
  return (
    <PricingCard>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FeatureTitle>{title}</FeatureTitle>
          <FeatureDescription>{description}</FeatureDescription>
        </Box>

        <PriceTag>{price}</PriceTag>
        <List>
          {features.map((feature, index) => (
            <FeatureItem key={index} text={feature} />
          ))}
        </List>
        <Button variant="contained" color="primary" fullWidth>
          {buttonText}
        </Button>
      </CardContent>
    </PricingCard>
  );
};

export default PriceCard;
