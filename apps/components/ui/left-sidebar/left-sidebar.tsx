import { Box } from "@mui/material";
import NoteArea from "./blocks/note-area/note-area";
import NavBar from "./blocks/nav-bar/nav-bar";
import Explorer from "./blocks/explorer/explorer";
import Split from "react-split";

const LeftSidebar = () => {
  return (
    <Box
      sx={{
        height: "100%",
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
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <Split
          sizes={[30, 70]} // initial split percentage between Explorer and NoteArea
          minSize={200} // minimum size of each panel in pixels
          gutterSize={5} // size of the draggable area (resizer)
          gutterAlign="center"
          direction="horizontal"
          style={{ display: "flex", width: "100%", height: "100%" }}
        >
          <Box sx={{ height: "100%", overflow: "auto" }}>
            <Explorer />
          </Box>
          <Box sx={{ height: "100%", overflow: "auto" }}>
            <NoteArea />
          </Box>
        </Split>
      </Box>
    </Box>
  );
};

export default LeftSidebar;
