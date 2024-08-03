import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import ShareIcon from "@/components/ui/icons/share-icon";
import { useAuth } from "@/components/services/app-services/auth/auth-provider";
import Avatar from "../avatar/avatar";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import CloseIcon from "@mui/icons-material/Close";

// Styled components
const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  box-shadow: 24px;
  padding: 10px;
  border-radius: 8px;
`;

const Share = () => {
  const { userMetadata } = useAuth();
  const { projectUsers } = useProject();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ display: "flex", columnGap: "9px" }}>
        <Box sx={{ display: "flex" }}>
          {projectUsers.map((projectUser, i) => (
            <Box key={i} sx={{ marginLeft: "-6px" }}>
              <Avatar username={projectUser.username} size="large" />
            </Box>
          ))}
        </Box>

        <Button
          sx={{ minWidth: "97px" }}
          color="primary"
          variant="contained"
          startIcon={<ShareIcon />}
          onClick={handleOpen}
        >
          Share
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="share-modal-title"
        aria-describedby="share-modal-description"
      >
        <ModalBox>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography id="share-modal-title" variant="h6" component="h2">
              Share this model
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "10px",
            }}
          >
            <TextField
              placeholder="Invite others by email"
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                height: "33px",
              }}
            ></TextField>

            <Button variant="contained" color="primary" size="large">
              Invite
            </Button>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2">Who has access</Typography>

            {projectUsers.map((projectUser, i) => (
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
        </ModalBox>
      </Modal>
    </>
  );
};

export default Share;
