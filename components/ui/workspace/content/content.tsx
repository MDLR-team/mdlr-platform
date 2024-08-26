import React, { useState } from "react";
import styled from "styled-components";
import WorkspaceItem from "../workspace-item/workspace-item";
import { Box, Button, InputBase, Paper } from "@mui/material";
import { useWorkspace } from "@/components/services/workspace-services/workspace/workspace-provider";
import Link from "next/link";

const Content = () => {
  const { projects } = useWorkspace();

  const { setSettingsOpened, setSettingsTab } = useWorkspace();

  const handlePopperClick = (event: any) => {
    setSettingsOpened(true);
    setSettingsTab(1);
  };

  return (
    <Wrapper>
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
              color="secondary"
              size="large"
              onClick={handlePopperClick}
            >
              Invite Members
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Link href="/workspace/new-model">
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  minWidth: "180px",
                }}
              >
                New Model
              </Button>
            </Link>
          </Box>
        </Paper>
      </Box>

      <CatalogWrapper>
        {/*  <CatalogCanvas /> */}

        {projects.map((project, i) => (
          <WorkspaceItem key={i} data={project} />
        ))}
      </CatalogWrapper>
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
