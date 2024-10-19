import {
  Box,
  MenuItem,
  Select,
  Slider,
  Switch,
  TextField,
} from "@mui/material";
import { Handle, Position } from "reactflow";
import styled from "styled-components";
import { useNodes } from "../../node-service/node-provider";
import { useEffect, useState } from "react";
import ParamsService from "./service/params-service";
import { ParamItem } from "./service/params-serivice.types";

const NodeInputParamsType = ({ data, isConnectable }: any) => {
  const { nodes, nodeService } = useNodes();

  const [paramValues, setParamValues] = useState<ParamItem[]>([]);
  const [paramsService] = useState(() => new ParamsService(paramList));

  useEffect(() => {
    paramsService.params$.subscribe((params) => setParamValues(params));

    return () => {
      paramsService.dispose();
    };
  }, []);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box
        id={`box${data.id}`}
        sx={{
          width: "max-content",
          minHeight: "150px",
          background: "#2C2E33",
          border: "1px solid #000",
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "9px",
          transition: "all 0.3s",
        }}
      >
        <Wrapper
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          onDrag={(e) => {
            e.stopPropagation();
          }}
        >
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "12px",
                gap: "6px",
              }}
            >
              {paramValues.map((param) => (
                <FormItem key={param.label}>
                  <Box>{param.label}</Box>
                  <Box>
                    {param.type === "slider" && (
                      <>
                        <Slider
                          data-type="params"
                          value={param.value}
                          step={param.step}
                          min={param.min}
                          max={param.max}
                          size="small"
                          valueLabelDisplay="auto"
                          onChange={(e, value) => {
                            e.preventDefault();
                            e.stopPropagation();

                            paramsService.updateParam(
                              param.label,
                              value as number
                            );
                          }}
                        />

                        <TextField
                          sx={{
                            width: "38px",
                            minWidth: "38px",
                          }}
                          size="small"
                          value={param.value}
                          onChange={(e) => {
                            paramsService.updateParam(
                              param.label,
                              e.target.value
                            );
                          }}
                        />
                      </>
                    )}

                    {param.type === "select" && (
                      <Select
                        sx={{ width: "100%" }}
                        size="small"
                        data-type="select"
                        value={param.value}
                        onChange={(e) => {
                          paramsService.updateParam(
                            param.label,
                            e.target.value as string
                          );
                        }}
                      >
                        {param.options.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}

                    {param.type === "switch" && (
                      <Switch
                        size="small"
                        checked={param.value}
                        onChange={(e) => {
                          paramsService.updateParam(
                            param.label,
                            e.target.checked
                          );
                        }}
                        color="primary"
                      />
                    )}
                  </Box>
                </FormItem>
              ))}
            </Box>
          </>
        </Wrapper>
      </Box>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
};

const paramList: ParamItem[] = [
  {
    type: "slider",
    label: "Perimeter",
    value: 80,
    step: 1,
    min: 1,
    max: 100,
  },
  {
    type: "select",
    label: "Sec tmp",
    value: "LL",
    options: ["default", "CL type", "LL", "LI type", "II type"],
  },
  {
    type: "slider",
    label: "Sec int",
    value: 2,
    step: 1,
    min: 1,
    max: 4,
  },
  {
    type: "slider",
    label: "Density",
    value: 54000,
    step: 1000,
    min: 1000,
    max: 100000,
  },
  {
    type: "slider",
    label: "Min offset",
    value: 18,
    step: 5,
    min: 5,
    max: 50,
  },
  {
    type: "switch",
    label: "Attractors",
    value: false,
  },
];

const FormItem = styled.div`
  display: flex;
  gap: 9px;

  & .MuiSlider-root,
  & .MuiSwitch-switchBase {
    &,
    & * {
      color: #f9e05e;
    }
  }

  & .MuiSlider-rail {
    color: rgba(255, 255, 255, 0.4);
  }

  & .MuiSlider-thumb, & .MuiSwitch-thumb {
    outline: 2px solid #2C2E33 !important;
  }

  & .MuiSwitch-track {
    background-color: rgba(255, 255, 255, 0.4);
  }

  & .MuiInputBase-root {
    &,
    & * {
      color: white;
    }

    background: #4D4F55;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  & > div:first-child {
    font-size: 10px;
    width: 100%;
    max-width: 80px;
    overflow: hidden;
    align-self: center;

    &,
    & * {
      color: white;
    }
  }

  & > div:last-child {
    width: 100%;
    display: flex;
    min-width: 130px;
    gap: 6px;
    height: 24px;
    align-items: center;

    & .MuiInputBase-input {
      &,
      & * {
        height: 24px;
        padding: 0px 3px;
        font-size: 10px;
      }
    }
  }
`;

const Wrapper = styled.div`
  &&& {
    display: flex;
    flex-direction: column;
    width: 100%;

    & .MuiInputBase-root {
      padding: 0px;
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.8);
    }

    & .MuiButton-root {
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
`;

export default NodeInputParamsType;
