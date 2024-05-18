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
  Edge,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import NodeThumbType from "../node-types/node-thumb-type/node-thumb-type";
import NodeStickerType from "../node-types/node-sticker-type/node-sticker-type";
import NodeTableType from "../node-types/node-table-type";
import { v4 as uuidv4 } from "uuid";
import NodeMessageType from "../node-types/node-message-type/node-message-type";
import NodeSankeyChartType from "../node-types/node-sankey-chart-type/node-sankey-chart-type";
import NodePieChartType from "../node-types/node-pie-chart-type/node-pie-chart-type";
import NodeLineChartType from "../node-types/node-line-chart-type/node-line-chart-type";
import NodePresentationType from "../node-types/node-presentation-type/node-presentation-type";
import NodeInputParamsType from "../node-types/node-input-params-type/node-input-params-type";
import NodeEaChartType from "../node-types/node-ea-chart-type/node-ea-chart-type";

const NodeContext = createContext<ViewerContentProps | null>(null);

export function NodeProvider({ children }: any) {
  const connectingNodeId = useRef(null);
  const connectingHandleId = useRef(null);

  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const [nodeService] = useState<NodeService>(() => new NodeService());

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [presentationNodes, setPresentationNodes] = useState<any[]>([]);

  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    nodeService.provideStates({
      nodes,
      edges,
      setNodes,
      setEdges,
      onNodesChange,
      onEdgesChange,
    });
  }, [nodes, edges]);

  useEffect(() => {
    nodeService.presentationNodes$.subscribe((nodes) =>
      setPresentationNodes(nodes)
    );

    return () => {
      nodeService.dispose();
    };
  }, []);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) return;
      if (!reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const id = uuidv4();

      const newNode: Partial<Node> = {
        type,
        position,
      };

      nodeService.addNode(newNode);
    },
    [reactFlowInstance]
  );

  const onConnect = useCallback((params: any) => {
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
        const node = nodeService.addNode({
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          type: "sticker",
        });

        const edge = nodeService.addEdge({
          source: connectingNodeId.current,
          target: node.id,
          sourceHandle: connectingHandleId.current,
        });
      }
    },
    [screenToFlowPosition, nodes]
  );

  return (
    <NodeContext.Provider
      value={{
        nodeService,
        nodes,
        presentationNodes,
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

interface ViewerContentProps {
  nodeService: NodeService;
  nodes: Node[];
  presentationNodes: Node[];
  edges: Edge[];
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
  sticker: NodeStickerType,
  inputParams: NodeInputParamsType,
  table: NodeTableType,
  pieChart: NodePieChartType,
  lineChart: NodeLineChartType,
  sankeyChart: NodeSankeyChartType,
  message: NodeMessageType,
  presentation: NodePresentationType,
  eaChart: NodeEaChartType,
};

export function useNodes() {
  const context = useContext(NodeContext);
  if (!context) {
    throw new Error("useNodes must be used within a NodeProvider");
  }
  return context;
}
