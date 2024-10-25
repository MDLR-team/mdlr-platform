import { Box, Button, TextField, CircularProgress } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { useActionArea } from "../actions-area/actions-area";
import { useComment } from "@/components/services/project-services/comment-service/comment-provider";
import { useProject } from "@/components/services/project-services/project-service/project-provider";

const SummaryAction = () => {
  const { actionType, editor } = useActionArea();
  const { projectService } = useProject();
  const { comments } = useComment();

  const promptSearchService = projectService.promptSearchService;

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const onComplete = async () => {
    setLoading(true);

    if (editor) {
      const systemMessage = `Summarize the AEC-related comments based on the user's prompt: "${value}". Use only the comments provided, keeping the response within 1000 characters, and divide it into paragraphs for clear readability. No additional information beyond these comments.`;
      const userMessage = comments
        .map((comment) => `[${comment.author_username}]: ${comment.content}`)
        .join("\n");

      const result = await promptSearchService.sendGptRequest(
        systemMessage,
        userMessage
      );

      const wrappedValue = `[realtime-summary]${result}[/realtime-summary]`;

      editor.chain().focus().insertContent(wrappedValue).run();
    }

    // Perform the action
    setLoading(false);
  };

  const clearQuery = () => {
    setValue("");
  };

  useEffect(() => {
    setValue("");
  }, [actionType]);

  if (actionType !== "add-summary") return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow)",
        border: "1px solid var(--gray-3)",
        padding: "16px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        pointerEvents: "all",
        minWidth: "300px",
      }}
    >
      <TextField
        multiline
        fullWidth
        minRows={2}
        maxRows={10}
        placeholder="Search any prompt. For example: 'Show me all comments by John and sort by date'"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        variant="outlined"
        required
        size="small"
        margin="normal"
        sx={{
          margin: "0px",
          border: "0px !important",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
          },
        }}
        InputProps={{
          endAdornment: value && (
            <Box
              onClick={clearQuery}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CancelIcon
                style={{
                  fontSize: "16px",
                  color: "#8C8C8C !important",
                }}
                color="inherit"
              />
            </Box>
          ),
        }}
      />

      <Button
        size="small"
        sx={{ maxWidth: "100px" }}
        variant="contained"
        color="primary"
        onClick={onComplete}
        disabled={loading}
      >
        {loading ? <CircularProgress size={16} color="inherit" /> : "Go"}
      </Button>
    </Box>
  );
};

export default SummaryAction;
