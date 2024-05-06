import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";

const SankryChart = ({ data, isConnectable }: any) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const data = [
      {
        State: "WY",
        "Exterior Wall": 25635,
        "Partition Wall": 1890,
        "Retaining Wall": 9314,
      },
      {
        State: "DC",
        "Exterior Wall": 30352,
        "Partition Wall": 20439,
        "Retaining Wall": 10225,
      },
      {
        State: "VT",
        "Exterior Wall": 38253,
        "Partition Wall": 42538,
        "Retaining Wall": 15757,
      },
      {
        State: "ND",
        "Exterior Wall": 51896,
        "Partition Wall": 67358,
        "Retaining Wall": 18794,
      },
      {
        State: "AK",
        "Exterior Wall": 72083,
        "Partition Wall": 85640,
        "Retaining Wall": 22153,
      },
    ];

    const chart = new Chart({
      container: chartRef.current,
      autoFit: true,
    });

    chart.coordinate({ type: "radial" });

    chart
      .interval()
      .data({
        value: data,
        transform: [
          {
            type: "fold",
            fields: ["Exterior Wall", "Partition Wall", "Retaining Wall"],
            key: "Interior Wall",
            value: "Wall",
            retains: ["State"],
          },
        ],
      })
      .encode("x", "State")
      .encode("y", "Wall")
      .encode("color", "Interior Wall")
      .scale("y", { domainMax: 200000 })
      .scale("color", { range: ["#6395FA", "#62DAAB", "#657798"] })
      .transform({ type: "stackY" })
      .axis({
        x: {
          title: false,
          line: true,
        },
        y: {
          line: true,
          grid: true,
          gridLineDash: [4, 4],
          tickCount: 10,
          tickFilter: (datum: any) => datum != 200000,
        },
      })
      .legend({
        color: {
          position: "bottom",
          layout: { justifyContent: "center" },
        },
      })
      .interaction("elementHighlightByX")
      .interaction("tooltip", {
        shared: true,
      });

    chart.render();
  }, []);

  return <div style={{ width: "400px", height: "280px" }} ref={chartRef} />;
};

export default SankryChart;
