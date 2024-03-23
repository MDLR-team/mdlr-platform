import React, { useEffect, useRef, useState } from "react";
import paper, { Path, Tool } from "paper";
import { Box } from "@mui/material";
import { useActiveComment } from "../services/project-services/active-comment-service/active-comment-provider";
import {
  deparseNormalizedCoords,
  transformPointToNormalizedCoords,
} from "../services/project-services/active-comment-service/utils/point-2-normalized-coord";

const PaperCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { isPaperMode, isPenMode, activeCommentService, activeComment } =
    useActiveComment();

  const { childComments, annotation } = useActiveComment();

  const [line, setLine] = useState<paper.Path | null>(null);

  useEffect(() => {
    if (!isPaperMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setup Paper.js
    paper.setup(canvas);

    // Adjust canvas to fit the window size and consider device pixel ratio
    // Define a function to resize and scale the canvas
    const resizeCanvas = () => {
      // clear the canvas
      paper.project.clear();

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

      // Draw existing annotations from childComments
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

      // Draw existing user annotations
      const redrawUserAnnotations = () => {
        // Clear existing user annotations from the canvas
        paper.project.activeLayer.children.forEach((child) => {
          if (child.data && child.data.drawnBy === "user") {
            child.remove();
          }
        });

        const annotation = activeCommentService.annotation;

        // Draw existing user annotations
        annotation.forEach((line) => {
          const path = new Path({
            strokeColor: "red",
            strokeWidth: 2,
            data: { drawnBy: "user" }, // Mark this path as drawn by user
          });
          line.forEach((point: any) => {
            const paperPoint = deparseNormalizedCoords(point, canvas);

            path.add(paperPoint);
          });
          path.simplify(10);
        });
      };

      // Listen for changes in user annotations to redraw annotations
      redrawUserAnnotations();
    };

    // Initial resize
    resizeCanvas();

    // Resize the canvas when the window resizes
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isPaperMode, activeComment, childComments, annotation]);

  useEffect(() => {
    if (!isPenMode) return;

    const tool = new Tool();

    tool.onMouseDown = (event: paper.ToolEvent) => {
      const path = new Path({
        segments: [event.point],
        strokeColor: "red",
        strokeWidth: 2,
        fullySelected: false,
        data: {
          drawnBy: "user2",
        },
      });

      setLine(path);
    };

    tool.onMouseDrag = (event: paper.ToolEvent) => line?.add(event.point);

    tool.onMouseUp = () => {
      if (line) {
        line.simplify(10);

        const formattedPoints: any[] = [];
        line.segments.forEach((segment) => {
          formattedPoints.push(
            transformPointToNormalizedCoords(segment.point, canvasRef.current!)
          );
        });

        activeCommentService.addAnnotationLine(formattedPoints);

        line.remove();
        setLine(null);
      }
    };

    return () => {
      tool.remove();
    };
  }, [isPenMode, line]);

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

/**
     * 
     *  // Listen for 'P' key press to save and clear lines
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "A" || event.key === "a") {
        /* setUserLines((lines: paper.Path[]) => {
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
     */

//(paper.project.view as any).setViewSize(canvas!.width, canvas!.height);

export default PaperCanvas;
