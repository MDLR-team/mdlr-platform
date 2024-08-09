import React from "react";
import { Box } from "@mui/material";
import styled from "styled-components";

interface ReadOnlyMentionsProps {
  content: string;
}

const CommentContent: React.FC<ReadOnlyMentionsProps> = ({ content }) => {
  const renderContentWithMentions = (content: string) => {
    const mentionRegex = /@\[(.+?)\]\((.+?)\)/g;
    const parts = [];

    let lastIndex = 0;
    let match;
    while ((match = mentionRegex.exec(content)) !== null) {
      const [fullMatch, display] = match;
      const index = match.index;

      if (lastIndex < index) {
        parts.push(
          <span key={lastIndex}>{content.substring(lastIndex, index)}</span>
        );
      }

      // Directly render the mention as it is in the content
      parts.push(<MentionSpan key={index}>@{display}</MentionSpan>);

      lastIndex = index + fullMatch.length;
    }

    if (lastIndex < content.length) {
      parts.push(<span key={lastIndex}>{content.substring(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <Box sx={{ wordWrap: "break-word" }}>
      {renderContentWithMentions(content)}
    </Box>
  );
};

const MentionSpan = styled.span`
  color: blue;
  font-weight: 400;
`;

export default CommentContent;
