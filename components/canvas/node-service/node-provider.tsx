import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import NodeService from "./node-service";
import {
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import NodeThumbType from "../node-types/node-thumb-type";
import NodeStickerType from "../node-types/node-sticker-type";
import NodeTableType from "../node-types/node-table-type";
import NodeApiThumbType from "../node-types/node-api-thumb-type";
import { v4 as uuidv4 } from "uuid";
import NodeSticker1Type from "../node-types/node-sticker1-type";
import ChartThumbType from "../node-types/chart-type";

interface ViewerContentProps {
  nodeSevice: NodeService;
  nodes: any[];
  edges: any[];
  onNodesChange: (nodes: any[]) => void;
  onEdgesChange: (edges: any[]) => void;
  onConnect: (params: any) => void;
  onConnectStart: (_: any, { nodeId }: any) => void;
  onConnectEnd: (event: any) => void;
  onDragOver: (event: any) => void;
  onDrop: (event: any) => void;
  setReactFlowInstance: (instance: any) => void;
}

export const nodeTypes = {
  thumbnail: NodeThumbType,
  apiThumbnail: NodeApiThumbType,
  sticker: NodeStickerType,
  sticker1: NodeSticker1Type,
  table: NodeTableType,
  chart: ChartThumbType,
};

const NodeContext = createContext<ViewerContentProps | null>(null);

export function NodeProvider({ children }: any) {
  const connectingNodeId = useRef(null);
  const connectingHandleId = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const [nodeSevice] = useState<NodeService>(() => new NodeService());

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    nodeSevice.provideStates({
      setNodes,
      setEdges,
      onNodesChange,
      onEdgesChange,
    });
  }, []);

  const typeByStep = ["sticker", "table"];
  const step = useRef(0);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      if (!reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: "sticker",
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onConnect = useCallback((params: any) => {
    // reset the start node on connections
    connectingNodeId.current = null;
    connectingHandleId.current = null;

    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_: any, params: any) => {
    const { nodeId, handleId } = params;

    connectingNodeId.current = nodeId;
    connectingHandleId.current = handleId;
  }, []);

  const onConnectEnd = useCallback(
    (event: any) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const previousNode = nodes.find(
          (n) => n.id === connectingNodeId.current
        );

        if (!previousNode) return;

        // we need to remove the wrapper bounds, in order to get the correct position
        const id = uuidv4();
        const newNode: Node = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          type:
            previousNode.type === "thumbnail" ||
            previousNode.type === "apiThumbnail"
              ? "sticker"
              : previousNode.type === "table"
              ? "sticker1"
              : previousNode.type === "sticker1"
              ? "chart"
              : "table",
          data: { label: `Node ${id}` },
        };

        step.current = (step.current + 1) % typeByStep.length;

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds: any) =>
          eds.concat({
            id,
            source: connectingNodeId.current,
            target: id,
            sourceHandle: connectingHandleId.current,
            type: "smoothstep",
          })
        );
      }
    },
    [screenToFlowPosition, nodes]
  );

  return (
    <NodeContext.Provider
      value={{
        nodeSevice: nodeSevice,
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onConnectStart,
        onConnectEnd,
        onDragOver,
        onDrop,
        setReactFlowInstance,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
}

let id = 1;
const getId = () => `${id++}`;

export function useNodes() {
  const context = useContext(NodeContext);
  if (!context) {
    throw new Error("useNodes must be used within a NodeProvider");
  }
  return context;
}
