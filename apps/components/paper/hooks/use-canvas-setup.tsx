import { useEffect, useState } from "react";
import paper, { Path } from "paper";
import { deparseNormalizedCoords } from "@/components/services/markup-service/sub-services/utils/point-2-normalized-coord";
import { getAnnotationBoundingBox } from "@/components/services/markup-service/sub-services/utils/bounding-box";
import { useMarkup } from "@/components/services/markup-service/markup-provider";
import { Comment } from "@/components/services/project-services/comment-service/comment-service";

/**
 * Sets up and resizes the canvas based on its parent container.
 * Initializes Paper.js on the canvas and adjusts its size on window resize.
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef Reference to the canvas element.
 * @param {React.RefObject<HTMLDivElement>} parentRef Reference to the parent container of the canvas.
 */
const useCanvasSetup = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  parentRef: React.MutableRefObject<HTMLDivElement | null>,
  setCommentBBoxes: (commentBBoxes: Map<string, paper.Rectangle>) => void
) => {
  const { markupService } = useMarkup();
  const [spatialComments, setSpatialComments] = useState<Comment[]>([]);
  const [activeComment, setActiveComment] = useState<Comment | null>(null);
  const [pendingComment, setPendingComment] = useState<Partial<Comment> | null>(
    null
  );

  useEffect(() => {
    const sub = markupService.spatialComments$.subscribe((comments) =>
      setSpatialComments(comments)
    );

    const sub2 = markupService.activeComment$.subscribe((comment) =>
      setActiveComment(comment)
    );

    const sub3 = markupService.pendingComment$.subscribe((comment) =>
      setPendingComment(comment)
    );

    return () => {
      sub.unsubscribe();
      sub2.unsubscribe();
      sub3.unsubscribe();
    };
  }, [markupService]);

  useEffect(() => {
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

        const commentBoundingBoxes: Map<string, paper.Rectangle> = new Map();

        const comments = [...spatialComments];
        if (activeComment) {
          comments.push(activeComment);
        }

        // Draw existing annotations from childComments
        comments.forEach((comment) => {
          if (comment.annotation) {
            const lines: paper.Path[] = [];

            comment.annotation.forEach((line) => {
              const path = new Path({
                strokeColor: "blue",
                strokeWidth: 5,
                data: { loadedFromComments: true }, // Mark this path as loaded from comments
              });
              line.forEach((point: any) => {
                const paperPoint = deparseNormalizedCoords(point, canvas);
                path.add(paperPoint);
              });
              path.simplify(10);

              lines.push(path);
            });

            const bbox = getAnnotationBoundingBox(lines);
            commentBoundingBoxes.set(comment.id, bbox);
          }
        });

        setCommentBBoxes(commentBoundingBoxes);
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

        const annotation = pendingComment?.annotation || [];

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
  }, [spatialComments, pendingComment]);
};

export default useCanvasSetup;
