import { createContext, useContext, useState, ReactNode } from "react";
import { ActionType } from "./actions-area.types";
import SummaryAction from "../summary-action/summary-action";
import Actions from "../actions/actions";
import { Editor } from "@tiptap/react";

// Define the context type
interface ActionAreaContextType {
  actionType: ActionType | null;
  handleAction: (type: ActionType | null) => void;
  editor: Editor;
}

// Create the context
const ActionAreaContext = createContext<ActionAreaContextType | undefined>(
  undefined
);

// Create the provider component
const ActionAreaProvider = ({
  children,
  editor,
}: {
  children: ReactNode;
  editor: Editor;
}) => {
  const [actionType, setActionType] = useState<ActionType | null>(null);

  const handleAction = (type: ActionType | null) => {
    setActionType(type);
  };

  return (
    <ActionAreaContext.Provider value={{ actionType, handleAction, editor }}>
      {children}
    </ActionAreaContext.Provider>
  );
};

// Create the custom hook
export const useActionArea = () => {
  const context = useContext(ActionAreaContext);
  if (context === undefined) {
    throw new Error("useActionArea must be used within an ActionAreaProvider");
  }
  return context;
};

// Update the ActionsArea component to use the provider
const ActionsArea: React.FC<{
  editor: Editor | null;
}> = ({ editor }) => {
  if (!editor) return null;

  return (
    <ActionAreaProvider editor={editor}>
      <SummaryAction />
      <Actions />
    </ActionAreaProvider>
  );
};

export default ActionsArea;
