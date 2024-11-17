import { Box, IconButton } from "@mui/material";
import Tree from "./blocks/tree/tree";
import NoteAddIcon from "@/components/ui/icons/note-add-icon";
import FilterLineIcon from "@/components/ui/icons/filter-line-icon";
import { useLeftSidebar } from "../../use-left-sidebar";
import { useProject } from "@/components/services/project-services/project-service/project-provider";

const Explorer = () => {
  const { projectService } = useProject();
  const { isExplorerOpen } = useLeftSidebar();

  const summaryService = projectService.summaryService;

  const createSummary = () => {
    summaryService.createSummary("");
  };

  if (!isExplorerOpen) {
    return null;
  }

  return (
    <Box
      sx={{
        height: "100%",
        minWidth: "240px",
        maxWidth: "240px",
        overflow: "auto",
        transition: "all 0.3s",
      }}
    >
      <Box
        sx={{
          height: "100%",
          borderRight: "var(--mr-border)",
          backgroundColor: "#F6F6F6",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          <IconButton onClick={createSummary}>
            <NoteAddIcon />
          </IconButton>

          <IconButton>
            <FilterLineIcon />
          </IconButton>
        </Box>

        <Tree />
      </Box>
    </Box>
  );
};

export default Explorer;
