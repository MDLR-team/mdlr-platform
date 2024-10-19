import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Handle, Position } from "reactflow";
import ChartService from "./service/chart-service";
import { useNodes } from "../../node-service/node-provider";
import stc from "string-to-color";

const Chart = dynamic(() => import("./block/chart/chart"), {
  ssr: false,
});

const NodePieChartType = ({ data, isConnectable }: any) => {
  const { nodeService } = useNodes();

  const [chartService] = useState(() => new ChartService(nodeService, data.id));
  const [items, setItems] = useState<
    {
      name: string;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    const sub = chartService.chartItems$.subscribe((items) => {
      setItems(items);
    });

    return () => {
      sub.unsubscribe();
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
        sx={{
          width: "max-content",
          height: "max-content",
          background: "white",
          display: "flex",
          gap: "10px",
        }}
      >
        <Chart items={items} />

        <Box
          sx={{
            width: "max-content",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
          }}
        >
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  minWidth: "5px",
                  maxWidth: "5px",
                  minHeight: "5px",
                  maxHeight: "5px",
                  background: stc(item.name),
                  borderRadius: "50%",
                }}
              />

              <Box>
                {item.name}: {item.value}
              </Box>
            </Box>
          ))}
        </Box>
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
