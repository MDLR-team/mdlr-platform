import NodeService from "@/components/canvas/node-service/node-service";
import { Comment } from "@/components/services/project-services/comment-service/comment-service";
import { BehaviorSubject } from "rxjs";

class TableService {
  private _tableDate$ = new BehaviorSubject<TableData | null>(null);

  constructor(private _nodeService: NodeService, data: any) {
    const entity = data?.userData?.entity || {};

    this.fetchTableData(entity);
  }

  public async fetchTableData(entity: UserData) {
    const data = this._formatDataBasedOnEntity(entity);

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

  private _formatDataBasedOnEntity(entity: any) {
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

        console.log("chartData", chartData);

        return {
          message: comment.content,
          ..._topics,
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
