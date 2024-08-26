import React from "react";
import styled from "styled-components";
import { Modal, Box, Tabs, Tab, Typography } from "@mui/material";
import { useWorkspace } from "@/components/services/workspace-services/workspace/workspace-provider";
import SettingsTab from "./blocks/settings-tab";
import MembersTab from "./blocks/members-tab";
import AccountTab from "./blocks/account-tab";

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
          & input::placeholder {
            opacity: 1;
          }
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
  const { settingsTab, setSettingsTab } = useWorkspace();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSettingsTab(newValue);
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
          value={settingsTab}
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

        <TabPanelComponent value={settingsTab} index={0}>
          <SettingsTab />
        </TabPanelComponent>

        <TabPanelComponent value={settingsTab} index={1}>
          <MembersTab />
        </TabPanelComponent>

        <TabPanelComponent value={settingsTab} index={2}>
          <AccountTab />
        </TabPanelComponent>

        <TabPanelComponent value={settingsTab} index={3}>
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
