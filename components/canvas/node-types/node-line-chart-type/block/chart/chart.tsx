import { Chart } from "@antv/g2";
import { useEffect, useRef, useState } from "react";
import dataJSON from "../../data/data.json";
import ChartService from "../../../node-pie-chart-type/service/chart-service";
import { useNodes } from "@/components/canvas/node-service/node-provider";
import stc from "string-to-color";
import chroma from "chroma-js";

const SankryChart = ({ data, isConnectable }: any) => {
  const chartContainerRef = useRef<any>(null);

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

  useEffect(() => {
    if (!data) return;
    if (!chartContainerRef.current) return;

    const chart = new Chart({
      container: chartContainerRef.current,
      autoFit: true,
    });

    // Generate color palette
    const colorPalette = items.map((item) => {
      const color = stc(item.name); // Generate color based on name
      return chroma(color).hex(); // Convert to hex format
    });

    chart.options({
      type: "interval",
      autoFit: true,
      data: items,
      encode: { x: "name", y: "value", color: "name" },
      scale: {
        color: {
          palette: colorPalette as any,
        },
      },
    });

    chart.render();

    return () => {
      if (chartContainerRef.current) {
        chartContainerRef.current.innerHTML = "";
      }
    };
  }, [items]);

  return (
    <div style={{ width: "500px", height: "340px" }} ref={chartContainerRef} />
  );
};

export default SankryChart;
