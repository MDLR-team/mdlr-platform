import { Box, Button, CircularProgress, Tab, Tabs } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import styled from "styled-components";
import UploadFile from "./blocks/upload-file/upload-file";
import UploadApi from "./blocks/upload-api/upload-api";
import ModelService from "./service/model-service";
import { NodeModelMetadata } from "./service/model-service.types";
import { useNodes } from "../../node-service/node-provider";

const NodeThumbType = ({ data, isConnectable }: any) => {
  const { nodes, nodeService } = useNodes();

  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [metadata, setMetadata] = useState<NodeModelMetadata | null>(null);

  const [modelService] = useState<ModelService>(
    () => new ModelService(nodeService, data.id)
  );

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const lodSub = modelService.loading$.subscribe((loading) =>
      setLoading(loading)
    );
    const lodSub2 = modelService.loaded$.subscribe((loaded) =>
      setLoaded(loaded)
    );
    const mdSub = modelService.metadata$.subscribe((metadata) =>
      setMetadata(metadata)
    );

    return () => {
      lodSub.unsubscribe();
      lodSub2.unsubscribe();
      mdSub.unsubscribe();
      modelService.dispose();
    };
  }, [modelService]);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <NodeModelContext.Provider
      value={{
        modelService,
        loading,
        loaded,
        metadata,
      }}
    >
      <div className="text-updater-node">
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />

        <Wrapper id={`box${data.id}`}>
          {/* Upload Model with any method */}
          {!(loading || loaded) && (
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Tabs
                  value={tabIndex}
                  onChange={handleChangeTab}
                  aria-label="file upload options"
                  sx={{ fontSize: "8px", maxWidth: "max-content" }}
                >
                  <Tab data-role="uploadFileTab" label="Upload File" />
                  <Tab data-role="apiTab" label="API" />
                </Tabs>
              </Box>

              {tabIndex === 0 && <UploadFile />}
              {tabIndex === 1 && <UploadApi />}
            </>
          )}

          {loading && (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "grey",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "9px",
              }}
            >
              {loading && <CircularProgress />}
            </Box>
          )}

          {/* Loading State or Model preview */}
          {loaded && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  padding: "10px",
                  borderRadius: "9px",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                }}
              >
                {metadata?.endpoint || ""}
              </Box>

              <Box
                data-type="thumbnail"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "9px",
                  backgroundImage: `url('${metadata?.thumbnail || ""}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <Box
                  data-type="hover-view"
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{
                      backgroundColor: "white !important",
                      fontSize: "12px",
                    }}
                  >
                    View model
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Wrapper>

        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          isConnectable={isConnectable}
        />
      </div>
    </NodeModelContext.Provider>
  );
};

export const NodeModelContext = createContext<{
  modelService: ModelService;
  loading: boolean;
  loaded: boolean;
  metadata: NodeModelMetadata | null;
} | null>(null);

export function useNodeModel() {
  const service = useContext(NodeModelContext);

  if (service === null) {
    throw new Error("useNodeModel must be used within a NodeModelContext");
  }

  return service;
}

const Wrapper = styled.div`
  width: 230px;
  height: 210px;
  background: white;
  border: 2px solid black;
  border-radius: 9px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 9px;

  & .MuiTab-root {
    min-width: max-content !important;
  }

  & *[data-type="thumbnail"] {
    & > *[data-type="hover-view"] {
      opacity: 0;
      transition: opacity 0.3s;
    }

    &:hover {
      & > *[data-type="hover-view"] {
        opacity: 1;
      }
    }
  }
`;

export default NodeThumbType;
