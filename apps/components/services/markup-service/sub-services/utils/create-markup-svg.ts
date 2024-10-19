import { getColor, getInitials } from "@/components/layout/avatar/avatar";

function createMarkupSvg(content: string | number, type: MarkupSVGType) {
  const svgNS = "http://www.w3.org/2000/svg";

  const g = document.createElementNS(svgNS, "g");
  g.setAttribute("cursor", "pointer");
  g.setAttribute("pointer-events", "all");

  const path1 = document.createElementNS(svgNS, "path");
  path1.setAttribute(
    "d",
    "M0 13.5C0 6.04416 6.04416 0 13.5 0V0C20.9558 0 27 6.04416 27 13.5V13.5C27 20.9558 20.9558 27 13.5 27H0V13.5Z"
  );

  const color =
    type === "default"
      ? "#333333"
      : type === "pendingComment"
      ? "blue"
      : "#FAE57E";
  path1.setAttribute("fill", color);

  if (type !== "default") {
    path1.setAttribute("stroke", "#333333");
    path1.setAttribute("stroke-width", "2");
  }

  if (type === "pendingComment") {
    path1.setAttribute("stroke", "blue");
    path1.setAttribute("stroke-width", "2");
  }

  g.appendChild(path1);

  if (type === "default") {
    const path2 = document.createElementNS(svgNS, "path");
    path2.setAttribute(
      "d",
      "M24 13.5C24 19.299 19.299 24 13.5 24C7.70101 24 3 19.299 3 13.5C3 7.70101 7.70101 3 13.5 3C19.299 3 24 7.70101 24 13.5Z"
    );
    path2.setAttribute("fill", getColor(content.toString()));

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", "14");
    text.setAttribute("y", "14");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("fill", "#FFFFFF"); // Set text color using CSS property
    text.style.fontWeight = "500"; // Set font weight using CSS property

    text.style.fontSize = "10px"; // Set font size using CSS property
    text.textContent = getInitials(content.toString());

    text.style.pointerEvents = "none"; // Disable pointer events

    g.appendChild(path2);
    g.appendChild(text);
  }

  return g;
}

export type MarkupSVGType =
  | "default"
  | "placing"
  | "pending"
  | "pendingComment";

export { createMarkupSvg };
