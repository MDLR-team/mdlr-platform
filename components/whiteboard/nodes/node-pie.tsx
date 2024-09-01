import EditGroup from "@/components/dashboard-viewer/blocks/edit-group/edit-group";
import TableSection from "@/components/dashboard-viewer/blocks/table/table";
import dynamic from "next/dynamic";
import { Handle, Position } from "reactflow";
import styled from "styled-components";

const PieChart = dynamic(
  () => import("../../dashboard-viewer/blocks/pie-chart/pie-chart"),
  {
    ssr: false,
  }
);

const NodePie = () => {
  return (
    <>
      <div className="text-updater-node">
        <Handle type="target" position={Position.Top} isConnectable={true} />

        <EditGroup>
          <Wrapper>
            <PieChart
              items={[
                { name: "Design", value: 100 },
                { name: "Management", value: 80 },
                { name: "Cost", value: 300 },
                { name: "Quality", value: 70 },
                { name: "Risk", value: 500 },
              ]}
              options={{ maxHeight: "400px", type: "pie" }}
            />
          </Wrapper>
        </EditGroup>

        <Handle type="source" position={Position.Bottom} isConnectable={true} />
      </div>
    </>
  );
};

const Wrapper = styled.div`
  width: 350px;
  height: 330px;
  background: white;
  border: 2px solid black;
  border-radius: 9px;

  padding: 20px;
`;

export default NodePie;
