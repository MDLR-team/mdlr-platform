import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";
import dataJSON from "../data/data.json";

const SankryChart = ({ data, isConnectable }: any) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = new Chart({ container: chartRef.current });

    chart.options({
      type: "sankey",
      width: 500,
      height: 350,
      layout: { nodeAlign: "center", nodePadding: 0.03 },
      data: {
        value: dataJSON,
        transform: [
          {
            type: "custom",
            callback: (data: any) => {
              return {
                links: data,
              };
            },
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
        labelFontSize: 6,
        nodeLineWidth: 1.2,
        linkFillOpacity: 0.4,
      },
    });

    chart.render();
  }, []);

  return <div ref={chartRef} />;
};

interface Connection {
  source: string;
  target: string;
  value: number;
}

const generateData = (): Connection[] => {
  const items = [
    "Wall",
    "Floor",
    "Ceiling",
    "Roof",
    "Door",
    "Window",
    "Staircase",
    "Column",
    "Beam",
    "Slab",
    "Foundation",
    "Curtain Wall",
    "MEP (Mechanical, Electrical, Plumbing) Equipment",
    "HVAC (Heating, Ventilation, and Air Conditioning) Duct",
    "Pipe",
    "Conduit",
    "Furniture",
    "Fixture",
    "Landscape Element",
    "Structural Framing",
  ];

  const connections: Connection[] = [];

  for (let i = 0; i < items.length - 1; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const value = Math.random() * 200 + 1; // Random value between 1 and 200
      connections.push({ source: items[i], target: items[j], value });
    }
  }

  return connections;
};

export default SankryChart;
