import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context value
interface LeftSidebarContextType {
  isExplorerOpen: boolean;
  handleExplorerToggle: () => void;
}

// Create the context with an initial type
const LeftSidebarContext = createContext<LeftSidebarContextType | undefined>(
  undefined
);

// Define the type for provider's props
interface LeftSidebarProviderProps {
  children: ReactNode;
}

// Context provider component
export const LeftSidebarProvider: React.FC<LeftSidebarProviderProps> = ({
  children,
}) => {
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(true);

  // Toggle function
  const handleExplorerToggle = () => {
    setIsExplorerOpen((prevState) => !prevState);
  };

  return (
    <LeftSidebarContext.Provider
      value={{ isExplorerOpen, handleExplorerToggle }}
    >
      {children}
    </LeftSidebarContext.Provider>
  );
};

// Custom hook to use the context
export const useLeftSidebar = (): LeftSidebarContextType => {
  const context = useContext(LeftSidebarContext);
  if (context === undefined) {
    throw new Error("useLeftSidebar must be used within a LeftSidebarProvider");
  }
  return context;
};
