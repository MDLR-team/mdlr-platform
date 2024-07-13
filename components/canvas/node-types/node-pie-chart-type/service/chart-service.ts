import NodeService from "@/components/canvas/node-service/node-service";
import { BehaviorSubject } from "rxjs";

class ChartService {
  private _chartItems$ = new BehaviorSubject<{ name: string; value: number }[]>(
    []
  );

  constructor(private _nodeService: NodeService, chartId: string) {
    const previousNode = this._nodeService.getPreviousNode(chartId);
    const userData = previousNode?.data?.userData || {};

    console.log("previousNodeA", previousNode);

    const chartItems = userData.chartItems || [];

    this._chartItems$.next(chartItems);
  }

  public get chartItems$() {
    return this._chartItems$;
  }
}

export default ChartService;
