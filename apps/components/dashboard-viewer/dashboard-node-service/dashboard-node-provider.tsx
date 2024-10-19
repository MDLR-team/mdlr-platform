import { Experience } from "@/pages/whiteboard/[id]";
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
        // get id from router query
        const id = router.query.id as string;

        if (id === Experience.V1) {
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
                label: "HVAC System Layout",
              },
            },
            {
              id: "11",
              type: "sticker",
              position: { x: 1200, y: 200 },
              data: {
                label: "Exterior Cladding Materials",
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
        } else if (id === Experience.V2) {
          setNodes([
            {
              id: "1",
              type: "thumbnail",
              position: { x: -222, y: 400 },
              data: { label: "Thumbnail", type: "v-1" },
            },
            // Case 1
            {
              id: "2",
              type: "dashboard",
              position: { x: 386, y: 106 },
              data: { label: "dashboard 1", type: "d-1" },
            },
            {
              id: "3",
              type: "recipients",
              position: { x: 928, y: -4 },
              data: { label: "Recipients 1", type: "r-1" },
            },
            {
              id: "4",
              type: "delivery",
              position: { x: 1562, y: -230 },
              data: { label: "delivery 1-1", type: "d-1" },
            },
            {
              id: "5",
              type: "delivery",
              position: { x: 1562, y: 94 },
              data: { label: "delivery 1-2", type: "d-2" },
            },
            // Case 2
            {
              id: "6",
              type: "dashboard",
              position: { x: 390, y: 696 },
              data: { label: "dashboard 2", type: "d-2" },
            },
            {
              id: "7",
              type: "recipients",
              position: { x: 940, y: 800 },
              data: { label: "Recipients 2", type: "r-2" },
            },
            {
              id: "8",
              type: "delivery",
              position: { x: 1568, y: 710 },
              data: { label: "delivery 2-1", type: "d-3" },
            },
            {
              id: "9",
              type: "delivery",
              position: { x: 1568, y: 1008 },
              data: { label: "delivery 2-2", type: "d-4" },
            },
          ]);

          setEdges([
            { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
            { id: "e1-3", source: "2", target: "3", type: "smoothstep" },
            { id: "e1-4", source: "3", target: "4", type: "smoothstep" },
            { id: "e1-5", source: "3", target: "5", type: "smoothstep" },
            { id: "e1-6", source: "1", target: "6", type: "smoothstep" },
            { id: "e1-7", source: "6", target: "7", type: "smoothstep" },
            { id: "e1-8", source: "7", target: "8", type: "smoothstep" },
            { id: "e1-9", source: "7", target: "9", type: "smoothstep" },
          ]);
        }
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
