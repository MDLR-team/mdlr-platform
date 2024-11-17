import React from "react";
import styled from "styled-components";
import WorkspaceItem from "../workspace-item/workspace-item";
import { Box, Button, InputBase, Paper } from "@mui/material";
import { useWorkspace } from "@/components/services/workspace-services/workspace/workspace-provider";
import Link from "next/link";
import { CatalogWrapper, Wrapper } from "../content/content";

const Content = () => {
  const { projects } = useWorkspace();

  const { setSettingsOpened, setSettingsTab } = useWorkspace();

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
              border: "0px",
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
              sx={{
                minWidth: "180px",
              }}
              disabled
            >
              New Dashboard
            </Button>
          </Box>
        </Paper>
      </Box>

      <CatalogWrapper>
        {[
          {
            id: "1282e768-7c9f-417b-8d31-a86679353284",
            created_at: "2024-08-31T12:15:40.328177+00:00",
            title: "Dashboard Demo",
            bim_id: "Kghl2PEiR6yqQKdj6EhMig",
            bim_client_id: "e7MpHGpkUFGkjOcZewzvEoMF7CYtLKzwVBz3Knf9JkciJzAk",
            bim_urn:
              "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLktnaGwyUEVpUjZ5cVFLZGo2RWhNaWc_dmVyc2lvbj0x",
            thumbnail: "/thumb/Screen_2.png",
            workspace_id: 2,
            userprojects: [
              {
                user_id: "55e96f90-2825-4d96-a630-aac141d1f343",
                username: "Charlie Wright",
              },
            ],
          },
        ].map((project, i) => (
          <WorkspaceItem key={i} data={project as any} isDashboard />
        ))}
      </CatalogWrapper>
    </Wrapper>
  );
};

export default Content;
