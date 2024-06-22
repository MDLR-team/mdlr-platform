import TagMessageService, {
  TagMessage,
} from "@/components/services/tag-message-service/tag-message-service";
import ActiveMessage from "@/components/ui/tag-messages/blocks/active-message/active-message";
import Messages from "@/components/ui/tag-messages/blocks/messages/messages";
import Statistics from "@/components/ui/tag-messages/blocks/statistics/statistics";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const MessagePage = () => {
  const router = useRouter();
  const { project_id } = router.query;

  const [messageService] = useState(
    () => new TagMessageService(project_id as string)
  );

  const [messages, setMessages] = useState<TagMessage[]>([]);

  useEffect(() => {
    const subscription = messageService.messages$.subscribe((messages) => {
      setMessages(messages);
    });

    return () => {
      subscription.unsubscribe();
      messageService.dispose();
    };
  }, []);

  console.log("messages", messages);

  return (
    <TagMessageContext.Provider value={messageService}>
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "flex-start",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            maxHeight: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <ActiveMessage />
          <Messages />
        </Box>

        <Statistics />
      </Box>
    </TagMessageContext.Provider>
  );
};

const TagMessageContext = createContext<TagMessageService | undefined>(
  undefined
);

export function useTagMessage() {
  const context = useContext(TagMessageContext);
  if (!context) {
    throw new Error("useTagMessage must be used within a TagMessageProvider");
  }
  return context;
}

export default MessagePage;
