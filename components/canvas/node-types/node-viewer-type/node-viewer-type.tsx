import { Box } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import styled from "styled-components";
import { useNodes } from "../../node-service/node-provider";
import ViewerService from "./service/viewer-service";
import { Project } from "@/components/types/supabase-data.types";

const NodeViewerType = ({ data, isConnectable }: any) => {
  const { nodes, nodeService } = useNodes();

  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);

  const [viewerService] = useState(
    () => new ViewerService(nodeService, data.id)
  );

  const [projectMetadata, setProjectMetadata] = useState<any | null>(null);

  useEffect(() => {
    const p1 = viewerService.project$.subscribe((project) => {
      setLoading(false);
      setLoaded(true);

      setProjectMetadata(project);
    });

    const p2 = viewerService.projects$.subscribe((projects) => {
      setProjects(projects);
    });

    return () => {
      p1.unsubscribe();
      p2.unsubscribe();

      viewerService.dispose();
    };
  }, []);

  return (
    <NodeViewerContext.Provider
      value={{
        loading,
        loaded,
        viewerService,
      }}
    >
      <div className="text-updater-node">
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />

        <Wrapper id={`box${data.id}`}>
          {!projectMetadata && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Select a model for insights
            </Box>
          )}

          {projectMetadata && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {projectMetadata.name}
            </Box>
          )}

          {!projectMetadata && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "4px",
                position: "relative",
              }}
            >
              {projects.map((project) => (
                <Thumbnail
                  sx={{
                    paddingBottom: "80%",
                    backgroundColor: "lightgrey",
                    backgroundImage: `url(${project.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "9px",
                  }}
                  key={project.id}
                  onClick={() => viewerService.fetchProject(project.bim_urn)}
                ></Thumbnail>
              ))}

              {projects.length < 4 &&
                Array.from({ length: 4 - projects.length }).map((_, index) => (
                  <Box
                    sx={{
                      paddingBottom: "80%",
                      borderRadius: "9px",
                      border: "1px dashed black",
                    }}
                    key={index}
                  ></Box>
                ))}
            </Box>
          )}

          {projectMetadata && (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                backgroundImage: `url(${projectMetadata.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
          )}
          {/* 

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
                  aria-label="file upload options"
                  sx={{ fontSize: "8px", maxWidth: "max-content" }}
                >
                  <Tab data-role="uploadFileTab" label="Upload File" />
                  <Tab data-role="apiTab" label="API" />
                </Tabs>
              </Box>
              dsdfdfsdf
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
                sdfsdf
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

          */}
        </Wrapper>

        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          isConnectable={isConnectable}
        />
      </div>
    </NodeViewerContext.Provider>
  );
};

export const NodeViewerContext = createContext<{
  loading: boolean;
  loaded: boolean;
  viewerService: ViewerService;
} | null>(null);

export function useNodeViewer() {
  const service = useContext(NodeViewerContext);

  if (service === null) {
    throw new Error("useNodeViewer must be used within a NodeViewerContext");
  }

  return service;
}

const Thumbnail = styled(Box)`
  border: 1px solid transparent;

  &:hover {
    border: 1px solid black;
  }
`;

const Wrapper = styled.div`
  width: 230px;
  height: 210px;
  background: white;
  border: 2px solid black;
  border-radius: 9px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;

  & > * {
    width: 100%;
  }

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

export default NodeViewerType;
