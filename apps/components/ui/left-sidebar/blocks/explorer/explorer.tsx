import { Box, IconButton } from "@mui/material";
import Tree from "./blocks/tree/tree";
import NoteAddIcon from "@/components/ui/icons/note-add-icon";
import FolderAddIcon from "@/components/ui/icons/folder-add-icon";
import FilterLineIcon from "@/components/ui/icons/filter-line-icon";
import CommentsIcon from "@/components/ui/icons/comments-icon";
import CommentIcon from "@/components/ui/icons/comment-icon";

const Explorer = () => {
  return (
    <Box
      sx={{
        height: "100%",
        borderRight: "1px solid #e0e0e0",
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
  );
};

export default Explorer;
