import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TreeItem from "../tree-item/tree-item";
import { Summary } from "@/components/services/summary-service/summary-service.types";
import { useProject } from "@/components/services/project-services/project-service/project-provider";

const Tree = () => {
  const { projectService } = useProject();
  const summaryService = projectService.summaryService;

  const [activeSummary, setActiveSummary] = useState<Summary | null>(null);
  const [summaries, setSummaries] = useState<Summary[]>([]);

  useEffect(() => {
    const sub = summaryService.summaries$.subscribe((summaries) => {
      setSummaries(summaries);
    });
    const activeSub = summaryService.activeSummary$.subscribe((summary) =>
      setActiveSummary(summary)
    );

    return () => {
      sub.unsubscribe();
      activeSub.unsubscribe();
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {summaries.map((item) => {
        const isActive = activeSummary?.id === item.id;

        return <TreeItem key={item.id} item={item} isActive={isActive} />;
      })}
    </Box>
  );
};

export default Tree;
