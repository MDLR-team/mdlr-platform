import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Menu,
  MenuItem,
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  Badge,
  Chip,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import SettingsModal from "./blocks/settings-modal";

const SidebarContainer = styled.div`
  height: 100%;
  background-color: white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-right: 1px solid #e0e0e0;

  & .MuiButtonBase-root:hover {
    background-color: #dfdfdf;
  }
`;

const WorkspaceButton = styled(Button)`
  width: 100%;
  justify-content: space-between;
  text-transform: none;

  &,
  & * {
    font-size: 14px;
  }
`;

const PanelButton = styled(Button)`
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: flex-start !important;
  text-transform: none;

  & .MuiChip-root {
    opacity: 0;
  }

  &:hover .MuiChip-root {
    opacity: 1;
  }

  &[data-disabled="true"] {
    &:hover {
      cursor: not-allowed;
      background-color: white;
    }
  }

  &[data-active="true"] {
    background-color: #dfdfdf;
  }
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(Box)`
  background-color: white;
  padding: 24px;
  outline: none;
  min-width: 300px;
  border-radius: 8px;
`;

const PanelIcon = styled.div<{
  icon: string;
}>`
  width: 18px;
  height: 18px;
  background-image: url(${(props) => props.icon});
  background-size: cover;
  background-position: center;
  filter: grayscale(100%) brightness(0);
`;

const LeftBar2: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleWorkspaceClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleWorkspaceClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsOpen = () => {
    setIsSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
  };

  return (
    <SidebarContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
        }}
      >
        <WorkspaceButton
          onClick={handleWorkspaceClick}
          startIcon={
            <Box
              sx={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "black",
              }}
            ></Box>
          }
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Box>ilia&apos;s Workspace</Box>
            </Box>

            <KeyboardArrowDownIcon />
          </Box>
        </WorkspaceButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleWorkspaceClose}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: "225px",
            }}
          >
            <MenuItem
              sx={{
                display: "flex",
                gap: "6px",
              }}
              onClick={handleWorkspaceClose}
            >
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "black",
                }}
              ></Box>
              Workspace 1
            </MenuItem>
            <MenuItem
              sx={{
                display: "flex",
                gap: "6px",
              }}
              onClick={handleWorkspaceClose}
            >
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "black",
                }}
              ></Box>
              Workspace 2
            </MenuItem>
            <MenuItem
              sx={{
                display: "flex",
                gap: "6px",
              }}
              onClick={handleWorkspaceClose}
            >
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "black",
                }}
              ></Box>
              Workspace 3
            </MenuItem>

            <Divider />

            <MenuItem
              sx={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
              }}
              onClick={handleWorkspaceClose}
            >
              <AddIcon
                sx={{
                  fontSize: "18px !important",
                }}
              />
              Create New Workspace
            </MenuItem>
          </Box>
        </Menu>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {" "}
          <PanelButton
            data-active="true"
            startIcon={<PanelIcon icon="/icons/a1.svg" />}
          >
            3D Viewer
          </PanelButton>
          <PanelButton
            data-disabled="true"
            startIcon={<PanelIcon icon="/icons/a3.svg" />}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Whiteboards{" "}
            <Chip sx={{ marginLeft: "5px" }} label="Coming Soon" size="small" />
          </PanelButton>
          <PanelButton
            data-disabled="true"
            startIcon={<PanelIcon icon="/icons/a2.svg" />}
          >
            Dashboards{" "}
            <Chip sx={{ marginLeft: "5px" }} label="Coming Soon" size="small" />
          </PanelButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          width: "100%",
        }}
      >
        {/* <Box
          sx={{
            backgroundColor: "#f9e05e4d",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #f9e05e",
            display: "flex",
            flexDirection: "column",
            marginBottom: "24px",
          }}
        >
          <Box>Unlock more features with a Pro Plan</Box>
          <Button variant="contained" color="primary" sx={{ marginTop: "8px" }}>
            Upgrade to Pro
          </Button>
        </Box> */}

        <PanelButton onClick={handleSettingsOpen} startIcon={<SettingsIcon />}>
          Settings
        </PanelButton>
        {<PanelButton startIcon={<PersonIcon />}>Billing</PanelButton>}
      </Box>

      <SettingsModal open={isSettingsOpen} onClose={handleSettingsClose} />
    </SidebarContainer>
  );
};

export default LeftBar2;
