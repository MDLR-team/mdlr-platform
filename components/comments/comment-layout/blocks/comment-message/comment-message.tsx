import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { supabase } from "@/components/supabase-client";
import { useMarkup } from "../../../markup-provider/markup-provider";
import styled from "styled-components";
import { useProject } from "@/components/project/project-provider";
import { useAuth } from "@/components/auth/auth-provider";

const CommentMessage = () => {
  const [comment, setComment] = useState("");
  const { markupPosition, markupsExtension, setMarkupPosition } = useMarkup();

  const { projectService } = useProject();
  const { userMetadata } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    // Check if markupPosition is not empty. Adjust the condition based on the expected structure of markupPosition.
    if (!markupPosition || Object.keys(markupPosition).length === 0) {
      console.error("Cannot add comment without a markup position.");
      // Optionally, inform the user through UI that the markup position is required.
      return; // Skip the rest of the function if validation fails.
    }

    try {
      console.log("userMetadata", userMetadata);

      const { data, error } = await supabase.from("comments").insert([
        {
          content: comment,
          markup_position: markupPosition,
          project_id: projectService!.id,
          author_id: userMetadata!.id,
        }, // Assuming 'content' is the column name
      ]);

      if (error) throw error;

      console.log("Comment added:", data);
      setComment(""); // Reset the input field after successful submission
    } catch (error) {
      console.error("Error inserting comment:", error);
    }

    markupsExtension?.enable(false);
    setMarkupPosition(null);
  };

  if (!markupPosition) return <></>;

  return (
    <Wrapper>
      <Box
        component="form"
        sx={{ p: 2, borderTop: 1, borderColor: "divider", flexShrink: 0 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          placeholder="Write a comment..."
          multiline
          fullWidth
          rows={2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &&&& {
    &,
    & * {
      font-size: 12px;
    }
  }

  & form.MuiBox-root {
    padding: 0px;
    margin-bottom: 9px;
    border-color: rgba(0, 0, 0, 0);

    & .MuiFormControl-root {
      margin-top: 0px;
    }
  }
`;

export default CommentMessage;