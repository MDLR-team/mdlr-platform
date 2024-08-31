import { createContext, useContext, useEffect } from "react";
import { Edge, Node, useEdgesState, useNodesState } from "reactflow";

interface DashboardNodeContextProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (nodes: any[]) => void;
  onEdgesChange: (edges: any[]) => void;
}

const DashboardNodeContext = createContext<DashboardNodeContextProps | null>(
  null
);

const DashboardNodeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const a = setTimeout(() => {
      setNodes([
        {
          id: "1",
          type: "dashboard",
          position: { x: 0, y: 0 },
          data: { label: "Dashboard" },
        },
      ]);
    }, 1000);

    return () => {
      clearTimeout(a);
    };
  }, [setNodes]);

  return (
    <DashboardNodeContext.Provider
      value={{
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
      }}
    >
      {children}
    </DashboardNodeContext.Provider>
  );
};

export function useDashboardNode() {
  const context = useContext(DashboardNodeContext);

  if (!context) {
    throw new Error(
      "useDashboardNode must be used within a DashboardNodeProvider"
    );
  }

  return context;
}

export default DashboardNodeProvider;
