import { useTagMessage } from "@/pages/messages/project/[project_id]";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import stc from "string-to-color";
import styled from "styled-components";

const Statistics = () => {
  const messageService = useTagMessage();

  const [statistics, setStatistics] = useState<Map<string, Set<string>>>(
    new Map()
  );

  useEffect(() => {
    const subscription = messageService.statistics$.subscribe((statistics) => {
      setStatistics(statistics);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      <h1>Statistics</h1>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {Array.from(statistics.keys()).map((key) => (
          <div key={key}>
            <h2>{key}</h2>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "3px",
              }}
            >
              {Array.from(statistics.get(key) || []).map((tag, i) => (
                <Tag key={i} color={stc(key)}>
                  {tag}
                </Tag>
              ))}
            </Box>
          </div>
        ))}
      </Box>
    </Wrapper>
  );
};

const Tag = styled.div`
  background-color: ${({ color }: any) => color};
  border-radius: 4px;
  padding: 1px 2px;
  margin-bottom: 3px;

  &,
  & * {
    font-size: 10px;
    font-weight: 600;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  background-color: white;
`;

export default Statistics;
