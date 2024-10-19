import EditGroup from "@/components/dashboard-viewer/blocks/edit-group/edit-group";
import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import styled from "styled-components";
import { EditLabel } from "./node-delivery/node-delivery";

const NodeThumbnail = ({ data }: any) => {
  const type = data.type;

  return (
    <>
      <div className="text-updater-node">
        <Handle type="target" position={Position.Left} isConnectable={true} />

        <EditGroup>
          <Wrapper
            style={
              type !== "v-1"
                ? {}
                : {
                    backgroundColor: "rgb(178 207 233)",
                  }
            }
          >
            {type !== "v-1" && (
              <Box
                sx={{
                  width: "100%",
                  background: "rgba(0, 0, 0, 0.1)",
                  padding: "10px",
                  borderRadius: "9px",
                }}
              >
                Seaport-Civic-Center_Architecture.rvt
              </Box>
            )}

            {type !== "v-1" && (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  background:
                    "url('https://ixuszjrnviwgquuqfbmk.supabase.co/storage/v1/object/public/thumbs/4e43c4d0-942c-4772-aac2-d9e56a89d5de-1724503777883.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "9px",
                }}
              ></Box>
            )}

            {type === "v-1" && (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#303030",
                  borderRadius: "9px",
                  padding: "10px 30px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    background:
                      "url('https://ixuszjrnviwgquuqfbmk.supabase.co/storage/v1/object/public/thumbs/4e43c4d0-942c-4772-aac2-d9e56a89d5de-1724503777883.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "9px",
                  }}
                ></Box>
              </Box>
            )}

            {type === "v-1" && (
              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <EditLabel>{"Seaport-Civic-Center.rvt"}</EditLabel>

                <Box sx={{ fontSize: "18px" }}>Updated 1 min ago</Box>
              </Box>
            )}
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
  height: 390px;
  background: white;
  border: 2px solid black;
  border-radius: 9px;

  padding: 10px;
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

export default NodeThumbnail;
