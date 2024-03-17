import { Box, Button, IconButton, Paper } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import styled from "styled-components";
import { useAuth } from "@/components/services/app-services/auth/auth-provider";
import WorkspaceIcon from "../../icons/workspace-icon";
import stc from "string-to-color";

const LeftBar = () => {
  const menuItems = ["Personal", "Favourites", "Shared", "Recent", "Trash"];
  const workspaceIcons = ["Workspace #1", "Workspace #2", "Workspace #3"];

  const { userMetadata } = useAuth();

  return (
    <>
      <Paper sx={{ backgroundColor: "transparent" }}>
        <Box sx={{ display: "flex", gap: "9px", alignItems: "center" }}>
          <AvatarCss style={{ cursor: "pointer" }} />

          <Box>{userMetadata?.email}</Box>
        </Box>
      </Paper>

      <Paper
        title="Workspaces"
        sx={{ flexDirection: "column", gap: "3px !important" }}
      >
        <MenuWrapper>
          {menuItems.map((item, i) => (
            <Box sx={{ width: "100%" }} key={i}>
              <Button
                color="secondary"
                sx={{
                  width: "100%",
                  justifyContent: "flex-start",
                  textTransform: "none",
                }}
                startIcon={<MailIcon />}
              >
                {item}
              </Button>
            </Box>
          ))}
        </MenuWrapper>
      </Paper>

      <Paper title="Workspaces" sx={{ flexDirection: "column" }}>
        <WidgetHeader>
          <IconButton>
            <WorkspaceIcon />
          </IconButton>

          <Box style={{ fontWeight: "500" }}>Workspaces</Box>
        </WidgetHeader>

        <MenuWrapper>
          {workspaceIcons.map((item, i) => (
            <Box sx={{ width: "100%", paddingLeft: "16px" }} key={i}>
              <Button
                color="secondary"
                sx={{
                  width: "100%",
                  justifyContent: "flex-start",
                  textTransform: "none",
                }}
                startIcon={<CircleIcon color={stc(i)} />}
              >
                {item}
              </Button>
            </Box>
          ))}
        </MenuWrapper>

        <Button variant="contained" color="primary" size="large">
          + New workspace
        </Button>
      </Paper>
    </>
  );
};

const CircleIcon = styled.div<{ color: string }>`
  min-width: 6px;
  width: 6px;
  height: 6px;
  min-height: 6px;

  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 3px;

  &&&&& {
    &,
    & * {
      font-size: 12px;
      color: #333333;
    }
  }
`;

const WidgetHeader = styled.div`
  display: flex;
  align-items: center;

  column-gap: 10px;
`;

export const AvatarCss = styled.div`
  min-width: 36px;
  width: 36px;
  height: 100%;
  position: relative;
  border-radius: 13.5px;
  background-color: #333333;
  height: 36px;
`;

export default LeftBar;
