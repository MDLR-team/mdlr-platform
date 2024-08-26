import React, { useState } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useWorkspace } from "@/components/services/workspace-services/workspace/workspace-provider";

const SettingsTab = () => {
  const { activeWorkspace, workspaceService } = useWorkspace();

  // State for the new workspace name
  const [newWorkspaceName, setNewWorkspaceName] = useState(
    activeWorkspace?.name || ""
  );

  const handleRenameWorkspace = async () => {
    if (activeWorkspace?.id && newWorkspaceName.trim() !== "") {
      await workspaceService.renameWorkspace(
        activeWorkspace.id,
        newWorkspaceName
      );
    }
  };

  return (
    <>
      <Box data-type="section">
        <Box data-type="header">
          <Typography variant="h6">Workspace Name</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <TextField
            placeholder={activeWorkspace?.name}
            value={newWorkspaceName}
            onChange={(e) => setNewWorkspaceName(e.target.value)}
            fullWidth
            size="small"
            margin="normal"
            variant="outlined"
          />

          <Button
            variant="contained"
            onClick={handleRenameWorkspace}
            disabled={!newWorkspaceName.trim()}
          >
            Rename
          </Button>
        </Box>
      </Box>

      <Divider />

      <Box data-type="section">
        <Box data-type="header">
          <Typography variant="h6">Delete Workspace</Typography>
          <Box>This action will delete all the data within this Workspace.</Box>
        </Box>

        <Button
          startIcon={<DeleteIcon />}
          color="error"
          variant="contained"
          sx={{ maxWidth: "max-content" }}
        >
          Delete Workspace
        </Button>
      </Box>
    </>
  );
};

export default SettingsTab;
