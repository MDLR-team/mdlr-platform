import { Box, IconButton, Paper } from "@mui/material";
import { Logo, TitleWrapper } from "../../bar/bar";

import SettingsIcon from "../../icons/settings-icon";
import CommentsIcon from "../../icons/comments-icon";

const Bar = () => {
  return (
    <>
      <Box sx={{ position: "relative" }}>
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
              Dashboard page
            </TitleWrapper>
          </Box>

          <Box sx={{ display: "flex", columnGap: "6px" }}>
            <IconButton
              onClick={() => {}}
              data-active={false ? "true" : "false"}
            >
              <CommentsIcon />
            </IconButton>

            <IconButton
              onClick={() => {}}
              data-active={false ? "true" : "false"}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Bar;
