import React, { useState } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@/components/layout/avatar/avatar";
import { useAuth } from "@/components/services/app-services/auth/auth-provider";

const AccountTab = () => {
  const { authService, userMetadata } = useAuth();

  // State for the new workspace name
  const [newUsername, setNewUsername] = useState(userMetadata?.username || "");

  const handleRenameUser = async () => {
    if (newUsername.trim() !== "") {
      await authService.renameUser(newUsername);
    }
  };

  return (
    <>
      <Box data-type="section">
        <Box data-type="header">
          <Typography variant="h6">Image</Typography>
        </Box>

        <Avatar username={userMetadata?.username || ""} size="large" />

        {/*  <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          Upload a custom image
        </Box> */}
      </Box>

      <Box data-type="section">
        <Box data-type="header">
          <Typography variant="h6">Name</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <TextField
            placeholder={userMetadata?.username}
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            fullWidth
            size="small"
            margin="normal"
            variant="outlined"
          />

          <Button
            variant="contained"
            onClick={handleRenameUser}
            disabled={!newUsername.trim()}
          >
            Rename
          </Button>
        </Box>
      </Box>

      <Divider />

      <Box data-type="section">
        <Box data-type="header">
          <Typography variant="h6">Log Out</Typography>
          <Box>
            This action allows you to log out your current account. You can
            access again whenever you want.
          </Box>
        </Box>

        <Button
          startIcon={<LogoutIcon />}
          color="error"
          variant="contained"
          sx={{ maxWidth: "max-content" }}
          onClick={() => authService.logOut()}
        >
          Log Out
        </Button>
      </Box>
    </>
  );
};

export default AccountTab;
