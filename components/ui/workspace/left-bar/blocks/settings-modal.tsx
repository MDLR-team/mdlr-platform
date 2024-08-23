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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(Box)`
  background-color: white;
  padding: 24px;
  outline: none;
  min-width: 500px;
  border-radius: 8px;
`;

const TabPanel = styled.div`
  padding-top: 16px;
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
        >
          <Tab label="Settings" />
          <Tab label="Members" />
          <Tab label="Account" />
          <Tab label="Billing" />
        </Tabs>

        <TabPanelComponent value={tabValue} index={0}>
          <Typography variant="h6">Settings</Typography>
          <TextField
            label="Workspace Name"
            defaultValue="ilia's Workspace"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button startIcon={<DeleteIcon />} color="error" variant="contained">
            Delete Workspace
          </Button>
        </TabPanelComponent>

        <TabPanelComponent value={tabValue} index={1}>
          <Typography variant="h6">Members</Typography>
          <TextField
            label="Search username or email"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button variant="contained" style={{ marginBottom: "16px" }}>
            Send
          </Button>
          <Typography variant="body1">ilia (Owner)</Typography>
        </TabPanelComponent>

        <TabPanelComponent value={tabValue} index={2}>
          <Typography variant="h6">Account</Typography>
          <TextField
            label="Name"
            defaultValue="ilia"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button startIcon={<LogoutIcon />} color="error" variant="contained">
            Log Out
          </Button>
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
