import { Box } from "@mui/material";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import DashboardNode from "./blocks/dashboard-node";
import { useEffect } from "react";
import DashboardNodeProvider, {
  useDashboardNode,
} from "./dashboard-node-service/dashboard-node-provider";

const DashboardViewerX = () => {
  const { nodes, edges, onNodesChange, onEdgesChange } = useDashboardNode();

  return (
    <Box
      className="wrapper"
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "rgba(0,0,0,0.8)",
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
  dashboard: DashboardNode,
};

const DashboardViewer = () => {
  return (
    <ReactFlowProvider>
      <DashboardNodeProvider>
        <DashboardViewerX />
      </DashboardNodeProvider>
    </ReactFlowProvider>
  );
};

export default DashboardViewer;
