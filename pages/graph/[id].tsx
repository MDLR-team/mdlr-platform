import React, { useEffect, useRef } from "react";
import G6 from "@antv/g6";

const GraphComponent = () => {
  const containerRef = useRef<any>(null);
  const graphRef = useRef<any>(null); // Reference to store the graph instance

  useEffect(() => {
    async function loadGraph() {
      // Prevent reinitializing the graph if it already exists
      if (graphRef.current) {
        return;
      }

      // Get the container dimensions
      const width = containerRef.current.scrollWidth;
      const height = containerRef.current.scrollHeight || 500;

      const G6 = await import("@antv/g6");

      // Create the graph
      const graph = new G6.Graph({
        container: containerRef.current, // Bind to the container
        width,
        height,
        layout: {
          type: "force",
          preventOverlap: true,
          linkDistance: (d: any) => {
            if (d.source.id === "node0") {
              return 100;
            }
            return 30;
          },
          nodeStrength: (d: any) => {
            if (d.isLeaf) {
              return -50;
            }
            return -10;
          },
          edgeStrength: (d: any) => {
            if (
              d.source.id === "node1" ||
              d.source.id === "node2" ||
              d.source.id === "node3"
            ) {
              return 0.7;
            }
            return 0.1;
          },
        },
        node: {
          style: {
            lineWidth: 2,
            fill: "#DEE9FF",
            stroke: "#5B8FF9",
          },
        },
        edge: {
          style: {
            stroke: "#e2e2e2",
            lineAppendWidth: 2,
          },
        },
      });

      console.log("graph", graph);

      if (graphRef.current) {
        graphRef.current.destroy();
      }

      graphRef.current = graph; // Save the graph instance to the ref

      const data = {
        nodes: [
          { id: "node0", size: 50 },
          { id: "node1", size: 30 },
          { id: "node2", size: 30 },
          { id: "node3", size: 30 },
          { id: "node4", size: 30, isLeaf: true },
          { id: "node5", size: 30, isLeaf: true },
          { id: "node6", size: 15, isLeaf: true },
          { id: "node7", size: 15, isLeaf: true },
          { id: "node8", size: 15, isLeaf: true },
          { id: "node9", size: 15, isLeaf: true },
          { id: "node10", size: 15, isLeaf: true },
          { id: "node11", size: 15, isLeaf: true },
          { id: "node12", size: 15, isLeaf: true },
          { id: "node13", size: 15, isLeaf: true },
          { id: "node14", size: 15, isLeaf: true },
          { id: "node15", size: 15, isLeaf: true },
          { id: "node16", size: 15, isLeaf: true },
        ],
        edges: [
          { source: "node0", target: "node1" },
          { source: "node0", target: "node2" },
          { source: "node0", target: "node3" },
          { source: "node0", target: "node4" },
          { source: "node0", target: "node5" },
          { source: "node1", target: "node6" },
          { source: "node1", target: "node7" },
          { source: "node2", target: "node8" },
          { source: "node2", target: "node9" },
          { source: "node2", target: "node10" },
          { source: "node2", target: "node11" },
          { source: "node2", target: "node12" },
          { source: "node2", target: "node13" },
          { source: "node3", target: "node14" },
          { source: "node3", target: "node15" },
          { source: "node3", target: "node16" },
        ],
      };
      const nodes = data.nodes;
      graph.setData({
        nodes,
        edges: data.edges.map(function (edge, i) {
          (edge as any).id = "edge" + i;
          return Object.assign({}, edge);
        }),
      });

      graph.render();
    }

    loadGraph();

    // Cleanup function to destroy the graph when the component unmounts
    return () => {
      if (graphRef.current) {
        graphRef.current.destroy();
        graphRef.current = null; // Clear the reference to the graph instance
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100w", height: "100vh" }} />;
};

export default GraphComponent;
