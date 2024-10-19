import { Box, IconButton, Paper } from "@mui/material";
import { Logo, TitleWrapper } from "../../bar/bar";
import DynamicTitle from "../../bar/blocks/dynamic-title/dynamic-title";
import CommentsIcon from "../../icons/comments-icon";
import SettingsIcon from "../../icons/settings-icon";

const Bar = () => {
  return (
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
          }}
        >
          <Logo
            onClick={() => {
              window.location.href = "/";
            }}
          />

          <TitleWrapper style={{ width: "100%", display: "flex" }}>
            Insights Whiteboard (Beta)
          </TitleWrapper>
        </Box>

        {/* <Box sx={{ display: "flex", columnGap: "6px" }}>
          <IconButton onClick={() => true} data-active={"true"}>
            <CommentsIcon />
          </IconButton>

          <IconButton onClick={() => true} data-active={"true"}>
            <SettingsIcon />
          </IconButton>
        </Box> */}
      </Paper>
    </Box>
  );
};

export default Bar;
