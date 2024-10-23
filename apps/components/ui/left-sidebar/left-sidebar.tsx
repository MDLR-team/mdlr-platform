import { Box } from "@mui/material";
import NoteArea from "./blocks/note-area/note-area";
import NavBar from "./blocks/nav-bar/nav-bar";
import Explorer from "./blocks/explorer/explorer";
import Split from "react-split";

const LeftSidebar = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        maxHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        pointerEvents: "all",
        backgroundColor: "white",
        borderRight: "1px solid #e0e0e0",
      }}
    >
      <NavBar />

      <Box
        sx={{
          position: "relative",
          display: "flex",
          height: "100%",
          maxHeight: "100%",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Box
          sx={{
            height: "100%",
            minWidth: "240px",
            maxWidth: "240px",
            overflow: "auto",
          }}
        >
          <Explorer />
        </Box>
        
        <Box sx={{ height: "100%", maxHeight: "100%", overflow: "hidden" }}>
          <NoteArea />
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSidebar;
