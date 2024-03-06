import { Box, Button } from "@mui/material";
import styled from "styled-components";
import ShareIcon from "@/components/ui/icons/share-icon";

const Share = () => {
  return (
    <Box sx={{ display: "flex", columnGap: "9px" }}>
      <Avatar />

      <Button
        sx={{ minWidth: "97px" }}
        color="primary"
        variant="contained"
        startIcon={<ShareIcon />}
      >
        Share
      </Button>
    </Box>
  );
};

const Avatar = styled.div`
  min-width: 36px;
  min-height: 36px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: black;
`;

export default Share;
