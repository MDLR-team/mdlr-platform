import { Box, Button, TextField, CircularProgress } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { useActionArea } from "../actions-area/actions-area";
import { useComment } from "@/components/services/project-services/comment-service/comment-provider";
import { useProject } from "@/components/services/project-services/project-service/project-provider";

const SummaryAction = () => {
  const { actionType, editor, handleAction } = useActionArea();
  const { projectService } = useProject();
  const { comments } = useComment();

  const promptSearchService = projectService.promptSearchService;

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const insertStructuredContent = (text: string) => {
    const segments = text.split(/(## .+|@\w+)/g); // Split by headings (##) and mentions (@username)

    segments.forEach((segment) => {
      const mentionPattern = /^@(\w+)/;
      const headingPattern = /^##(.+)/;

      if (mentionPattern.test(segment)) {
        const mentionMatch = mentionPattern.exec(segment);

        console.log("mentionMatch", mentionMatch);
        if (mentionMatch) {
          editor
            .chain()
            .focus()
            .insertContent({
              type: "mention",
              attrs: {
                id: mentionMatch[1],
                label: `${mentionMatch[1]}`,
              },
            })
            .run();
        }
      } else if (headingPattern.test(segment)) {
        const headingMatch = headingPattern.exec(segment);
        console.log("headingMatch", headingMatch);

        if (headingMatch) {
          editor
            .chain()
            .focus()
            .insertContent({
              type: "heading",
              attrs: { level: 2 }, // Level 2 for headings starting with ##
              content: [{ type: "text", text: headingMatch[1] }],
            })
            .run();
        }
      } else {
        // Insert remaining text as plain content
        editor.chain().focus().insertContent(segment).run();
      }
    });
  };

  const typeTextToEditor = async (text: string) => {
    const segments = text.split(/(\s+|,|\.|\n)/); // Split by spaces, punctuation, and newlines

    console.log("text", text);

    let index = 0;
    const interval = setInterval(() => {
      if (index < segments.length) {
        const textSegment = segments[index];
        insertStructuredContent(textSegment); // Send the entire segment to `insertStructuredContent`
        index++;
      } else {
        clearInterval(interval); // Stop the typing effect once done
        setLoading(false);
      }
    }, 20); // Adjust speed by changing the interval duration
  };

  const onComplete = async () => {
    setLoading(true);

    if (editor) {
      const systemMessage = `Summarize the AEC-related comments based on the user's prompt: "${value}". Use only the comments provided, keeping the response within 1000 characters, and divide it into paragraphs for clear readability. If mentioning a user, format their name exactly as @First_Last (using an underscore between first and last names. important!). No additional information beyond these comments.`;
      const userMessage = comments
        .map(
          (comment) =>
            `[${comment.author_username.replace(/\s+/g, "_")}: ${
              comment.content
            }`
        )
        .join("\n");

      // First request: Generate the title
      const titleSystemMessage = `Generate a concise title for the following content based on the user's prompt: "${value}". The title should be short, informative, and capture the essence of the content.`;
      const title = await promptSearchService.sendGptRequest(
        titleSystemMessage,
        userMessage
      );

      // Clear editor content first to ensure a clean slate
      editor
        .chain()
        .focus()
        .deleteRange({ from: 0, to: editor.state.doc.content.size })
        .run();

      // Insert the title as a heading
      editor
        .chain()
        .focus()
        .insertContent({
          type: "heading",
          attrs: { level: 1 }, // Insert as top-level heading
          content: [{ type: "text", text: title.trim().replace(/^"|"$/g, "") }],
        })
        .run();

      // Insert a paragraph node or line break to reset styling
      editor.chain().focus().insertContent("<p>  </p>").run();

      const result = await promptSearchService.sendGptRequest(
        systemMessage,
        userMessage
      );

      const wrappedValue = `${result}`;

      // Clear editor content and start typing the result
      editor.chain().focus().run();
      typeTextToEditor(wrappedValue); // Use typing effect for result text
    }

    // Perform the action
    setLoading(false);
    setValue("");
    handleAction(null);
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
        minRows={5}
        maxRows={10}
        placeholder="Describe what you want summarized from comments or media, e.g., '@John_Doe's comments on safety"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        variant="outlined"
        required
        size="small"
        margin="normal"
        sx={{
          fontSize: "14px",
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
