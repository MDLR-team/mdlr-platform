import { Node, mergeAttributes, CommandProps } from "@tiptap/core";
import { NodeViewRendererProps } from "@tiptap/react";

interface CommentReferenceAttrs {
  commentId: string;
  author: string;
  avatar: string;
  content: string;
}

export const CommentReference = Node.create({
  name: "commentReference",

  group: "inline",

  inline: true,

  atom: true,

  addAttributes() {
    return {
      commentId: {
        default: null,
      },
      author: {
        default: null,
      },
      avatar: {
        default: null,
      },
      content: {
        default: null,
      },
    };
  },

  renderHTML({ HTMLAttributes }: NodeViewRendererProps): any {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        class: "comment-ref",
        "data-comment-id": HTMLAttributes.commentId,
      }),
      [
        "img",
        {
          src: HTMLAttributes.avatar,
          alt: `${HTMLAttributes.author}'s avatar`,
          class: "comment-avatar",
        },
      ],
      ["strong", {}, HTMLAttributes.author],
      ["span", {}, `: ${HTMLAttributes.content}`],
    ];
  },

  parseHTML() {
    return [
      {
        tag: "span[data-comment-id]",
      },
    ];
  },

  addCommands(): any {
    return {
      insertCommentReference:
        (commentId: string, author: string, content: string, avatar: string) =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
            attrs: { commentId, author, content, avatar },
          });
        },
    };
  },
});
