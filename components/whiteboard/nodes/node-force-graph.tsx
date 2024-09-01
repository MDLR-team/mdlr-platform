import EditGroup from "@/components/dashboard-viewer/blocks/edit-group/edit-group";
import dynamic from "next/dynamic";
import { Handle, Position } from "reactflow";
import styled from "styled-components";

const ForceGraphChart = dynamic(
  () =>
    import("../../dashboard-viewer/blocks/force-graph-chart/force-graph-chart"),
  {
    ssr: false,
  }
);

const NodeForceGraph = () => {
  return (
    <>
      <div className="text-updater-node">
        <Handle type="target" position={Position.Top} isConnectable={true} />

        <EditGroup>
          <Wrapper>
            <ForceGraphChart />
          </Wrapper>
        </EditGroup>

        <Handle type="source" position={Position.Bottom} isConnectable={true} />
      </div>
    </>
  );
};

const Wrapper = styled.div`
  width: 550px;
  height: 430px;
  background: white;
  border: 2px solid black;
  border-radius: 9px;

  padding: 20px;
`;

export default NodeForceGraph;
