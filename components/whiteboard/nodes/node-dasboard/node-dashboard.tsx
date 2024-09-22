import EditGroup from "@/components/dashboard-viewer/blocks/edit-group/edit-group";
import { Box } from "@mui/material";
import React from "react";
import { Handle, Position } from "reactflow";
import styled from "styled-components";
import { EditLabel } from "../node-delivery/node-delivery";

const NodeDashboard = (props: any) => {
  const type = props.data.type;

  const title = type === "d-1" ? "Project Pulse" : "Milestone Overview";

  return (
    <>
      <div className="text-updater-node">
        <Handle type="target" position={Position.Left} isConnectable={true} />

        <EditGroup>
          <Wrapper>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "flex-start",
                gap: "10px",
                padding: "0px",
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  background: "white",
                  borderRadius: "9px",
                  backgroundImage: `url("/thumb/Screen_2.png")`,
                  backgroundSize: "cover",
                }}
              ></Box>

              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <EditLabel>{title}</EditLabel>

                <Box sx={{ fontSize: "18px" }}>Updated 1 min ago</Box>
              </Box>
            </Box>
          </Wrapper>
        </EditGroup>

        <Handle
          type="source"
          position={Position.Right}
          id="b"
          isConnectable={true}
        />
      </div>
    </>
  );
};

const Wrapper = styled.div`
  width: 420px;
  height: 300px;
  background: #f7c36c;
  border: 2px solid black;
  border-radius: 9px;

  padding: 10px;
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

export default NodeDashboard;
