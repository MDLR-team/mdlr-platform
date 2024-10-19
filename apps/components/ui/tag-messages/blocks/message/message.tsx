import { TagMessage } from "@/components/services/tag-message-service/tag-message-service";
import { Box } from "@mui/material";
import styled from "styled-components";
import stc from "string-to-color";

const Message: React.FC<{
  data: TagMessage;
}> = ({ data }) => {
  return (
    <Wrapper>
      <Box>&quot;{data.content}&quot;</Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <Box>Main tags</Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "3px",
          }}
        >
          {data.tags.map((tag, i) => (
            <Tag key={i} color={stc(tag.value)}>
              {tag.value} : {tag.relevance}
            </Tag>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <Box>Subtags</Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "3px",
          }}
        >
          {data.subtags.map((tag, i) => (
            <Tag key={i} color={stc(tag.parentTag)}>
              {tag.value} : {tag.relevance}
            </Tag>
          ))}
        </Box>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 1rem;

  max-width: 300px;
  min-width: 300px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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

export default Message;
