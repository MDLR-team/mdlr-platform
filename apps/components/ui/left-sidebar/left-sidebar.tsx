import { Box } from "@mui/material";
import NoteArea from "./blocks/note-area/note-area";
import NavBar from "./blocks/nav-bar/nav-bar";
import Explorer from "./blocks/explorer/explorer";
import { LeftSidebarProvider } from "./use-left-sidebar";

const LeftSidebar = () => {
  return (
    <LeftSidebarProvider>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          pointerEvents: "all",
          padding: "var(--mr-gap-m) 0px var(--mr-gap-m) var(--mr-gap-m)",
          zIndex: 2,
          transition: "all 0.3s",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            maxHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            border: "var(--mr-border)",
            borderRadius: "var(--mr-border-radius)",
            boxShadow: "var(--shadow)",
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
            <Explorer />

            <Box
              sx={{
                width: "100%",
                height: "100%",
                minWidth: "350px",
                maxHeight: "100%",
                overflow: "hidden",
              }}
            >
              <NoteArea />
            </Box>
          </Box>
        </Box>
      </Box>
    </LeftSidebarProvider>
  );
};

export default LeftSidebar;
