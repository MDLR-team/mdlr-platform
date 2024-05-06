import Share from "@/components/ui/canvas-ui/share/share";
import Bar from "@/components/ui/canvas-ui/bar/bar";
import ToolPanel from "@/components/ui/canvas-ui/tool-panel/tool-panel";
import {
  BarWrapper,
  ContentWrapper,
  FooterWrapper,
  Grid,
  Wrapper,
} from "@/components/ui/ui-grid.styled";
import React, { useRef } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  NodeChange,
  ReactFlowProvider,
} from "reactflow";

import "reactflow/dist/style.css";
import {
  NodeProvider,
  nodeTypes,
  useNodes,
} from "@/components/canvas/node-service/node-provider";
import { Box } from "@mui/material";
import PagesPanel from "@/components/ui/canvas-ui/pages-panel/pages-panel";

const ReactflowComponent = () => {
  const reactFlowWrapper = useRef(null);

  const {
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
  } = useNodes();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* UI Grid */}
      <Wrapper>
        <Grid>
          <BarWrapper>
            <Bar />
            <Share />
          </BarWrapper>

          <ContentWrapper></ContentWrapper>

          <FooterWrapper>
            <PagesPanel />

            <ToolPanel />
          </FooterWrapper>
        </Grid>
      </Wrapper>
      {/* End UI Grid */}

      <Box
        className="wrapper"
        sx={{ width: "100vw", height: "100vh" }}
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
          onInit={setReactFlowInstance}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 2 }}
          nodeOrigin={[0.5, 0]}
        >
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </Box>
    </Box>
  );
};

const CanvasPage = () => {
  return (
    <ReactFlowProvider>
      <NodeProvider>
        <ReactflowComponent />
      </NodeProvider>
    </ReactFlowProvider>
  );
};

export default CanvasPage;
