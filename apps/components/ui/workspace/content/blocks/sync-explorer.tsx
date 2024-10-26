import ExplorerService, {
  ExplorerItem,
} from "@/components/explorer/explorer-service/explorer-service";
import ProjectsLayout from "@/components/layout/projects/projects";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";

import FolderIcon from "@mui/icons-material/Folder";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { v4 as uuidv4 } from "uuid";
import { useWorkspace } from "@/components/services/workspace-services/workspace/workspace-provider";
import { useAuth } from "@/components/services/app-services/auth/auth-provider";

const SyncExplorer = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const { authService } = useAuth();
  const { workspaceService } = useWorkspace();

  const [history, setHistory] = useState<ExtractedIds[]>([]);

  const [data, setData] = useState<ExplorerItem[]>([]);
  const [explorerService] = useState<ExplorerService>(
    () => new ExplorerService()
  );
  const [projectId, setProjectId] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string | null>(null);
  const [uuid, setUuid] = useState<string>(uuidv4());
  const { projects } = useWorkspace();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("info");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const [browserReady, setBrowserReady] = useState(false);

  useEffect(() => {
    explorerService.provideStates({
      project_id: projectId as any,
      folder_id: folderId as any,
      setStatus,
      setData,
    });

    explorerService.init();
  }, [uuid]);

  useEffect(() => {
    const autoBrowsing = explorerService.autoBrowsing;

    if (autoBrowsing.length > 0) {
      const firstItem = data[0];

      if (firstItem) {
        const link = firstItem.link;
        const { projectId, folderId } = extractIdsFromUrl(link);

        setProjectId(projectId);
        setFolderId(folderId);
        setUuid(uuidv4());

        explorerService.checkAutoBrowsing();
      }
    } else {
      setBrowserReady(true);
    }
  }, [data]);

  useEffect(() => {
    setHistory((prevHistory) => [...prevHistory, { projectId, folderId }]);
  }, [uuid]);

  return (
    <>
      {status === "loading" || !browserReady ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "max-content !important",
            display: "block",
            border: "0px !important",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            disabled={history.length === 0} // Disable if there's no history
            onClick={() => {
              const previousState = history[history.length - 2];

              if (previousState) {
                setHistory((prevHistory) =>
                  prevHistory.slice(0, prevHistory.length - 2)
                );

                setProjectId(previousState.projectId);
                setFolderId(previousState.folderId);
                setUuid(uuidv4());
              }
            }}
          >
            Back
          </Button>

          <Table
            sx={{
              maxHeight: "max-content !important",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                {/* Add more table headers as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => {
                return (
                  <TableRow
                    key={item.id}
                    style={{ cursor: "pointer", maxHeight: "48px" }}
                    onClick={async () => {
                      if (item.disabled) return;

                      if (item.type === "items") {
                        //const link = await explorerService.getViewerLink(item);
                      } else {
                        const { projectId, folderId } = extractIdsFromUrl(
                          item.link
                        );

                        setProjectId(projectId);
                        setFolderId(folderId);
                        setUuid(uuidv4());
                      }
                    }}
                  >
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: "16px",
                          opacity: item.disabled ? 0.5 : 1,
                          cursor: item.disabled ? "not-allowed" : "pointer",
                        }}
                      >
                        {item.type === "folders" ? (
                          <FolderIcon />
                        ) : item.type === "items" ? (
                          <ViewInArIcon />
                        ) : (
                          ""
                        )}
                        <div>{item.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="flex-end">
                        {item.type === "items" && (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={async () => {
                              const urn = await explorerService.getViewerUrn(
                                item
                              );
                              const needsSync = !projects.some(
                                (project) => project.bim_urn === urn
                              );

                              // Set the alert message based on the sync status
                              if (needsSync) {
                                // needs to day that model is being synchronized
                                setAlertMessage(
                                  "This model is being synchronized. Please wait."
                                );
                                setAlertSeverity("warning");

                                await explorerService.createModel(
                                  authService,
                                  urn,
                                  item.name,
                                  workspaceService.activeWorkspace$.value
                                    ?.id as any
                                );

                                window.location.href = "/workspace";
                              } else {
                                setAlertMessage(
                                  "This model is already synchronized."
                                );
                                setAlertSeverity("success");
                              }

                              // Open the snackbar with the appropriate message
                              setOpenSnackbar(true);
                            }}
                          >
                            Sync
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                    {/* Add more table cells for other properties */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Snackbar for alerts */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={60000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

function extractIdsFromUrl(url: string): ExtractedIds {
  const projectIdMatch = url.match(/\/projects\/([^\/]+)/);
  const folderIdMatch = url.match(/\/folders\/([^\/]+)/);

  const projectId = projectIdMatch ? projectIdMatch[1] : null;
  const folderId = folderIdMatch ? folderIdMatch[1] : null;

  return { projectId, folderId };
}

type ExtractedIds = {
  projectId: string | null;
  folderId: string | null;
};

export default SyncExplorer;
