import NodeService from "@/components/canvas/node-service/node-service";
import { Comment } from "@/components/services/project-services/comment-service/comment-service";
import { ProjectTopic } from "@/components/services/project-services/project-service/project-service";
import { BehaviorSubject } from "rxjs";

class TableService {
  private _tableDate$ = new BehaviorSubject<TableData | null>(null);

  constructor(private _nodeService: NodeService, data: any) {
    const entity = data?.userData?.entity || {};
    const topics = data?.userData?.topics || [];

    this._prepareDataForChart(entity, topics, data.userData, data.id);

    this.fetchTableData(entity, topics);
  }

  public async fetchTableData(entity: UserData, topics: ProjectTopic[] = []) {
    const data = this._formatDataBasedOnEntity(entity, topics);

    const columns: string[] = [];

    const rows = data.map((row: any) => {
      const newRow: TableItem = {};

      Object.keys(row).forEach((key) => {
        if (!columns.includes(key)) {
          columns.push(key);
        }

        newRow[key] = row[key];
      });

      return newRow;
    });

    this._tableDate$.next({ columns, rows });
  }

  private _prepareDataForChart(
    entity: any,
    projectTopics: ProjectTopic[],
    userData: UserData,
    nodeId: string
  ): void {
    const value = entity.value;

    let chartData = new Map<string, { name: string; value: number }[]>();

    if (value === "comments") {
      const data = entity.data;

      const topicId2Name = new Map<string, string>();
      projectTopics.forEach((topic) => {
        topicId2Name.set(`${topic.id}`, topic.name);
      });

      const topics = new Map<string, { name: string; value: number }[]>();
      data.forEach((comment: Comment) => {
        const commentTopics = comment.topic_tags || {};
        Object.entries(commentTopics).forEach(([_topic, value]) => {
          const topic = topicId2Name.get(_topic) || _topic;

          if (!topics.has(topic)) {
            topics.set(topic, []);
          }

          const __topic = topics.get(topic) as {
            name: string;
            value: number;
          }[];

          const topicValues = value as any as [string, number][];
          topicValues.forEach(([name, value]) => {
            const foundValue = __topic.find((item) => item.name === name);
            if (foundValue) {
              foundValue.value += value;
            } else {
              __topic.push({ name, value });
            }
          });
        });
      });

      chartData = topics;
    } else if (value === "modelElements") {
      const data = entity.data;

      data.forEach((item: any) => {
        const properties = item?.properties || {};

        Object.entries(properties).forEach(([key, value]: any) => {
          if (!(typeof value === "string")) return;

          if (!chartData.has(key)) {
            chartData.set(key, []);
          }

          const _properties = chartData.get(key) as {
            name: string;
            value: number;
          }[];

          const foundValue = _properties.find((item) => item.name === value);
          if (foundValue) {
            foundValue.value += 1;
          } else {
            _properties.push({ name: value, value: 1 });
          }
        });

        const name = item?.name;
        if (name) {
          if (!chartData.has("name")) {
            chartData.set("name", []);
          }

          const _properties = chartData.get("name") as {
            name: string;
            value: number;
          }[];

          const foundValue = _properties.find((item) => item.name === name);
          if (foundValue) {
            foundValue.value += 1;
          } else {
            _properties.push({ name, value: 1 });
          }
        }
      });
    } else {
      // TODO: usually we use this approach only for entries

      const data = entity.data;
      if (data.length > 0) {
        const firstRow = data[0];
        const headers = Object.keys(firstRow);

        headers.forEach((header) => {
          const values = data.map((row: any) => row[header]);

          if (!chartData.has(header)) {
            chartData.set(header, []);
          }

          const _properties = chartData.get(header) as {
            name: string;
            value: number;
          }[];

          values.forEach((value: any) => {
            const foundValue = _properties.find((item) => item.name === value);
            if (foundValue) {
              foundValue.value += 1;
            } else {
              _properties.push({ name: value, value: 1 });
            }
          });
        });
      }

      console.log("%cdata", "color: purple", data);
    }

    this._nodeService.addUserdataToNode(nodeId, {
      ...userData,
      chartData,
    });
  }

  private _formatDataBasedOnEntity(entity: any, projectTopics: ProjectTopic[]) {
    const value = entity.value;

    const chartData = new Map<string, Record<string, number>[]>();

    if (value === "comments") {
      const data = entity.data;

      const topics = new Map<string, string>();
      data.forEach((comment: Comment) => {
        const commentTopics = comment.topic_tags || {};
        Object.keys(commentTopics).forEach((topic) => {
          topics.set(topic, topic);
        });
      });

      return data.map((comment: Comment) => {
        const _topics: any = {};
        Array.from(topics.keys()).forEach((topic: string) => {
          _topics[topic] = comment.topic_tags[topic] || [];

          if (!chartData.has(topic)) {
            chartData.set(topic, []);
          }

          const __topic = chartData.get(topic) as Record<string, number>[];
          _topics[topic].forEach((value: string) => {
            const index = __topic.findIndex((item) => item[value]);
            if (index > -1) {
              __topic[index][value] += 1;
            } else {
              __topic.push({ [value]: 1 });
            }
          });
        });

        // replace topic id with topic name
        const _topicsName: any = {};
        Object.keys(_topics).forEach((topic) => {
          const topicName = projectTopics.find(
            (t) => `${t.id}` === topic
          )?.name;
          _topicsName[topicName || topic] = _topics[topic];
        });

        return {
          message: comment.content,
          ..._topicsName,
        };
      });
    } else {
      return entity.data;
    }
  }

  public get tableData$() {
    return this._tableDate$.asObservable();
  }

  public get tableData() {
    return this._tableDate$.value;
  }

  public dispose() {
    this._tableDate$.complete();
  }
}

export interface TableData {
  columns: string[];
  rows: TableItem[];
}

interface TableItem {
  [key: string]: any;
}

interface UserData {
  label: string;
  value: string;
  data: TableItem[];
}

export default TableService;
