import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";
import dataJSON from "../../data/data.json";

const SankryChart = ({ data, isConnectable }: any) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = new Chart({
      container: chartRef.current,
      autoFit: true,
    });

    chart
      .interval()
      .data({
        value: dataJSON,
        transform: [
          {
            type: "custom",
            callback: (data: any) => {
              return data;
            },
          },
        ],
      })
      .transform({ type: "sortX", by: "y", reverse: true, slice: 6 })
      .transform({ type: "dodgeX" })
      .encode("x", "state")
      .encode("y", "beams")
      .encode("color", "crossbar")
      .scale("y", { nice: true })
      .axis("y", { labelFormatter: "~s" });

    chart
      .interaction("tooltip", { shared: true })
      .interaction("elementHighlightByColor", { background: true });

    chart.render();
  }, []);

  return <div style={{ width: "500px", height: "340px" }} ref={chartRef} />;
};

export default SankryChart;
