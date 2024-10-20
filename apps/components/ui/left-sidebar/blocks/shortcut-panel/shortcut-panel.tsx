import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";

const Panel = styled(Box)({
  width: "50px",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  borderRight: "1px solid #e0e0e0",
  padding: "10px 0",
});

const IconWrapper = styled(Box)({
  margin: "10px 0",
  cursor: "pointer",
});

const ShortcutPanel = () => {
  return (
    <Panel>
      <IconWrapper>
        <HomeIcon />
      </IconWrapper>
      <IconWrapper>
        <SettingsIcon />
      </IconWrapper>
      <IconWrapper>
        <InfoIcon />
      </IconWrapper>
    </Panel>
  );
};

export default ShortcutPanel;
