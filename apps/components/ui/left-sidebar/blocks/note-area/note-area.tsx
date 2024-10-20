import { Box } from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import suggestion from "./suggestions";

import Mention from "@tiptap/extension-mention";
import styled from "styled-components";
import { CommentReference } from "./blocks/referencet";
import { useState } from "react";
import debounce from "@mui/material";

const NoteArea = () => {
  const [processedTickets, setProcessedTickets] = useState<string[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      // Mention configuration for '@' mentions
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion,
      }),
      CommentReference,
    ],
    content: `<h1>Roof Drainage System Review</h1><p>Today, we focused on reviewing the roof drainage system for the new civic center. There’s been ongoing concern about whether the current system can handle the expected rainfall levels, especially with the increasing unpredictability of weather patterns</p><p></p><p><span class="mention" data-type="mention" data-id="Christina Applegate">@Christina Applegate</span> pointed out a potential risk of overflow during heavy rains. I’ve tagged Charlie Davies to check the system’s capacity, but there seems to be an underlying feeling that we might need to upgrade the drainage system entirely.</p><p></p><p><span class="mention" data-type="mention" data-id="Cyndi Lauper">@Cyndi Lauper</span> I’m still reflecting on how this decision will impact the project timeline and budget, but better to raise these concerns now than deal with them later when issues become more costly to fix. Tomorrow, I’ll have to schedule a meeting to review potential design revisions based on today’s findings.</p>`,
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const ticketPattern = /\$([0-9]+)/g;
      const matches = text.match(ticketPattern);

      if (matches) {
        matches.forEach(async (match) => {
          const ticketId = match.slice(1);

          // Skip if this ticketId has already been processed
          if (processedTickets.includes(ticketId)) {
            return;
          }

          const ticketData = await fetchTicketData(ticketId);

          if (ticketData) {
            console.log("e", editor.commands);

            try {
              // Insert the comment reference for the matched ticket
              (editor.commands as any).insertCommentReference(
                ticketData.id,
                ticketData.author,
                ticketData.content,
                ticketData.avatar
              );

              // Add this ticketId to processedTickets state
              setProcessedTickets((prev) => [...prev, ticketId]);
            } catch (e) {
              console.log(e);
            }
          }
        });
      }
    },
  });

  return (
    <Wrapper>
      <EditorContent editor={editor} className="tiptap-editor" />
    </Wrapper>
  );
};

const fetchTicketData = async (ticketId: any) => {
  const dummyData = {
    123: {
      id: 123,
      author: "John Doe",
      content: "This is the ticket description for ticket #123.",
      avatar: "https://example.com/avatar.jpg",
    },
    575: {
      id: 575,
      author: "Jane Smith",
      content: "Another important ticket content for ticket #575.",
      avatar: "https://example.com/avatar2.jpg",
    },
  };

  return ((dummyData as any)[ticketId] as any) || null;
};

const Wrapper = styled(Box)`
  height: 100%;
  background-color: white;
  pointer-events: auto;

  display: flex;
  flex-direction: column;
`;

export default NoteArea;
