import NodeStickerType from "@/components/canvas/node-types/node-sticker-type";
import NodeTableType from "@/components/canvas/node-types/node-table-type";
import NodeThumbType from "@/components/canvas/node-types/node-thumb-type";
import React, { useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "0",
    type: "thumbnail",
    data: { label: "Node" },
    position: { x: 0, y: 50 },
  },
];

let id = 1;
const getId = () => `${id++}`;

const ReactflowComponent = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback((params: any) => {
    // reset the start node on connections
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_: any, { nodeId }: any) => {
    connectingNodeId.current = nodeId;
  }, []);

  const typeByStep = ["sticker", "table"];
  const step = useRef(0);

  const onConnectEnd = useCallback(
    (event: any) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          type: typeByStep[step.current] || "sticker",
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
        };

        step.current = (step.current + 1) % typeByStep.length;

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds: any) =>
          eds.concat({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [screenToFlowPosition]
  );

  const nodeTypes = {
    thumbnail: NodeThumbType,
    sticker: NodeStickerType,
    table: NodeTableType,
  };

  return (
    <div
      className="wrapper"
      style={{ width: "100vw", height: "100vh" }}
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

const CanvasPage = () => {
  return (
    <ReactFlowProvider>
      <ReactflowComponent />
    </ReactFlowProvider>
  );
};

export default CanvasPage;
