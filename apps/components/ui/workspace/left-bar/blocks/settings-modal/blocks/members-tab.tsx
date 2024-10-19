import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Avatar from "@/components/layout/avatar/avatar";
import { useWorkspace } from "@/components/services/workspace-services/workspace/workspace-provider";

const MembersTab: React.FC = () => {
  const { workspaceUsers, activeWorkspace, workspaceService } = useWorkspace();
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddUser = async () => {
    if (!searchInput.trim()) {
      setErrorMessage("Please enter a username or email.");
      return;
    }

    if (!activeWorkspace) {
      setErrorMessage("No active workspace selected.");
      return;
    }

    const error = await workspaceService.addUserToWorkspace(
      activeWorkspace.id,
      searchInput.trim()
    );

    if (error) {
      setErrorMessage(error);
    } else {
      setErrorMessage(null);
      setSearchInput("");
      // Optionally refresh the list of users in the workspace
    }
  };

  return (
    <>
      <Box data-type="section">
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
          <TextField
            placeholder="Search username or email"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            fullWidth
            size="small"
            margin="normal"
            variant="outlined"
            error={!!errorMessage}
            helperText={errorMessage}
          />

          <Button variant="contained" onClick={handleAddUser}>
            Send
          </Button>
        </Box>
      </Box>

      <Box data-type="section">
        <Box data-type="header">
          <Box>Type in emails above, separated by comma.</Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            width: "100%",
          }}
        >
          {workspaceUsers.map((projectUser, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Avatar username={projectUser.username} size="large" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {projectUser.username}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default MembersTab;
