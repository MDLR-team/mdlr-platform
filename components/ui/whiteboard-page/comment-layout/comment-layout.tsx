import React from "react";
import { Box, IconButton, Paper, Divider } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CommentsIcon from "@/components/ui/icons/comments-icon";
import DocumentIcon from "../../icons/document-icon";
import ChartIcon from "../../icons/chart-icon";
import CubeIcon from "../../icons/cube-icon";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FilterListIcon from "@mui/icons-material/FilterList";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import FilterIcon from "@mui/icons-material/FilterList"; // Filter icon
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PromptSearchBar from "../../dashboard-page/comment-layout/blocks/prompt-search-bar/prompt-search-bar";
import { useAuth } from "@/components/services/app-services/auth/auth-provider";
import { Header } from "@/components/comments/comment-layout/comment-layout.styled";

const CommentsBlock: React.FC = () => {
  const { userMetadata } = useAuth();

  return (
    <>
      <Paper sx={{ flexDirection: "column" }}>
        {/* Header */}
        <Header>
          <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <IconButton>
              <CommentsIcon />
            </IconButton>

            <Box sx={{ fontSize: "14px" }}>Whiteboard Copilot</Box>
          </Box>
        </Header>

        <Header
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              maxWidth: "max-content",
              display: "flex",
              gap: "10px",
              transform: "scale(1.1) translateX(5px)",
            }}
          >
            <IconButton
              sx={{
                background: "#F3F4F6",
              }}
            >
              <DocumentIcon />
            </IconButton>

            <IconButton
              sx={{
                background: "#F3F4F6",
              }}
            >
              <ChartIcon />
            </IconButton>

            <IconButton
              sx={{
                background: "#F3F4F6",
              }}
            >
              <CubeIcon />
            </IconButton>
          </Box>

          <PromptSearchBar extended isWhiteboard />
        </Header>

        {/* Divider */}
        <Divider sx={{ margin: "15px 0" }} />

        {/* Options Section */}
        <Box sx={{ padding: "0 0px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0", // Increased padding here
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingLeft: "10px",
              }}
            >
              <PaletteOutlinedIcon sx={{ fontSize: "16px" }} />{" "}
              {/* Icon for Color */}
              <Box>Color</Box>
            </Box>
            <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
          </Box>
          <Divider />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0", // Increased padding here
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingLeft: "10px",
              }}
            >
              <StyleOutlinedIcon sx={{ fontSize: "16px" }} />{" "}
              {/* Icon for More style options */}
              <Box>More style options</Box>
            </Box>
            <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
          </Box>
          <Divider />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0", // Increased padding here
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingLeft: "10px",
              }}
            >
              <FilterIcon sx={{ fontSize: "16px" }} /> {/* Icon for Filter */}
              <Box>Filter</Box>
            </Box>
            <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
          </Box>
          <Divider />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0", // Increased padding here
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingLeft: "10px",
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: "16px" }} />{" "}
              {/* Icon for Lock database */}
              <Box>Lock database</Box>
            </Box>
            <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
          </Box>
          <Divider />
        </Box>
      </Paper>
    </>
  );
};

export default CommentsBlock;
