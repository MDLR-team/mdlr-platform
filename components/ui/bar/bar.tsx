import { AddOutlined, Settings } from "@mui/icons-material";
import { Box, IconButton, Paper } from "@mui/material";
import styled from "styled-components";
import SettingsIcon from "../icons/settings-icon";
import CommentsIcon from "../icons/comments-icon";

const Bar = () => {
  return (
    <Paper sx={{ alignItems: "center", justifyContent: "space-between" }}>
      <Box
        sx={{
          display: "flex",
          columnGap: "9px",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Logo
          onClick={() => {
            window.location.href = "/";
          }}
        />

        <TitleWrapper>
          <Title>Default title</Title>
        </TitleWrapper>
      </Box>

      <Box sx={{ display: "flex", columnGap: "6px" }}>
        <IconButton data-active="true">
          <CommentsIcon />
        </IconButton>

        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

const Logo = styled.div`
  position: relative;
  min-width: 27px;
  width: 27px;
  height: 100%;

  border-radius: 50%;
  background-color: #f00;

  cursor: pointer;
`;

const Title = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-weight: 500;
  font-size: 15px;
`;

const TitleWrapper = styled.div`
  border: 1px solid transparent;
  display: flex;
  overflow: hidden;

  &:hover {
    border-color: #333333;
  }
`;

export default Bar;
