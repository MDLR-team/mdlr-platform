import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import styled from "styled-components";
import ShareIcon from "@/components/ui/icons/share-icon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // Import the copy icon
import { useAuth } from "@/components/services/app-services/auth/auth-provider";
import Avatar from "../avatar/avatar";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import CloseIcon from "@mui/icons-material/Close";
import MembersTab from "@/components/ui/workspace/left-bar/blocks/settings-modal/blocks/members-tab";
import { TabPanel } from "@/components/ui/workspace/left-bar/blocks/settings-modal/settings-modal";
import { useRouter } from "next/router";

// Styled components
const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 24px;
  padding: 0px 20px 20px 20px;
  border-radius: 8px;
`;

const Share = () => {
  const { userMetadata } = useAuth();
  const { projectUsers } = useProject();
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCopyLink = () => {
    const shareableLink = `${window.location.origin}${router.asPath}`;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        console.log("Link copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

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
          <TabPanel>
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    id="share-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    Share this model
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      gap: "6px",
                      alignItems: "center",
                      cursor: "pointer",
                      color: "primary.main", // Use your theme's primary color
                    }}
                    onClick={handleCopyLink}
                  >
                    <ContentCopyIcon />
                    <Typography
                      id="share-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Copy link
                    </Typography>

                    <IconButton onClick={handleClose}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Divider />
              </Box>

              <MembersTab />
            </div>
          </TabPanel>
        </ModalBox>
      </Modal>
    </>
  );
};

export default Share;
