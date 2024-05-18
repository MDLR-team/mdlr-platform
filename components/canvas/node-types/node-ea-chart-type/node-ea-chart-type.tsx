import { Handle, Position } from "reactflow";
import { useNodes } from "../../node-service/node-provider";
import { Box } from "@mui/material";
import styled from "styled-components";
import SchemaA1 from "./schemas/a1";
import SchemaB1 from "./schemas/b1";

const NodeEaChartType = ({ data, isConnectable }: any) => {
  const { nodes, nodeService } = useNodes();

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
          width: "max-content",
          minHeight: "150px",
          background: "#2C2E33",
          border: "1px solid #000",
          borderRadius: "9px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "9px",
          transition: "all 0.3s",
          gap: "6px",
        }}
      >
        <SchemaWrapper data-type="a1">
          <Box
            sx={{
              position: "absolute",
              flexDirection: "column",
              width: "100%",
              height: "100%",
            }}
            data-type="comments"
          >
            <Box
              sx={{
                transform: "rotate(-90deg)",
                position: "absolute",
                left: "35px",
                top: "50%",
              }}
            >
              LLG
            </Box>

            <Box
              sx={{
                transform: "rotate(-90deg)",
                position: "absolute",
                left: "115px",
                top: "50%",
              }}
            >
              LLT
            </Box>
          </Box>

          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              gap: "3px",
            }}
            data-type="comments"
          >
            <Box>LLG</Box>
            <Box>Floors - 29</Box>
            <Box>19544 sq.m</Box>
            <Box>KIT - 2.56</Box>
            <Box>KPZ - 8.95</Box>
            <Box>S_n - 6524</Box>
            <Box>Floor_count_av - 17</Box>
          </Box>

          <SchemaA1 />
        </SchemaWrapper>

        <SchemaWrapper data-type="b1">
          <Box
            sx={{
              position: "absolute",
              flexDirection: "column",
              width: "100%",
              height: "100%",
            }}
            data-type="comments"
          >
            <Box
              sx={{
                position: "absolute",
                left: "60px",
                top: "20px",
              }}
            >
              Functional Reaction
            </Box>

            <Box
              sx={{
                position: "absolute",
                left: "0px",
                top: "115px",
              }}
            >
              LLT Edge 1
            </Box>

            <Box
              sx={{
                position: "absolute",
                left: "65px",
                top: "115px",
              }}
            >
              LLT Edge 2
            </Box>

            <Box
              sx={{
                position: "absolute",
                left: "110px",
                top: "115px",
              }}
            >
              LLT Edge 3
            </Box>
          </Box>

          <SchemaB1 />
        </SchemaWrapper>
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

const SchemaWrapper = styled.div`
  width: 160px;
  height: 130px;
  display: flex;
  position: relative;

  background: rgba(0, 0, 0, 0.55);
  overflow: hidden;

  //border: 1px solid #000;
  border-radius: 6px;

  & div[data-type="comments"] {
    &,
    & * {
      color: rgba(255, 255, 255, 0.8);
      font-size: 4px;
    }
  }

  & svg {
    width: 100%;
    height: 100%;
    transform: scale(1.5);
  }

  &[data-type="a1"] {
    height: 100px;

    & svg {
      width: 100%;
      height: 100%;
      transform: scale(1.1);
    }
  }
`;

export default NodeEaChartType;
