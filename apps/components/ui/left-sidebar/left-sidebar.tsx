import { Box, Button } from "@mui/material";
import NoteArea from "./blocks/note-area/note-area";
import NavBar from "./blocks/nav-bar/nav-bar";
import Explorer from "./blocks/explorer/explorer";
import { LeftSidebarProvider } from "./use-left-sidebar";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import { useEffect, useState } from "react";
import { Summary } from "@/components/services/summary-service/summary-service.types";
import moment from "moment";

const LeftSidebar = () => {
  const { projectService } = useProject();
  const summaryService = projectService.summaryService;

  const [activeSummary, setActiveSummary] = useState<Summary | null>(null);

  useEffect(() => {
    const sub = summaryService.activeSummary$.subscribe((summary) =>
      setActiveSummary(summary)
    );

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <LeftSidebarProvider>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          pointerEvents: "all",
          padding: "var(--mr-gap-m) 0px var(--mr-gap-m) var(--mr-gap-m)",
          zIndex: 2,
          transition: "all 0.3s",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
            maxHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            border: "var(--mr-border)",
            borderRadius: "var(--mr-border-radius)",
            boxShadow: "var(--shadow)",
          }}
        >
          <NavBar />

          <Box
            sx={{
              position: "relative",
              display: "flex",
              height: "100%",
              maxHeight: "100%",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <Explorer />

            <Box
              sx={{
                width: "100%",
                height: "100%",
                minWidth: "350px",
                maxHeight: "100%",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {" "}
              {activeSummary && (
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "var(--gray-1)",
                    borderBottom: "1px solid var(--gray-3)",
                    padding: "6px 16px",
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    {`It was updated ${moment(
                      activeSummary.updated_at
                    ).fromNow()}`}
                  </Box>

                  <Box>
                    <Button
                      size="small"
                      onClick={() => summaryService.generateSummary()}
                      sx={{
                        border: "1px solid var(--gray-3)",
                      }}
                    >
                      Refresh
                    </Button>
                  </Box>
                </Box>
              )}
              <NoteArea />
            </Box>
          </Box>
        </Box>
      </Box>
    </LeftSidebarProvider>
  );
};

export default LeftSidebar;
