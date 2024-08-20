import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface FeatureItemProps {
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <CheckCircleIcon color="primary" />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default FeatureItem;
