import React, { useState } from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";

const StyledTabs = styled(Box)`
  background-color: #222;
  color: white;

  height: 100%;
  min-width: max-content;

  display: flex;
  align-items: center;

  & > * {
    border-right: 1px solid #444;
    padding: 6px 16px;
    height: 100%;

    display: flex;
    align-items: center;
  }

  & > *:first-child {
    background-color: white;
    &,
    & * {
      color: black !important;
    }
  }

  .MuiTab-root {
    text-transform: none;
    min-width: 120px;

    color: white;
    display: flex;
    align-items: center;
    gap: 8px;

    &.Mui-selected {
      background-color: #444;
      color: white;
    }
  }
`;

const StyledTab = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  .MuiTab-iconWrapper {
    margin-right: 8px;
  }
`;

const TabsComponent: React.FC = () => {
  const [value, setValue] = useState(0);
  const [tabs, setTabs] = useState([
    { id: 1, label: "Seaport-Ci...", icon: <PanelIcon icon="/icons/a1.svg" /> },
    { id: 2, label: "Dashboard 1", icon: <PanelIcon icon="/icons/a2.svg" /> },
    { id: 3, label: "Whiteboard 1", icon: <PanelIcon icon="/icons/a3.svg" /> },
    { id: 4, label: "Mytin 3", icon: <PanelIcon icon="/icons/a1.svg" /> },
  ]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAddTab = () => {
    const newTab = {
      id: tabs.length + 1,
      label: `New Tab ${tabs.length + 1}`,
      icon: <HomeIcon />,
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setValue(tabs.length); // Focus on the new tab
  };

  return (
    <StyledTabPanel
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#222",
        minHeight: "48px",
      }}
    >
      <StyledTabs>
        <Box>
          <IconButton sx={{ color: "white" }}>
            <HomeIcon />
          </IconButton>
        </Box>

        {tabs.map((tab, index) => (
          <StyledTab key={tab.id} className="MuiTab-root">
            <Box>{tab.icon}</Box>
            <Box>{tab.label}</Box>
          </StyledTab>
        ))}

        <Box>
          <IconButton sx={{ color: "white" }} onClick={handleAddTab}>
            <AddIcon />
          </IconButton>
        </Box>
      </StyledTabs>
    </StyledTabPanel>
  );
};

const StyledTabPanel = styled(Box)`
  pointer-events: all;

  & > * {
    height: 100%;
  }

  & {
    & * {
      color: white !important;
    }
  }
`;

const PanelIcon = styled.div<{
  icon: string;
}>`
  width: 18px;
  height: 18px;
  background-image: url(${(props) => props.icon});
  background-size: cover;
  background-position: center;
  opacity: 0.5;
`;

export default TabsComponent;
