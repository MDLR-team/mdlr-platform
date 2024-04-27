import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import { TextField } from "@mui/material";
import styled from "styled-components";

const handleStyle = { left: 10 };

const NodeSticker1Type = ({ data, isConnectable }: any) => {
  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box
        sx={{
          width: "100px",
          height: "max-content",
          background: "#f9f1c3",
          border: "1px solid #000",
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "9px",
        }}
      >
        <Wrapper>
          <i>Prompt</i>
          <br />
          <br />
          Generate visualization data that includes a linear chart showing how
          live districts in the building respond to environmental factors and
          generate analyses for the 'north', 'green', 'road', and 'public'
          sections
        </Wrapper>
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
    &,
    & * {
      font-size: 8px;
    }
  }
`;

export default NodeSticker1Type;
