import NodeService from "@/components/canvas/node-service/node-service";
import { GptResponseData } from "./sticker-service.types";
import { Node } from "reactflow";

class StickerService {
  constructor(private _nodeService: NodeService, private _stickerId: string) {}

  public async generate(message: string, useAI: boolean) {
    useAI = true;

    if (useAI) {
      await this._generateAI(message);
    } else {
      await this._generateDataNode(message);
    }
  }

  private async _generateAI(message: string) {
    const extendedMessage = `
    Given the user prompt: "${message}", determine the most appropriate output type based on the content and intent. 
    Choose one of the following options and return only that option: 
    <message | table | pieChart | lineChart | sankeyChart | presentation | inputParams | eaChart>.
    
    - "message": For straightforward textual responses or explanations.
    - "table": When data comparison or structured information is needed.
    - "pieChart": For showing proportions or percentages within a whole.
    - "lineChart": For displaying trends or changes over time.
    - "sankeyChart": For visualizing flow or distribution paths.
    - "presentation": When a detailed, multi-slide explanation or summary is required.
    - "inputParams": When user asks to retrieve input parameters from any external source.
    - "eaChart": For showing Evolution Algorithm or analisys chart.

    Please return only one option as your answer.`;

    try {
      const response = await fetch("/api/gpt/create-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [extendedMessage], // Sending the input value as a message
        }),
      });

      const data = (await response.json()) as GptResponseData;

      const generatedMessage = data.data.choices[0].message.content;

      const type = this._defineType(generatedMessage);

      this._addGeneratedNode({
        type,
        data: {
          message: generatedMessage,
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  private async _generateDataNode(message: string) {
    const type = this._defineType(message);

    this._addGeneratedNode({
      type,
      data: {
        message: "",
      },
    });
  }

  private _defineType(message: string) {
    return message.includes("table")
      ? "table"
      : message.includes("pie")
      ? "pieChart"
      : message.includes("sankey")
      ? "sankeyChart"
      : message.includes("line")
      ? "lineChart"
      : message.includes("presentation")
      ? "presentation"
      : message.includes("inputParams")
      ? "inputParams"
      : message.includes("eaChart")
      ? "eaChart"
      : "message";
  }

  private _addGeneratedNode(partialNode: Partial<Node>) {
    const stickerNode = this._nodeService.getNode(this._stickerId);
    const position = stickerNode?.position
      ? { ...stickerNode.position }
      : { x: 0, y: 0 };

    position.y += stickerNode?.height || 0;
    position.y += 10;

    position.x += 50;

    const node = this._nodeService.addNode({ ...partialNode, position });
    const edge = this._nodeService.addEdge({
      source: this._stickerId,
      target: node.id,
    });
  }

  public dispose() {}
}

export default StickerService;
