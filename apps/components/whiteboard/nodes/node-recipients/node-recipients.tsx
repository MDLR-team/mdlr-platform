import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  AvatarGroup,
} from "@mui/material";
import { Handle, Position } from "reactflow";
import styled from "styled-components";
import { useState } from "react";
import EditGroup from "@/components/dashboard-viewer/blocks/edit-group/edit-group";
import Avatar from "@/components/layout/avatar/avatar";
import {
  EditBox,
  EditBox2,
  EditIcon,
  EditLabel,
  EditList,
} from "../node-delivery/node-delivery";

const roles = ["Manager", "Developer", "Tester"]; // Define roles

const NodeRecipients = ({ data }: any) => {
  const type = data.type;

  const workspaceUsers =
    type === "r-1"
      ? [
          { username: "N 10" },
          { username: "J Z" },
          { username: "M M" },
          { username: "W N" },
          { username: "M A" },
        ]
      : [
          { username: "Mark Kabeerski" },
          { username: "John Doe" },
          { username: "Jane Doe" },
          { username: "John Doe" },
          { username: "Jane Doe   " },
          { username: "Jane Doe" },
          { username: "John Doe" },
          { username: "Jane Doe   " },
        ];

  const role = type === "r-1" ? "Project Leads" : "External Consultants";

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} isConnectable={true} />

      <EditGroup>
        <Wrapper>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "flex-start",
              gap: "40px",
              padding: "10px",
            }}
          >
            <EditBox>
              <EditBox2>
                <EditLabel>Recipient(s)</EditLabel>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  {/* Display list of recipients */}
                  <AvatarGroup max={100}>
                    {workspaceUsers
                      .filter((_, i) => i <= 2)
                      .map((userproject, i) => (
                        <Avatar
                          key={i}
                          username={userproject?.username || ""}
                          size={"xxl"}
                        />
                      ))}

                    {workspaceUsers.length > 3 && (
                      <Avatar
                        username={`+${workspaceUsers.length - 3}`}
                        size={"xxl"}
                        isCount
                      />
                    )}
                  </AvatarGroup>
                </Box>
              </EditBox2>

              <EditBox2>
                <EditLabel>Role</EditLabel>

                <EditList>
                  <EditIcon type={1} />
                  {role}
                </EditList>
              </EditBox2>
            </EditBox>
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
  );
};

const Wrapper = styled.div`
  width: 420px;
  max-height: max-content;
  background: white;
  border: 2px solid black;
  border-radius: 9px;

  padding: 10px;
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

export default NodeRecipients;
