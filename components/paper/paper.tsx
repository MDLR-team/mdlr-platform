import React, { useEffect, useRef } from "react";
import paper, { Path, Tool } from "paper";
import { Box } from "@mui/material";
import { useGlobalStates } from "../services/project-services/global-states-service/global-states-provider";

const PaperCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isPaperOpen } = useGlobalStates();

  useEffect(() => {
    if (!isPaperOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setup Paper.js
    paper.setup(canvas);

    let path: paper.Path | null = null;

    // Adjust canvas to fit the window size and consider device pixel ratio
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth;

      canvas.height = window.innerHeight;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      // Correctly scale the canvas for high DPI devices
      const ctx = canvas.getContext("2d");
      ctx!.scale(dpr, dpr);

      // Update Paper.js view size
      console.log("paper.view", paper.view);

      (paper.view as any).setViewSize(window.innerWidth, window.innerHeight);
    };

    // Initial resize
    resizeCanvas();

    // Resize the canvas when the window resizes
    window.addEventListener("resize", resizeCanvas);

    // Create a new Paper.js tool for drawing
    const tool = new Tool();

    tool.onMouseDown = (event: paper.ToolEvent) => {
      const hitResult = paper.project.hitTest(event.point, {
        stroke: true,
        segments: true,
        tolerance: 20,
      });

      if (hitResult && hitResult.item) {
        hitResult.item.selected = !hitResult.item.selected;
        path = null;
      } else {
        path = new Path({
          segments: [event.point],
          strokeColor: "red",
          strokeWidth: 4,
          fullySelected: false,
        });
      }
    };

    tool.onMouseDrag = (event: paper.ToolEvent) => {
      if (path) {
        path.add(event.point);
      }
    };

    tool.onMouseUp = () => {
      if (path) {
        path.simplify(10);
        path.fullySelected = false;
      }
    };

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      tool.remove(); // Clean up the tool

      // Clear the Paper.js project to ensure a clean state
      paper.project.clear();
    };
  }, [isPaperOpen]);

  if (!isPaperOpen) return null;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 20,
      }}
    >
      <canvas ref={canvasRef} />
    </Box>
  );
};

export default PaperCanvas;
