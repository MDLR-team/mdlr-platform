import { Chart } from "@antv/g2";
import { useEffect, useMemo, useRef } from "react";
import stc from "string-to-color";
import chroma from "chroma-js";
import { getColor } from "@/components/layout/avatar/avatar";
import { Box } from "@mui/material";

const SankeyChart: React.FC<{}> = () => {
  const chartRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy the previous chart instance
    }

    const chart = new Chart({
      container: containerRef.current!,
      autoFit: true,
    });

    chart.options({
      type: "sankey",
      height: 400,
      layout: { nodeAlign: "center", nodePadding: 0.03 },
      data: {
        type: "fetch",
        value: "/dummy-data/sankey.json",
        transform: [
          {
            type: "custom",
            callback: (data: any) => ({
              links: data,
            }),
          },
        ],
      },
      scale: {
        color: {
          range: [
            "#4e79a7",
            "#f28e2c",
            "#e15759",
            "#76b7b2",
            "#59a14f",
            "#edc949",
            "#af7aa1",
            "#ff9da7",
            "#9c755f",
            "#bab0ab",
          ],
        },
      },
      style: {
        labelSpacing: 3,
        labelFontWeight: "bold",
        nodeLineWidth: 1.2,
        linkFillOpacity: 0.4,
      },
    });

    chart.render();
    chartRef.current = chart; // Keep a reference to the current chart instance

    return () => {
      chart.destroy(); // Cleanup the chart instance when the component unmounts or items change
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%", height: "100%" }} ref={containerRef} />
    </Box>
  );
};

export default SankeyChart;
