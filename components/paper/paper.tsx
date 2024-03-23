import React, { useEffect, useRef, useState } from "react";
import paper, { Path, Tool } from "paper";
import { Box } from "@mui/material";
import { useViewer } from "../forge/viewer-provider";
import { useActiveComment } from "../services/project-services/active-comment-service/active-comment-provider";
import { v4 as uuidv4 } from "uuid";

const PaperCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { isPaperMode, isPenMode, activeCommentService, activeComment } =
    useActiveComment();
  const { viewer } = useViewer();
  const [userLines, setUserLines] = useState<paper.Path[]>([]); // State to keep track of lines

  const { childComments } = useActiveComment();

  const [screenLogId, setScreenLogId] = useState<string>(uuidv4);

  useEffect(() => {
    if (!isPaperMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setup Paper.js
    paper.setup(canvas);

    // Adjust canvas to fit the window size and consider device pixel ratio
    // Define a function to resize and scale the canvas
    const resizeCanvas = () => {
      const canvas = canvasRef.current;

      const dpr = window.devicePixelRatio || 1; // Get device pixel ratio
      const parentBox = parentRef!.current!.getBoundingClientRect();

      // Adjust canvas drawing buffer size
      canvas!.width = parentBox.width * dpr;
      canvas!.height = parentBox.height * dpr;

      // Adjust canvas display size
      canvas!.style.width = `${parentBox.width}px`;
      canvas!.style.height = `${parentBox.height}px`;

      // Scale the drawing context to ensure correct drawing sizes
      const ctx = canvas!.getContext("2d");
      ctx!.scale(dpr, dpr);

      // Clear previous drawings and setup for new drawing
      paper.project.clear();
      setScreenLogId(uuidv4()); // Trigger re-render if needed

      const redrawAnnotations = () => {
        // Clear existing loaded lines from the canvas
        paper.project.activeLayer.children.forEach((child) => {
          if (child.data && child.data.loadedFromComments) {
            child.remove();
          }
        });

        // Draw existing annotations from childComments
        childComments.forEach((comment) => {
          if (comment.annotation) {
            comment.annotation.forEach((line) => {
              const path = new Path({
                strokeColor: "blue",
                strokeWidth: 2,
                data: { loadedFromComments: true }, // Mark this path as loaded from comments
              });
              line.forEach((point: any) => {
                const paperPoint = deparseNormalizedCoords(point, canvas);
                path.add(paperPoint);
              });
              path.simplify(10);
            });
          }
        });
      };

      // Listen for changes in childComments to redraw annotations
      redrawAnnotations();

      // Update Paper.js view size
      (paper.project.view as any).setViewSize(canvas!.width, canvas!.height);
    };

    // Initial resize
    resizeCanvas();

    // Resize the canvas when the window resizes
    window.addEventListener("resize", resizeCanvas);

    // Listen for 'P' key press to save and clear lines
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "A" || event.key === "a") {
        setUserLines((lines: paper.Path[]) => {
          const transformedLines = lines.map((line, i) => {
            const newPath = line.segments.map((segment) => {
              const point = { x: segment.point.x, y: segment.point.y };

              return transformPointToNormalizedCoords(point, canvas);
            });
            return newPath; // This newPath is an array of normalized points
          });

          // Save lines to ActiveCommentService
          activeCommentService.saveAnnotation(transformedLines);

          //remove the lines from the canvas
          paper.project.activeLayer.children.forEach((child) => {
            if (child.data && child.data.drawnBy === "user") {
              child.remove();
            }
          });

          return [];
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyPress);

      paper.project.clear();
    };
  }, [isPaperMode, activeComment, childComments]);

  useEffect(() => {
    if (!isPenMode) return;

    const tool = new Tool();

    tool.onMouseDown = (event: paper.ToolEvent) => {
      const point = { x: event.point.x, y: event.point.y };

      const path = new Path({
        segments: [point],
        strokeColor: "red",
        strokeWidth: 2,
        fullySelected: false,
        data: {
          drawnBy: "user",
        },
      });
      setUserLines((prevLines) => [...prevLines, path]); // Add the new path to lines state
    };

    tool.onMouseDrag = (event: paper.ToolEvent) => {
      const point = { x: event.point.x, y: event.point.y };

      if (userLines.length > 0) {
        const currentPath = userLines[userLines.length - 1];
        currentPath.add(point);
      }
    };

    tool.onMouseUp = () => {
      // Simplify the last drawn path
      if (userLines.length > 0) {
        const currentPath = userLines[userLines.length - 1];
        currentPath.simplify(10);
      }
    };

    return () => {
      tool.remove();
    };
  }, [isPenMode, userLines]);

  if (!isPaperMode) return null;

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "fixed",
        overflow: "hidden",
        top: 0,
        left: 0,
        zIndex: 20,
      }}
      ref={parentRef}
    >
      <canvas ref={canvasRef} />
    </Box>
  );
};

// Helper function to transform point to normalized coordinates
function transformPointToNormalizedCoords(point: any, canvas: any) {
  const rect = canvas.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const normalizedX = (point.x - centerX) / centerX; // Maps to [-1, 1]
  const normalizedY = -(point.y - centerY) / centerY; // Maps to [-1, 1], Y is inverted

  // Adjust for aspect ratio if width is wider than height
  const aspectRatio = rect.width / rect.height;

  return { x: normalizedX * aspectRatio, y: normalizedY };
}

// Helper function to convert normalized coordinates back to canvas pixel coordinates
function deparseNormalizedCoords(normalizedPoint: any, canvas: any) {
  const rect = canvas.getBoundingClientRect();

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const aspectRatio = rect.width / rect.height;

  // Adjust coordinates based on aspect ratio
  const x = (normalizedPoint.x / aspectRatio) * centerX + centerX;
  const y = -(normalizedPoint.y * centerY) + centerY;

  return new paper.Point(x, y);
}

// Create a new Paper.js tool for drawing
/* const tool = new Tool();

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
      if (path && viewer) {
        path.simplify(10);
      }
    }; */

export default PaperCanvas;
