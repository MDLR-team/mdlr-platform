import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";

const Chart = dynamic(() => import("./block/chart/chart"), {
  ssr: false,
});

const NodePieChartType = ({ data, isConnectable }: any) => {
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
          height: "max-content",
          background: "white",
        }}
      >
        <Chart />
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

export default NodePieChartType;
