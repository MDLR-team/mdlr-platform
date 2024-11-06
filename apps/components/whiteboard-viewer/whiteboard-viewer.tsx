import { Box } from "@mui/material";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { useEffect } from "react";
import DashboardNodeProvider, {
  useDashboardNode,
} from "../dashboard-viewer/dashboard-node-service/dashboard-node-provider";
import NodeThumbnail from "../whiteboard/nodes/node-thumbnail";
import NodeTable from "../whiteboard/nodes/node-table";
import dynamic from "next/dynamic";
import NodePie from "../whiteboard/nodes/node-pie";
import NodeInterval from "../whiteboard/nodes/node-interval";
import NodePrompt from "../whiteboard/nodes/node-prompt";
import NodeForceGraph from "../whiteboard/nodes/node-force-graph";
import NodeSticker from "../whiteboard/nodes/node-sticker";
import NodeRecipients from "../whiteboard/nodes/node-recipients/node-recipients";
import NodeDelivery from "../whiteboard/nodes/node-delivery/node-delivery";
import NodeDashboard from "../whiteboard/nodes/node-dasboard/node-dashboard";

const WhiteboardViewerX = () => {
  const { nodes, edges, onNodesChange, onEdgesChange } = useDashboardNode();

  return (
    <Box
      className="wrapper"
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "var(--viewer-background)",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={NodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 1 }}
        nodeOrigin={[0.5, 0]}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </Box>
  );
};

export const NodeTypes = {
  thumbnail: NodeThumbnail,
  table: NodeTable,
  pie: NodePie,
  interval: NodeInterval,
  prompt: NodePrompt,
  forceGraph: NodeForceGraph,
  sticker: NodeSticker,
  recipients: NodeRecipients,
  delivery: NodeDelivery,
  dashboard: NodeDashboard,
};

const WhiteboardViewer = () => {
  return (
    <ReactFlowProvider>
      <DashboardNodeProvider>
        <WhiteboardViewerX />
      </DashboardNodeProvider>
    </ReactFlowProvider>
  );
};

export default WhiteboardViewer;
