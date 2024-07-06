import { useProject } from "@/components/services/project-services/project-service/project-provider";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Topics = () => {
  const { projectService } = useProject();

  const [topics, setTopics] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const ts = projectService.topics$.subscribe((topics) => {
      setTopics(topics);
    });

    return () => ts.unsubscribe();
  }, [projectService]);

  console.log("topic AAs", topics);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "10px",
        overflow: "hidden",
      }}
    >
      {Array.from(topics).map(([key, value]) => (
        <Box
          key={key}
          sx={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              //whiteSpace: "nowrap",
            }}
          >
            {value}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Topics;
