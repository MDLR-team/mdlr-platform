import EditGroup from "@/components/dashboard-viewer/blocks/edit-group/edit-group";
import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import styled from "styled-components";

const NodeDelivery = ({ data }: any) => {
  const type = data.type;

  const output: {
    output: string;
    o1: number;
    schedule: string;
    s1: number;
  } = getOutput(type);

  function getOutput(type: string) {
    switch (type) {
      case "d-1":
        return {
          output: "Email",
          o1: 2,
          schedule: "Daily 8:30 AM",
          s1: 3,
        };
      case "d-2":
        return {
          output: "Slack",
          o1: 6,
          schedule: "Notify on Critical Updates",
          s1: 3,
        };
      case "d-3":
        return {
          output: "Telegram chatbot",
          o1: 5,
          schedule: "Weekly 5:00 PM",
          s1: 3,
        };
      case "d-4":
        return {
          output: "Secure web link",
          o1: 4,
          schedule: "https://www.mdlr.app/board/RAFux2AxcGTVYidT3NOPyI",
          s1: 4,
        };
      default:
        return {
          output: "Email",
          o1: 2,
          schedule: "Weekly 5:00 PM",
          s1: 3,
        };
    }
  }

  return (
    <>
      <div className="text-updater-node">
        <Handle type="target" position={Position.Left} isConnectable={true} />

        <EditGroup>
          <Wrapper>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "flex-start",
                gap: "10px",
                padding: "10px",
              }}
            >
              <EditBox>
                <EditBox2>
                  <EditLabel>Delivery Method</EditLabel>
                  <EditList>
                    <EditIcon type={output.o1} />
                    <Box>{output.output}</Box>
                  </EditList>
                </EditBox2>

                <EditBox2>
                  <EditList>
                    <EditIcon type={output.s1} />
                    <Box>{output.schedule}</Box>
                  </EditList>
                </EditBox2>
              </EditBox>
            </Box>
          </Wrapper>
        </EditGroup>

        <Handle
          type="source"
          position={Position.Right}
          id="b"
          isConnectable={true}
        />
      </div>
    </>
  );
};

export const EditIcon = styled.div<{
  type: number;
}>`
  width: 28px;
  min-width: 28px;
  height: 28px;
  background-image: url("/icons/schema/${({ type }) => `${type}.svg`}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const EditBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const EditBox2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const EditLabel = styled(Box)`
  font-size: 24px;
  font-weight: bold;
`;

export const EditList = styled.div`
  padding: 5px;
  //border: 1px solid grey;
  border-radius: 9px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  background: #f3f3f3;
  border: 1.5px solid #c7c7c7;
  align-items: center;

  padding: 15px 15px;
  overflow: hidden;

  &,
  & * {
    font-size: 24.5px;
    font-weight: 500;
    font-family: "Inter", sans-serif;
    color: black;
  }
`;

const Wrapper = styled.div`
  width: 420px;
  height: max-content;
  background: white;
  border: 2px solid black;
  border-radius: 9px;

  padding: 10px;
  display: flex;
  flex-direction: column;

  gap: 10px;
`;

export default NodeDelivery;
