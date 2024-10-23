import FileDocumentIcon from "@/components/ui/icons/file-document-icon";
import { Box, Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

const TreeItem: React.FC<{
  item: {
    id: string;
    label: string;
  };
}> = ({ item }) => {
  return (
    <ButtonWrapper
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "24px",
        }}
      >
        <FileDocumentIcon />
      </Box>
      <Box>{item.label}</Box>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled(Button)`
  &:hover {
    background-color: var(--gray-2) !important;
  }
`;

export default TreeItem;
