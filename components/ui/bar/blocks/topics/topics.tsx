import { ProjectItem } from "@/components/explorer/explorer-service/explorer-service";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import { ProjectTopic } from "@/components/services/project-services/project-service/project-service";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Wrapper
          sx={{
            display: "flex",
            gap: "6px",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField
            sx={{ margin: "0px" }}
            multiline
            fullWidth
            rows={1}
            disabled
            value={""}
            onChange={(e) => true}
            variant="outlined"
            required
            size="small"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    style={{
                      fontSize: "16px",
                      color: "#8C8C8C !important",
                      opacity: 0.5,
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <Button
            sx={{
              minWidth: "max-content",
            }}
            disabled
            variant="contained"
            color="primary"
            size="small"
          >
            + New topic
          </Button>
        </Wrapper>
      </Box>

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

const Wrapper = styled(Box)`
  & .MuiInputBase-root {
    border-radius: 9px;

    height: 27px;
  }
`;

export default Topics;
