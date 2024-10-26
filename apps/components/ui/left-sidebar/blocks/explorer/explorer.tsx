import { Box, IconButton } from "@mui/material";
import Tree from "./blocks/tree/tree";
import NoteAddIcon from "@/components/ui/icons/note-add-icon";
import FolderAddIcon from "@/components/ui/icons/folder-add-icon";
import FilterLineIcon from "@/components/ui/icons/filter-line-icon";
import CommentsIcon from "@/components/ui/icons/comments-icon";
import CommentIcon from "@/components/ui/icons/comment-icon";
import { useLeftSidebar } from "../../use-left-sidebar";

const Explorer = () => {
  const { isExplorerOpen } = useLeftSidebar();

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
          <IconButton>
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
