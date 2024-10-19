import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTagProject } from "@/pages/messages/catalog";

const ProjectNewForm = () => {
  const tagProjectService = useTagProject();

  const [open, setOpen] = useState(true);
  const [projectName, setProjectName] = useState("");
  const [tags, setTags] = useState(["", "", ""]);

  const handleAddTag = () => {
    setTags([...tags, ""]);
  };

  const handleTagChange = (index: any, value: any) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleSubmit = () => {
    tagProjectService.createTagProject({
      name: projectName,
      tags: tags.filter((tag) => tag !== ""),
    });
  };

  const clearForm = () => {
    setProjectName("");
    setTags(["", "", ""]);
  };

  useEffect(() => {
    const subscription = tagProjectService.isProjectWindowOpen$.subscribe(
      (open: boolean) => setOpen(open)
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!open) {
      clearForm();
    }
  }, [open]);

  return (
    <>
      <Modal open={open} onClose={() => tagProjectService.closeProjectWindow()}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box sx={{ fontSize: "16px" }}>New Project</Box>
            <TextField
              fullWidth
              label="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              size="small"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box sx={{ fontSize: "16px" }}>Tags</Box>
            {tags.map((tag, index) => (
              <TextField
                key={index}
                fullWidth
                label={`Tag ${index + 1}`}
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                size="small"
              />
            ))}
            <Box textAlign="center" marginBottom={2}>
              <IconButton onClick={handleAddTag}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Create Project
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectNewForm;
