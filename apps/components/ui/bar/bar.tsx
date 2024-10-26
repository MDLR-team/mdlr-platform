import { AddOutlined, Settings } from "@mui/icons-material";
import { Box, IconButton, Paper } from "@mui/material";
import styled from "styled-components";
import SettingsIcon from "../icons/settings-icon";
import CommentsIcon from "../icons/comments-icon";
import SettingsPanel from "./blocks/settings-panel/settings-panel";
import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";
import DynamicTitle from "./blocks/dynamic-title/dynamic-title";
import NoteIcon from "../icons/note-icon";

const Bar = () => {
  const {
    globalStatesService,
    isSettingsPanelOpen,
    isCommentsPanelOpen,
    isNotePanelOpen,
  } = useGlobalStates();

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <SettingsPanel />

        <Paper sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              columnGap: "9px",
              height: "100%",
              alignItems: "center",
              position: "relative",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Logo
              onClick={() => {
                window.location.href = "/";
              }}
            />

            <TitleWrapper style={{ width: "100%", display: "flex" }}>
              <DynamicTitle />
            </TitleWrapper>
          </Box>

          <Box sx={{ display: "flex", columnGap: "var(--mr-gap-m)" }}>
            <IconButton
              onClick={() => globalStatesService.toggleCommentsPanel()}
              data-active={isCommentsPanelOpen ? "true" : "false"}
              sx={{
                transform: "scale(var(--mr-icon-scale))",
              }}
            >
              <Box
                sx={{
                  transform: "scale(1.1)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CommentsIcon />
              </Box>
            </IconButton>

            <IconButton
              onClick={() => globalStatesService.toggleNotePanel()}
              data-active={isNotePanelOpen ? "true" : "false"}
              sx={{
                transform: "scale(var(--mr-icon-scale))",
              }}
            >
              <NoteIcon />
            </IconButton>

            <IconButton
              onClick={() => globalStatesService.toggleSettingsPanel()}
              data-active={isSettingsPanelOpen ? "true" : "false"}
              sx={{
                transform: "scale(var(--mr-icon-scale))",
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export const Logo = styled.div`
  position: relative;
  min-width: 27px;
  width: 27px;
  height: 27px;

  border-radius: 50%;
  background-color: #f00;

  cursor: pointer;
`;

export const TitleWrapper = styled.div`
  border: 1px solid transparent;
  display: flex;
  overflow: hidden;

  &:hover {
    border-color: #333333;
  }
`;

export default Bar;
