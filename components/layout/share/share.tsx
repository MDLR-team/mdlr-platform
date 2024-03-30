import { Box, Button } from "@mui/material";
import styled from "styled-components";
import ShareIcon from "@/components/ui/icons/share-icon";
import { useAuth } from "@/components/services/app-services/auth/auth-provider";
import Avatar from "../avatar/avatar";

const Share = () => {
  const { userMetadata } = useAuth();

  return (
    <Box sx={{ display: "flex", columnGap: "9px" }}>
      <Avatar size={"large"} username={userMetadata!.username as string} />

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

export default Share;
