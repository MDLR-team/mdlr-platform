import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

const NodeThumbType = ({ data, isConnectable }: any) => {
  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box
        sx={{
          width: "150px",
          height: "120px",
          background: "white",
          border: "2px solid #000",
          borderRadius: "9px",
          backgroundImage:
            "url('https://ixuszjrnviwgquuqfbmk.supabase.co/storage/v1/object/public/thumbs/ee392d83-0e09-4e70-a36f-37fb2d4601e9-1713060468673.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>

      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default NodeThumbType;
