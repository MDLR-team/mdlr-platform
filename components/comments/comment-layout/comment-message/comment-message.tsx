import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { supabase } from "@/components/supabase-client";

const CommentMessage = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    try {
      const { data, error } = await supabase.from("comments").insert([
        { content: comment }, // Assuming 'content' is the column name
      ]);

      if (error) throw error;

      console.log("Comment added:", data);
      setComment(""); // Reset the input field after successful submission
    } catch (error) {
      console.error("Error inserting comment:", error);
    }
  };

  return (
    <Box
      component="form"
      sx={{ p: 2, borderTop: 1, borderColor: "divider", flexShrink: 0 }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Write a comment..."
        multiline
        fullWidth
        rows={4}
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
  );
};

export default CommentMessage;
