import React, { useState } from "react";
import styled from "styled-components";
import {
  Modal,
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Avatar from "@/components/layout/avatar/avatar";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(Box)`
  background-color: white;
  padding: 24px;
  outline: none;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`;

const TabPanel = styled.div`
  padding-top: 16px;

  width: 400px;
  height: 400px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;

    &,
    & * {
      font-size: 14px;
    }

    & div[data-type="section"] {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;

      & div[data-type="header"] {
        display: flex;
        flex-direction: column;
        gap: 6px;

        h6 {
          font-weight: 700;
        }
      }

      & .MuiFormControl-root {
        margin: 0;

        & .MuiInputBase-root {
          height: 32px;
        }
      }
    }
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanelComponent({ children, value, index }: TabPanelProps) {
  return (
    <TabPanel role="tabpanel" hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </TabPanel>
  );
}

const SettingsModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="settings-modal-title"
      aria-describedby="settings-modal-description"
    >
      <ModalContent>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="settings tabs"
          sx={{
            maxWidth: "max-content",
          }}
        >
          <Tab label="Settings" />
          <Tab label="Members" />
          <Tab label="Account" />
        </Tabs>

        <TabPanelComponent value={tabValue} index={0}>
          <Box data-type="section">
            <Box data-type="header">
              <Typography variant="h6">Workspace Name</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <TextField
                defaultValue="ilia's Workspace"
                fullWidth
                size="small"
                margin="normal"
                variant="outlined"
              />

              <Button variant="contained">Rename</Button>
            </Box>
          </Box>

          <Divider />

          <Box data-type="section">
            <Box data-type="header">
              <Typography variant="h6">Delete Workspace</Typography>
              <Box>
                This action will delete all the data within this Workspace.
              </Box>
            </Box>

            <Button
              startIcon={<DeleteIcon />}
              color="error"
              variant="contained"
              sx={{ maxWidth: "max-content" }}
            >
              Delete Workspace
            </Button>
          </Box>
        </TabPanelComponent>

        <TabPanelComponent value={tabValue} index={1}>
          <Box data-type="section">
            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <TextField
                placeholder="Search username or email"
                fullWidth
                size="small"
                margin="normal"
                variant="outlined"
              />

              <Button variant="contained">Send</Button>
            </Box>
          </Box>

          <Box data-type="section">
            <Box data-type="header">
              <Box>Type in emails above, separated by comma.</Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                width: "100%",
              }}
            >
              {[{ username: "Dony MMArk" }].map((projectUser, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Avatar username={projectUser.username} size="large" />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {projectUser.username}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </TabPanelComponent>

        <TabPanelComponent value={tabValue} index={2}>
          <Box data-type="section">
            <Box data-type="header">
              <Typography variant="h6">Image</Typography>
            </Box>

            <Avatar username={"ADSD"} size="large" />

            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              Upload a custom image
            </Box>
          </Box>

          <Box data-type="section">
            <Box data-type="header">
              <Typography variant="h6">Name</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <TextField
                defaultValue="ilia"
                fullWidth
                size="small"
                margin="normal"
                variant="outlined"
              />

              <Button variant="contained">Rename</Button>
            </Box>
          </Box>

          <Divider />

          <Box data-type="section">
            <Box data-type="header">
              <Typography variant="h6">Log Out</Typography>
              <Box>
                This action allows you to log out your current account. You can
                access again whenever you want.
              </Box>
            </Box>

            <Button
              startIcon={<LogoutIcon />}
              color="error"
              variant="contained"
              sx={{ maxWidth: "max-content" }}
            >
              Log Out
            </Button>
          </Box>
        </TabPanelComponent>

        <TabPanelComponent value={tabValue} index={3}>
          <Typography variant="h6">Billing</Typography>
          <Typography variant="body1">
            Billing information and options will go here.
          </Typography>
        </TabPanelComponent>
      </ModalContent>
    </StyledModal>
  );
};

export default SettingsModal;
