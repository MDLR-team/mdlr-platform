import { ProjectItem } from "@/components/explorer/explorer-service/explorer-service";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import { ProjectTopic } from "@/components/services/project-services/project-service/project-service";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Topics = () => {
  const { projectService } = useProject();

  const [topics, setTopics] = useState<Map<string, string>>(new Map());
  const [topicItems, setTopicItems] = useState<ProjectTopic[]>([]);

  useEffect(() => {
    const ts = projectService.topics$.subscribe((topics) => {
      setTopics(topics);
    });

    const tis = projectService.topicsItems$.subscribe((topicItems) => {
      const topicsArray = Array.from(topicItems.entries()).map(
        ([key, value]) => value
      );

      setTopicItems(topicsArray);
    });

    return () => {
      ts.unsubscribe();
      tis.unsubscribe();
    };
  }, [projectService]);

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
      {topicItems.map(({ id, prompt, name, tags }, i) => (
        <Box
          key={i}
          sx={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <Box
            sx={{
              fontWeight: "bold",
            }}
          >
            {name}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2px",
              marginBottom: "6px",
            }}
          >
            {tags.map((tag, i) => (
              <Box
                key={i}
                sx={{
                  backgroundColor: "#f0f0f0",
                  padding: "2px 4px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 1)",
                  border: "1px solid #ccc",
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "rgba(0, 0, 0, 0.54)",
              whiteSpace: "pre-wrap",
              //whiteSpace: "nowrap",
            }}
          >
            {prompt}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Topics;
