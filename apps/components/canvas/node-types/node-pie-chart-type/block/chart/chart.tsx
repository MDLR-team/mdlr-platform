import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";
import stc from "string-to-color";
import chroma from "chroma-js";

const SankryChart: React.FC<{
  items: { name: string; value: number }[];
}> = ({ items }) => {
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

    // Generate color palette
    const colorPalette = items.map((item) => {
      const color = stc(item.name); // Generate color based on name
      return chroma(color).hex(); // Convert to hex format
    });

    chart.options({
      type: "view",
      padding: 0,
      inset: 0,
      coordinate: {
        type: "theta",
        innerRadius: 0.9,
      },
      children: [
        {
          type: "interval",
          data: items,
          encode: { y: "value", color: "name" },
          transform: [{ type: "stackY" }],
          scale: {
            color: {
              palette: colorPalette as any,
            },
          },
          legend: false,
        },
      ],
    });

    chart.render();
    chartRef.current = chart; // Keep a reference to the current chart instance

    return () => {
      chart.destroy(); // Cleanup the chart instance when the component unmounts or items change
    };
  }, [items]);

  return <div style={{ width: "400px", height: "280px" }} ref={containerRef} />;
};

export default SankryChart;
