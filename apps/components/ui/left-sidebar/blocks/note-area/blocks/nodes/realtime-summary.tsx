import { Node } from "@tiptap/core";

export const RealtimeSummary = Node.create({
  name: "realtimeSummary",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      content: {
        default: null,
      },
    };
  },

  renderHTML({ HTMLAttributes }: any) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("ed-realtime-summary");

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("ed-realtime-summary-content");
    contentDiv.textContent = HTMLAttributes.content;

    wrapper.appendChild(contentDiv);

    return wrapper;
  },

  addCommands(): any {
    return {
      setRealtimeSummary:
        (content: string) =>
        ({ tr, commands }: any) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              content,
            },
          });
        },
    };
  },
});
