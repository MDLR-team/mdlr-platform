import { TagProject } from "@/components/services/tag-project-service/tag-project-service";
import { useTagProject } from "@/pages/messages/catalog";
import { Box } from "@mui/material";
import stc from "string-to-color";
import styled from "styled-components";

const ProjectItem: React.FC<{
  data?: TagProject;
  isNew?: boolean;
}> = ({ data, isNew }) => {
  const tagProjectService = useTagProject();

  if (isNew)
    return (
      <Wrapper onClick={() => tagProjectService.openProjectWindow()}>
        + New Project
      </Wrapper>
    );

  if (!data) return null;

  return (
    <Wrapper
      onClick={() => {
        location.href = `/messages/project/${data.id}`;
      }}
    >
      <Box>{data.name}</Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "3px",
        }}
      >
        {data.tags.map((tag: string, i) => (
          <Tag key={i} color={stc(tag)}>
            {tag}
          </Tag>
        ))}
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  cursor: pointer;

  min-height: 200px;

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

export default ProjectItem;
