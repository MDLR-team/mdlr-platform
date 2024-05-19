import { BehaviorSubject } from "rxjs";
import { NodeModelMetadata } from "./model-service.types";
import { v4 as uuidv4 } from "uuid";
import NodeService from "@/components/canvas/node-service/node-service";

class ModelService {
  private _metadata$ = new BehaviorSubject<NodeModelMetadata | null>(null);

  private _loadingTime = 1000;
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _loaded$ = new BehaviorSubject<boolean>(false);

  private _thumbIndex = 1;

  constructor(private _nodeService: NodeService) {
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

  public async uploadFile() {
    await this._handleDummyLoading();

    const metadata: NodeModelMetadata = {
      id: uuidv4(),
      name: "My Model",
      endpoint: "ModelFile.rvt",
      thumbnail:
        "https://ixuszjrnviwgquuqfbmk.supabase.co/storage/v1/object/public/thumbs/ee392d83-0e09-4e70-a36f-37fb2d4601e9-1713060468673.png",
    };

    this._metadata$.next(metadata);
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
