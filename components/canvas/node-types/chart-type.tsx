import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

const ChartThumbType = ({ data, isConnectable }: any) => {
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
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />

      <Box
        sx={{
          width: `${834 * 0.25}px`,
          height: `${1980 * 0.25}px`,
          backgroundColor: isLoading ? "grey" : "white",
          border: "2px solid #000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "9px",
          backgroundImage: isLoading ? "none" : "url('/thumb/2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isLoading && <CircularProgress />}
      </Box>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default ChartThumbType;
