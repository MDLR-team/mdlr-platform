import { useProject } from "@/components/services/project-services/project-service/project-provider";
import { Summary } from "@/components/services/summary-service/summary-service.types";
import FileDocumentIcon from "@/components/ui/icons/file-document-icon";
import { Box, Button } from "@mui/material";
import React from "react";
import styled from "styled-components";

const TreeItem: React.FC<{
  item: Summary;
  isActive: boolean;
}> = ({ item, isActive }) => {
  const { projectService } = useProject();
  const summaryService = projectService.summaryService;

  const handleClick = () => {
    summaryService.setActiveSummary(item.id);
  };

  return (
    <ButtonWrapper
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: isActive ? "var(--gray-2)" : "transparent",
        gap: "10px",
        alignItems: "center",
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          height: "24px",
        }}
      >
        <FileDocumentIcon />
      </Box>
      <Box
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: "100%",
          textAlign: "left",
        }}
      >
        {item.title}
      </Box>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled(Button)`
  &:hover {
    background-color: var(--gray-2) !important;
  }
`;

export default TreeItem;
