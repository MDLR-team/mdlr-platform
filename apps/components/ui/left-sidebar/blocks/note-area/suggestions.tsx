import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";

import { MentionList } from "./MentionList";
import { ProjectUser } from "@/components/services/project-services/project-service/project-service";
import WorkspaceService from "@/components/services/workspace-services/workspace/workspace-service";

export default function suggestions(workspaceService: WorkspaceService) {
  return {
    items: ({ query }: any) => {
      const users: ProjectUser[] = workspaceService.workspaceUsers$.value;

      return users
        .map((user) => user.username)
        .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, 7);
    },

    render: () => {
      let reactRenderer: ReactRenderer;
      let popup: any;

      return {
        onStart: (props: any) => {
          if (!props.clientRect) {
            return;
          }

          reactRenderer = new ReactRenderer(MentionList, {
            props,
            editor: props.editor,
          });

          popup = tippy("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: reactRenderer.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
          });
        },

        onUpdate(props: any) {
          reactRenderer.updateProps(props);

          if (!props.clientRect) {
            return;
          }

          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },

        onKeyDown(props: any) {
          if (props.event.key === "Escape") {
            popup[0].hide();

            return true;
          }

          return (reactRenderer.ref as any)?.onKeyDown(props);
        },

        onExit() {
          popup[0].destroy();
          reactRenderer.destroy();
        },
      };
    },
  };
}
