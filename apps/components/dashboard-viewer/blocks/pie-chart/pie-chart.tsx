import { Chart } from "@antv/g2";
import { useEffect, useMemo, useRef } from "react";
import stc from "string-to-color";
import chroma from "chroma-js";
import { getColor } from "@/components/layout/avatar/avatar";
import { Box } from "@mui/material";

const PieChart: React.FC<{
  items: { name: string; value: number }[];
  options?: {
    maxHeight?: string;
    type?: "pie" | "bar";
  };
}> = ({ items, options }) => {
  const chartRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const coordinate: any = useMemo(() => {
    if (options?.type === "bar") {
      return { transform: [{ type: "transpose" }] };
    }

    return {
      type: "theta",
      innerRadius: 0.9,
    };
  }, [options?.type]);

  const encode: any = useMemo(() => {
    if (options?.type === "bar") {
      return { x: "name", y: "value", color: "name" };
    }

    return { y: "value", color: "name" };
  }, [options?.type]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy the previous chart instance
    }

    const chart = new Chart({
      container: containerRef.current!,
      autoFit: true,
    });

    // Generate color palette
    const colorPalette = items.map((item) => {
      const color = getColor(item.name);
      return chroma(color).hex(); // Convert to hex format
    });

    chart.options({
      type: "view",
      padding: 0,
      inset: 0,
      coordinate,
      children: [
        {
          type: "interval",
          data: items,
          encode,
          transform: [{ type: "stackY" }],
          scale: {
            color: {
              palette: colorPalette as any,
            },
          },
          interaction: {
            legendFilter: false,
          },
        },
      ],
    });

    chart.render();
    chartRef.current = chart; // Keep a reference to the current chart instance

    return () => {
      chart.destroy(); // Cleanup the chart instance when the component unmounts or items change
    };
  }, [items]);

  const maxHeight = options?.maxHeight || "400px";

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        maxHeight: maxHeight,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{ width: "100%", height: "100%", maxHeight: maxHeight }}
        ref={containerRef}
      />

      <Box
        sx={{
          display: "flex",
          rowGap: "7px",
          columnGap: "10px",
          flexWrap: "wrap",
          marginTop: "40px",
          marginBottom: "20px",
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Box
              sx={{
                minWidth: "25px",
                maxWidth: "25px",
                minHeight: "5px",
                maxHeight: "5px",
                background: stc(item.name),
                borderRadius: "2px",
              }}
            />

            <Box sx={{}}>{item.name}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PieChart;
