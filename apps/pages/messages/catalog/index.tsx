import TagProjectService, {
  TagProject,
} from "@/components/services/tag-project-service/tag-project-service";
import ProjectItem from "@/components/ui/tag-messages/blocks/project-item/project-item";
import ProjectNewForm from "@/components/ui/tag-messages/blocks/project-new-form/project-new-form";
import { Box } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";

const CatalogPage = () => {
  const [tagProjectService] = useState(() => new TagProjectService());

  const [projects, setProjects] = useState<TagProject[]>([]);

  useEffect(() => {
    const subscription = tagProjectService.tagProjects$.subscribe(
      (projects) => {
        setProjects(projects);
      }
    );

    return () => {
      subscription.unsubscribe();
      tagProjectService.dispose();
    };
  }, []);

  return (
    <TagProjectContext.Provider value={tagProjectService}>
      <ProjectNewForm />

      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <ProjectItem isNew />

          {projects.map((project) => (
            <ProjectItem key={project.id} data={project} />
          ))}
        </Box>
      </Box>
    </TagProjectContext.Provider>
  );
};

const TagProjectContext = createContext<TagProjectService | undefined>(
  undefined
);

export function useTagProject() {
  const context = useContext(TagProjectContext);
  if (!context) {
    throw new Error("useTagProject must be used within a TagProjectProvider");
  }

  return context;
}

export default CatalogPage;
