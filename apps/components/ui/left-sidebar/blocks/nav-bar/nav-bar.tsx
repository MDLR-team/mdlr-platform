import BookmarkIcon from "@/components/ui/icons/bookmark-icon";
import FolderIcon from "@/components/ui/icons/folder-icon";
import SearchIcon from "@/components/ui/icons/search-icon";
import SidebarIcon from "@/components/ui/icons/sidebar-icon";
import { Box, IconButton } from "@mui/material";

const NavBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "45px",
        minHeight: "45px",
        backgroundColor: "#FCFCFC",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Box
        sx={{
          minWidth: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SidebarIcon />
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          paddingLeft: "10px",
          pointerEvents: "all",
        }}
      >
        <IconButton data-active="active">
          <FolderIcon />
        </IconButton>

        <IconButton>
          <SearchIcon />
        </IconButton>

        <IconButton>
          <BookmarkIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NavBar;
