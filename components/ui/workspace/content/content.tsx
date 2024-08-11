import React, { useState } from "react";
import styled from "styled-components";
import WorkspaceItem from "../workspace-item/workspace-item";
import {
  Box,
  Button,
  InputBase,
  Paper,
  Modal,
  Typography,
  Popper,
  IconButton,
} from "@mui/material";
import { Sync as SyncIcon } from "@mui/icons-material"; // Import the Sync icon
import { AvatarCss } from "../left-bar/left-bar";
import { useWorkspace } from "@/components/services/workspace-services/workspace/workspace-provider";
import CatalogCanvas from "../workspace-canvas/workspace-canvas";
import UploadModel from "./blocks/upload-model";
import SyncExplorer from "./blocks/sync-explorer";

const Content = () => {
  const { projects } = useWorkspace();

  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenUploadModal = () => setOpenUploadModal(true);
  const handleCloseUploadModal = () => setOpenUploadModal(false);

  const handlePopperClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "sync-popper" : undefined;

  return (
    <Wrapper>
      <Paper sx={{ opacity: 0, pointerEvents: "none" }}>
        <Box sx={{ display: "flex", gap: "9px", alignItems: "center" }}>
          <AvatarCss style={{ cursor: "pointer" }} />
        </Box>
      </Paper>

      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            p: "0px !important",
            maxWidth: "270px",
          }}
        >
          <InputBase
            sx={{
              flex: 1,
              border: "0px solid #e0e0e0",
              borderRadius: "9px",
              height: "33px",
              fontSize: "12px",
              padding: "0 10px",
            }}
            placeholder="Search..."
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>

        <Paper>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleOpenUploadModal}
            >
              Upload Model
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handlePopperClick}
              startIcon={<SyncIcon />}
            >
              Synchronise
            </Button>
          </Box>
        </Paper>
      </Box>

      <CatalogWrapper>
        <CatalogCanvas />

        {projects.map((project, i) => (
          <WorkspaceItem key={i} data={project} />
        ))}
      </CatalogWrapper>

      {/* Upload Model Modal */}
      <Modal
        open={openUploadModal}
        onClose={handleCloseUploadModal}
        aria-labelledby="upload-model-title"
        aria-describedby="upload-model-description"
      >
        <ModalContent>
          <UploadModel />
        </ModalContent>
      </Modal>

      {/* Synchronise Popper */}
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom">
        <Paper
          sx={{
            padding: 2,
            minWidth: "400px",
            maxWidth: "400px",
            overflowX: "hidden",
            overflowY: "scroll",
            maxHeight: "400px",
          }}
        >
          <SyncExplorer />
        </Paper>
      </Popper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const CatalogWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 27px;
`;

const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  border-radius: 9px;
  box-shadow: 24px;
  padding: 16px;
`;

export default Content;
