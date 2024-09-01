import { useRouter } from "next/router";
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

  const router = useRouter();

  useEffect(() => {
    const asPath = router.asPath;

    const a = setTimeout(() => {
      if (asPath.includes("whiteboard")) {
        setNodes([
          {
            id: "1",
            type: "thumbnail",
            position: { x: 0, y: -150 },
            data: { label: "Thumbnail" },
          },
          {
            id: "2",
            type: "table",
            position: { x: 200, y: 220 },
            data: { label: "Thumbnail" },
          },
          {
            id: "3",
            type: "pie",
            position: { x: 340, y: 800 },
            data: { label: "Thumbnail" },
          },
          {
            id: "4",
            type: "interval",
            position: { x: 760, y: 800 },
            data: { label: "Thumbnail" },
          },
          {
            id: "5",
            type: "prompt",
            position: { x: -120, y: 620 },
            data: { label: "Thumbnail" },
          },
          {
            id: "6",
            type: "forceGraph",
            position: { x: 1300, y: 800 },
            data: { label: "Thumbnail" },
          },
          {
            id: "7",
            type: "sticker",
            position: { x: 1400, y: 30 },
            data: {
              label:
                "Fetch Roof Material SpecsRetrieve detailed specifications for all roof materials",
            },
          },
          {
            id: "8",
            type: "sticker",
            position: { x: 1000, y: 30 },
            data: {
              label:
                "Collect data on current wall insulation materials and thicknesses",
            },
          },
          {
            id: "9",
            type: "sticker",
            position: { x: 1200, y: 30 },
            data: {
              label:
                "Fetch load distribution data for columns in the main hall",
            },
          },
          {
            id: "10",
            type: "sticker",
            position: { x: 1000, y: 200 },
            data: {
              label:
                "HVAC System Layout",
            },
          },
          {
            id: "11",
            type: "sticker",
            position: { x: 1200, y: 200 },
            data: {
              label:
                "Exterior Cladding Materials",
            },
          },
          {
            id: "12",
            type: "sticker",
            position: { x: 1400, y: 200 },
            data: {
              label:
                "Retrieve information on interior finishes, including color and material specs",
            },
          },
        ]);

        setEdges([
          { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
          { id: "e1-3", source: "2", target: "3", type: "smoothstep" },
          { id: "e1-4", source: "2", target: "4", type: "smoothstep" },
          { id: "e1-5", source: "2", target: "5", type: "smoothstep" },
          { id: "e1-6", source: "2", target: "6", type: "smoothstep" },
        ]);
      } else {
        setNodes([
          {
            id: "1",
            type: "dashboard",
            position: { x: 0, y: 0 },
            data: { label: "Dashboard" },
          },
        ]);
      }
    }, 1000);

    return () => {
      clearTimeout(a);
    };
  }, [setNodes, router]);

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
