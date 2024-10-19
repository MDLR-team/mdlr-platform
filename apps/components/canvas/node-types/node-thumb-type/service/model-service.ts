import { BehaviorSubject } from "rxjs";
import { NodeModelMetadata } from "./model-service.types";
import { v4 as uuidv4 } from "uuid";
import NodeService from "@/components/canvas/node-service/node-service";
import Papa from "papaparse";
import { EntityItem } from "../../node-viewer-type/service/viewer-service";

class ModelService {
  private _metadata$ = new BehaviorSubject<NodeModelMetadata | null>(null);

  private _loadingTime = 1000;
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _loaded$ = new BehaviorSubject<boolean>(false);

  private _thumbIndex = 1;

  constructor(private _nodeService: NodeService, private _nodeId: string) {
    const nodes = this._nodeService.nodes;
    const thumbNodes = nodes.filter((node) => node.type === "thumbnail");

    this._thumbIndex = thumbNodes.length;
  }

  private _handleDummyLoading() {
    this._loading$.next(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this._loading$.next(false);
        this._loaded$.next(true);

        resolve(); // Resolve the promise once loading is done
      }, this._loadingTime);
    });
  }

  public async uploadFile(file: File) {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const fileName = file.name;

    if (fileExtension === "csv") {
      this._loading$.next(true);

      try {
        Papa.parse(file, {
          complete: (results) => {
            const data: any[] = results.data;

            if (data.length === 0) {
              console.error("No data found in CSV file");
              return;
            } else {
              const firstRow = data[0];
              const headers = Object.keys(firstRow);

              const entitiesObj: Record<string, any[]> = {};

              /* const entities: EntityItem[] = headers.map((header) => {
                const values = data.map((row) => row[header]);

                entitiesObj[header] = values;

                return {
                  label: header,
                  value: header || "",
                  data: values,
                };
              }); */
              const entities: EntityItem[] = [
                {
                  label: "entries",
                  value: "entries",
                  data: data,
                },
              ];

              this._nodeService.addUserdataToNode(this._nodeId, {
                entities,
                entries: data,
              });

              this._loading$.next(false);
              this._loaded$.next(true);

              const metadata: NodeModelMetadata = {
                id: uuidv4(),
                name: fileName,
                endpoint: fileName,
                thumbnail: "",
              };

              this._metadata$.next(metadata);
            }
            // You can now process the results.data as needed
          },
          header: true, // If your CSV file has headers
        });
      } catch (error) {
        console.error("Error parsing CSV file", error);
      }

      return;
    } else {
      return;
    }
  }

  public async uploadApi(_metadata: Partial<NodeModelMetadata>) {
    this._handleDummyLoading();

    const metadata: NodeModelMetadata = {
      id: uuidv4(),
      name: "My Model",
      endpoint: _metadata.endpoint || "",
      thumbnail: `/thumb/3_${this._thumbIndex}.jpg`,
    };

    this._metadata$.next(metadata);
  }

  public get metadata$() {
    return this._metadata$.asObservable();
  }

  public get loading$() {
    return this._loading$.asObservable();
  }

  public get loaded$() {
    return this._loaded$.asObservable();
  }

  public dispose() {
    this._loading$.complete();
    this._loaded$.complete();
  }
}

export default ModelService;
