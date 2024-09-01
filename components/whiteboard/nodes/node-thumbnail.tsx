import EditGroup from "@/components/dashboard-viewer/blocks/edit-group/edit-group";
import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import styled from "styled-components";

const NodeThumbnail = () => {
  return (
    <>
      <div className="text-updater-node">
        <Handle type="target" position={Position.Top} isConnectable={true} />

        <EditGroup>
          <Wrapper>
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
          </Wrapper>
        </EditGroup>

        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          isConnectable={true}
        />
      </div>
    </>
  );
};

const Wrapper = styled.div`
  width: 360px;
  height: 320px;
  background: white;
  border: 2px solid black;
  border-radius: 9px;

  padding: 10px;
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

export default NodeThumbnail;
