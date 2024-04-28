import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

const NodeApiThumbType = ({ data, isConnectable }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timer to simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide spinner after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <div className="text-updater-node">
      <Handle
        id="top"
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />

      <Box
        sx={{
          width: "150px",
          height: "120px",
          backgroundColor: isLoading ? "grey" : "white",
          border: "2px solid #000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "9px",
          backgroundImage: isLoading ? "none" : "url('/thumb/3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isLoading && <CircularProgress />}
      </Box>

      <Handle
        id="right"
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />

      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default NodeApiThumbType;
