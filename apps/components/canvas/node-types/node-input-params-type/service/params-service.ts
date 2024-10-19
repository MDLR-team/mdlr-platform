import { BehaviorSubject } from "rxjs";
import { ParamItem } from "./params-serivice.types";

class ParamsService {
  private _params: ParamItem[] = [];

  private _params$ = new BehaviorSubject<ParamItem[]>(this._params);

  constructor(paramList: ParamItem[]) {
    this._params = paramList;
    this._params$.next(this._params);
  }

  public updateParam(label: string, value: number | string | boolean) {
    const index = this._params.findIndex((param) => param.label === label);
    if (index === -1) return;

    if (this._params[index].type === "slider") {
      this._params[index].value =
        typeof value === "number" ? value : parseInt(value as string);
    }

    if (this._params[index].type === "select") {
      this._params[index].value = value as string;
    }

    if (this._params[index].type === "switch") {
      this._params[index].value = value as boolean;
    }

    this._params$.next([...this._params]);
  }

  public get params() {
    return this._params;
  }

  public get params$() {
    return this._params$.asObservable();
  }

  public dispose() {
    this._params$.complete();
  }
}

export default ParamsService;
