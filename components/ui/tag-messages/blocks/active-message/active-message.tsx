import { useTagMessage } from "@/pages/messages/project/[project_id]";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const ActiveMessage = () => {
  const messageService = useTagMessage();

  const [activeMessage, setActiveMessage] = useState<string>("");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "300px",
        padding: "10px 0px",
      }}
    >
      <TextField
        multiline
        maxRows={6}
        value={activeMessage}
        onChange={(e) => {
          setActiveMessage(e.target.value);
        }}
      />

      <Button
        color="primary"
        variant="contained"
        onClick={async () => {
          await messageService.addMessage({
            content: activeMessage,
            tags: [],
            subtags: [],
            project_id: "1",
          });

          setActiveMessage("");
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ActiveMessage;
