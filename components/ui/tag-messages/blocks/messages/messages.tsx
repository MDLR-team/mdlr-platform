import { useTagMessage } from "@/pages/messages/project/[project_id]";
import Message from "../message/message";
import { TagMessage } from "@/components/services/tag-message-service/tag-message-service";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

const Messages = () => {
  const messageService = useTagMessage();

  const [messages, setMessages] = useState<TagMessage[]>([]);

  useEffect(() => {
    const subscription = messageService.messages$.subscribe((messages) => {
      setMessages(messages);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "300px",
        height: "100%",
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          maxWidth: "300px",
          minWidth: "300px",
          minHeight: "max-content",
        }}
      >
        {messages.map((message) => (
          <Message key={message.id} data={message} />
        ))}
      </Box>
    </Box>
  );
};

export default Messages;
