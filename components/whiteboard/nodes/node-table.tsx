import EditGroup from "@/components/dashboard-viewer/blocks/edit-group/edit-group";
import TableSection from "@/components/dashboard-viewer/blocks/table/table";
import { Handle, Position } from "reactflow";
import styled from "styled-components";

const NodeTable = () => {
  return (
    <>
      <div className="text-updater-node">
        <Handle type="target" position={Position.Top} isConnectable={true} />

        <EditGroup>
          <Wrapper>
            <TableSection />
          </Wrapper>
        </EditGroup>

        <Handle type="source" position={Position.Bottom} isConnectable={true} />
      </div>
    </>
  );
};

const Wrapper = styled.div`
  width: 630px;
  height: 330px;
  background: white;
  border: 2px solid black;
  border-radius: 9px;

  padding: 20px;
`;

export default NodeTable;
