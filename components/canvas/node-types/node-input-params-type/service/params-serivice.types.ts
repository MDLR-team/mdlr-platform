export interface ParamSlider {
  type: "slider";
  label: string;
  value: number;
  step: number;
  min: number;
  max: number;
}

export interface ParamSelect {
  type: "select";
  label: string;
  value: string;
  options: string[];
}

export interface ParamSwitch {
  type: "switch";
  label: string;
  value: boolean;
}

export type ParamItem = ParamSlider | ParamSelect | ParamSwitch;
