import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import { useNodes } from "../../node-service/node-provider";
import { useEffect, useRef, useState } from "react";
import PresentationService from "./service/presentation-service";

const NodePresentationType = ({ data, isConnectable }: any) => {
  const { nodeService } = useNodes();

  const [presentationService] = useState(
    () => new PresentationService(nodeService, data.id)
  );

  const BoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appendLayout = async () => {
      const canvas = await presentationService.createLayout();

      BoxRef.current!.innerHTML = "";
      BoxRef.current?.appendChild(canvas);
    };

    appendLayout();

    return () => {
      presentationService.dispose();
    };
  }, []);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box
        id={`box${data.id}`}
        ref={BoxRef}
        sx={{
          width: "max-content",
          height: "max-content",
          background: "#c2c2c2",
          border: "1px solid #000",
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "9px",
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

export default NodePresentationType;
