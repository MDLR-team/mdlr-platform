import { Box } from "@mui/material";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import suggestion from "./suggestions";

import Mention from "@tiptap/extension-mention";
import styled from "styled-components";
import { CommentReference } from "./blocks/nodes/referencet";
import { useWorkspace } from "@/components/services/workspace-services/workspace/workspace-provider";
import { useComment } from "@/components/services/project-services/comment-service/comment-provider";
import CommentService from "@/components/services/project-services/comment-service/comment-service";
import { useMarkup } from "@/components/services/markup-service/markup-provider";
import ActionsArea from "./blocks/actions-area/actions-area";
import { RealtimeSummary } from "./blocks/nodes/realtime-summary";

const NoteArea = () => {
  const { workspaceService } = useWorkspace();
  const { commentService } = useComment();
  const { markupService } = useMarkup();

  const editor = useEditor({
    extensions: [
      StarterKit,
      // Mention configuration for '@' mentions
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion: suggestion(workspaceService), // Use the latest workspace users
      }),
      CommentReference,
      RealtimeSummary,
    ],
    content: `<h1>Untitled Document</h1><p>Click "Actions" to add any AI actions, or use mentions to tag someone.</p>`,
    onUpdate: ({ editor }) => {
      const text = editor.getText();

      const ticketPattern = /\$([0-9]+)/g; // Match $ followed by a number (e.g., $575)
      const summaryPattern = /\[realtime-summary\](.*?)\[\/realtime-summary\]/g; // Match [realtime-summary]...[/realtime-summary]

      let match;

      // Loop through each match of $<ticket-number> in the text for ticket replacement
      while ((match = ticketPattern.exec(text)) !== null) {
        const ticketId = match[1]; // Extract ticket number (e.g., '575')
        const ticketText = match[0]; // Full match (e.g., '$575')

        // Find the ticket in the document using document ranges
        editor.state.doc.descendants((node, pos) => {
          if (node.isText && node.text?.includes(ticketText)) {
            const startIndex = pos + node.text.indexOf(ticketText); // Calculate the start position in the document
            const endIndex = startIndex + ticketText.length; // Calculate the end position

            const ticketId = parseInt(ticketText.replace("$", ""));

            // Fetch the ticket data
            fetchTicketData(ticketId, commentService).then((ticketData) => {
              if (ticketData) {
                // Delete the matched $<ticket-number> from the text using document-based positions
                editor
                  .chain()
                  .focus()
                  .deleteRange({ from: startIndex, to: endIndex })
                  .run();

                // Insert the comment reference after deleting the $<ticket-number>
                (editor.chain().focus() as any)
                  .insertCommentReference(
                    ticketData.id,
                    ticketData.author_username,
                    ticketData.content,
                    null,
                    markupService
                  )
                  .run();
              }
            });
          }
        });
      }

      // Loop through each match of [realtime-summary]...[/realtime-summary] for summary replacement
      while ((match = summaryPattern.exec(text)) !== null) {
        const summaryText = match[1]; // Extract the summary text

        console.log("summaryText", summaryText);

        // Find the position of the matched [realtime-summary]...[/realtime-summary] in the document
        editor.state.doc.descendants((node, pos) => {
          if (
            node.isText &&
            node.text?.includes(
              `[realtime-summary]${summaryText}[/realtime-summary]`
            )
          ) {
            const startIndex =
              pos +
              node.text.indexOf(
                `[realtime-summary]${summaryText}[/realtime-summary]`
              ); // Start position in the document
            const endIndex =
              startIndex +
              `[realtime-summary]${summaryText}[/realtime-summary]`.length; // End position

            // Delete the matched [realtime-summary]...[/realtime-summary] text
            editor
              .chain()
              .focus()
              .deleteRange({ from: startIndex, to: endIndex })
              .run();

            // Insert the realtimeSummary node after deleting the text
            editor
              .chain()
              .focus()
              .insertContent({
                type: "realtimeSummary", // Name of the custom node for the summary
                attrs: {
                  content: summaryText, // Insert the actual summary text
                },
              })
              .run();
          }
        });
      }
    },
  });

  return (
    <Wrapper
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
      className="note-area"
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "scroll",
        }}
      >
        <EditorContent editor={editor} className="tiptap-editor" />
      </Box>

      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          padding: "32px",
          pointerEvents: "none",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <ActionsArea editor={editor} />
      </Box>
    </Wrapper>
  );
};

const fetchTicketData = async (
  ticketId: number,
  commentService: CommentService
) => {
  const comments = commentService.comments;
  const comment = comments.get(ticketId);

  return comment;
};

const Wrapper = styled(Box)`
  height: 100%;
  background-color: white;
  pointer-events: auto;

  display: flex;
  flex-direction: column;
`;

export default NoteArea;