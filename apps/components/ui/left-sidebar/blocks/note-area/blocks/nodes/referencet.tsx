import { getColor, getInitials } from "@/components/layout/avatar/avatar";
import MarkupService from "@/components/services/markup-service/markup-service";
import { Node } from "@tiptap/core";

export const CommentReference = Node.create({
  name: "commentReference",

  group: "inline",

  inline: true,

  atom: true, // Atomic node that acts as an inline element

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
      markupService: {
        default: null,
      },
    };
  },

  // Manually create the DOM elements using JavaScript
  renderHTML({ HTMLAttributes }: any) {
    // Create the wrapper div element
    const wrapper = document.createElement("div");
    wrapper.classList.add("ed-comment-ref");

    // add event listener to the wrapper
    wrapper.addEventListener("click", (e) => {
      const commentId = HTMLAttributes.commentId;
      const markupService = HTMLAttributes.markupService as MarkupService;

      console.log("Comment ID: ", commentId);
      console.log("Markup Service: ", markupService);

      if (commentId && markupService) {
        markupService.selectComment(commentId);
      }
    });

    // Create the avatar div (for initials)
    const avatarDiv = document.createElement("div");
    avatarDiv.classList.add("ed-comment-avatar");
    const author = HTMLAttributes.author || "Anonymous"; // Default to 'Anonymous' if no author
    const initials = getInitials(author);
    const color = getColor(author);
    avatarDiv.textContent = initials || "A"; // Default to 'A' if no initials
    avatarDiv.style.backgroundColor = color;

    // Create the content div for the comment
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("ed-comment-content");

    // Create the author and timestamp container
    const authorContainer = document.createElement("div");
    authorContainer.classList.add("ed-author-container");

    // Create the strong element for the author
    const authorStrong = document.createElement("div");
    authorStrong.textContent = HTMLAttributes.author;

    // Create the span for the timestamp
    const timestampSpan = document.createElement("span");
    timestampSpan.classList.add("ed-timestamp");
    timestampSpan.textContent = HTMLAttributes.timestamp;

    // Append author and timestamp to the author container
    // authorContainer.appendChild(authorStrong);
    // authorContainer.appendChild(timestampSpan);

    // Create the div for the actual comment content
    const contentSpan = document.createElement("div");
    contentSpan.classList.add("ed-comment-text");
    contentSpan.textContent =
      HTMLAttributes.content?.slice(0, 30) + "..." || "";

    // Append author and content to the content div
    contentDiv.appendChild(authorContainer);
    contentDiv.appendChild(contentSpan);

    // Append avatar, content, and icon to the wrapper
    wrapper.appendChild(avatarDiv);
    wrapper.appendChild(contentDiv);

    // Return the wrapper as an HTML element
    return wrapper;
  },

  parseHTML() {
    return [
      {
        tag: "div[data-comment-id]",
      },
    ];
  },

  // Add the insert command for this node
  addCommands(): any {
    return {
      insertCommentReference:
        (
          commentId: string,
          author: string,
          content: string,
          avatar: string,
          markupService: MarkupService
        ) =>
        ({ commands }: any) => {
          return commands.insertContent({
            type: this.name,
            attrs: { commentId, author, content, avatar, markupService },
          });
        },
    };
  },
});
