import NodeService from "@/components/canvas/node-service/node-service";
import { Node } from "reactflow";
import html2canvas from "html2canvas";

class PresentationService {
  private _canvasWidth: number = 3500;
  private _canvasStyleWidth: string = "400px";

  constructor(
    private _nodeService: NodeService,
    private _presentationId: string
  ) {}

  public async createLayout(): Promise<HTMLCanvasElement> {
    const chartNodes: Node[] = this._nodeService.getChartNodes();
    const chartItems: ChartItem[] = [];

    // Separate vertical and horizontal charts
    const verticalCharts: Node[] = [];
    const horizontalCharts: Node[] = [];

    chartNodes.forEach((node: Node) => {
      if (node.height! > node.width!) {
        verticalCharts.push(node);
      } else {
        horizontalCharts.push(node);
      }
    });

    // Calculate dimensions of each chart node and determine layout columns
    const columnCount =
      verticalCharts.length > 0 && horizontalCharts.length > 0 ? 2 : 1;
    const columnWidth = this._canvasWidth / columnCount;

    // Create an array of promises for each html2canvas operation
    const promises = chartNodes.map(async (node: Node) => {
      const HTMLElement = document.getElementById(`box${node.id}`);
      if (!HTMLElement) return;

      const canvas = await html2canvas(HTMLElement, {
        scale: 2,
      });
      // Convert the off-screen canvas to a data URL
      const url = canvas.toDataURL("image/png");

      const ratio = node.height! / node.width!;
      const width = columnWidth;
      const height = width * ratio;

      const orientation =
        node.height! > node.width! ? "vertical" : "horizontal";

      chartItems.push({ url, width, height, orientation });
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    const maxVerticalHeight = chartItems
      .filter((a) => a.orientation === "vertical")
      .reduce((acc, curr) => acc + curr.height, 0);
    const maxHorizontalHeight = chartItems
      .filter((a) => a.orientation === "horizontal")
      .reduce((acc, curr) => acc + curr.height, 0);

    const canvasHeight = Math.max(maxVerticalHeight, maxHorizontalHeight);
    const canvasWidth = columnWidth * columnCount;

    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const context = canvas.getContext("2d");

    // Position charts on the canvas
    let verticalOffset = 0;
    let horizontalOffset = 0;

    for (const item of chartItems) {
      const image = await this.loadImage(item.url); // Await the loadImage Promise
      if (item.orientation === "vertical") {
        context!.drawImage(image, 0, verticalOffset, item.width, item.height);
        verticalOffset += item.height;
      } else {
        context!.drawImage(
          image,
          columnWidth,
          horizontalOffset,
          item.width,
          item.height
        );
        horizontalOffset += item.height;
      }
    }

    canvas.style.width = this._canvasStyleWidth;
    canvas.style.height = "auto";

    return canvas;
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  }

  public dispose() {}
}

interface ChartItem {
  url: string;
  width: number;
  height: number;
  orientation: "vertical" | "horizontal";
}

export default PresentationService;
