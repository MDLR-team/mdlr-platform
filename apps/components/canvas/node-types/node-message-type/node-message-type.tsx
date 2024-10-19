import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import styled from "styled-components";

const NodeMessageType = ({ data, isConnectable }: any) => {
  const message = data?.message || "";

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box
        id={`box${data.id}`}
        sx={{
          width: "150px",
          minHeight: "150px",
          background: "#f9f1c3",
          border: "1px solid #000",
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "9px",
        }}
      >
        <Wrapper>{message}</Wrapper>
      </Box>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
};

const Wrapper = styled.div`
  &&& {
    display: flex;
    flex-direction: column;

    & .MuiInputBase-root {
      padding: 0px;
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.8);
    }

    & .MuiButton-root {
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
`;

export default NodeMessageType;
