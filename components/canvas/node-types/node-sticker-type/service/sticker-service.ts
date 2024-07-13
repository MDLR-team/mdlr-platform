import NodeService from "@/components/canvas/node-service/node-service";
import { GptResponseData } from "./sticker-service.types";
import { Node } from "reactflow";
import { BehaviorSubject } from "rxjs";
import { ProjectTopic } from "@/components/services/project-services/project-service/project-service";

class StickerService {
  public entities$ = new BehaviorSubject<
    { label: string; value: string; data: any }[]
  >([]);
  public topics$ = new BehaviorSubject<ProjectTopic[]>([]);

  private _previousUserData: any;

  constructor(private _nodeService: NodeService, private _stickerId: string) {
    const previousNode = this._nodeService.getPreviousNode(this._stickerId);
    this._previousUserData = previousNode?.data?.userData || {};

    console.log("previousNode", previousNode);

    const userData = previousNode?.data?.userData || {};
    const entities = userData.entities || [];
    const topics = userData.topics || [];

    this.entities$.next(entities);
    this.topics$.next(topics);
  }

  public async generate(message: string, useAI: boolean) {
    useAI = true;

    if (useAI) {
      if (this.entities$.value.length > 0) {
        return await this.getOutputBasedOnEntities(message);
      }

      this._nodeService.addUserdataToNode(
        this._stickerId,
        this._previousUserData
      );

      const chart = await this._generateTaskForChart(message);
      if (chart === "chart") {
        return;
      }

      await this._generateAI(message);
    } else {
      await this._generateDataNode(message);
    }
  }

  private async getOutputBasedOnEntities(message: string): Promise<void> {
    const systemMessage = `
      Given the user prompt you need to figure out to which of given entities the user is referring to.
      Existent entities are: ${this.entities$.value
        .map((entity) => entity.label)
        .join(", ")}.
        Please return the entity name or "none" if the user is not referring to any of the entities.
    `;

    try {
      const response = await fetch("/api/gpt/create-message-v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: systemMessage,
            },
            {
              role: "user",
              content: message,
            },
          ], // Sending the input value as a message
        }),
      });

      const data = (await response.json()) as GptResponseData;

      const generatedMessage = data.data.choices[0].message.content;

      const entity = generatedMessage === "none" ? undefined : generatedMessage;

      console.log("entity", entity);

      this._addGeneratedNode({
        type: "table",
        data: {
          message: entity || "none",
          userData: {
            entity: this.entities$.value.find((e) => e.label === entity),
            topics: this.topics$.value,
          },
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  private async _generateTaskForChart(
    message: string
  ): Promise<null | "chart"> {
    const chartData = this._previousUserData.chartData as
      | Map<string, any>
      | undefined;
    if (!chartData) return null;

    const columns = Array.from(chartData.keys());
    const chartTypes = ["pieChart", "lineChart"];

    const extendedMessage = `
     Determine if the user is requesting a chart. Available chart types:
      - "pieChart": Proportions or percentages within a whole.
      - "lineChart": Trends or changes over time.

      Columns: ${columns.join(", ")}.

      Note: The user prompt must include both a chart type and a column name. 
      If both are included, return:
      [chartType, columnName]
      If either is missing, return "none".
    `;

    try {
      const response = await fetch("/api/gpt/create-message-v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: extendedMessage,
            },
            {
              role: "user",
              content: message,
            },
          ], // Sending the input value as a message
        }),
      });

      const data = (await response.json()) as GptResponseData;

      const generatedMessage = data.data.choices[0].message.content;
      // we need to check whether parsed string is either "none" or array of two elements
      const [chartType, columnName] =
        generatedMessage === "none" ? [] : JSON.parse(generatedMessage);

      if (chartTypes.includes(chartType) && columns.includes(columnName)) {
        const chartItems = chartData.get(columnName);

        console.log("%c chart task", "color: red", chartType, columnName);

        this._addGeneratedNode({
          type: chartType,
          data: {
            message: generatedMessage,
            chartItems: chartItems,
          },
        });

        this._nodeService.addUserdataToNode(this._stickerId, {
          ...this._previousUserData,
          chartItems,
        });

        return "chart";
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
    }

    return null;
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
