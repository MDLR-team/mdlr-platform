import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";
import { Box } from "@mui/material";
import styled from "styled-components";

const ViewStateMode = () => {
  const { isViewStateEditing, isPaperOpen } = useGlobalStates();

  if (!isViewStateEditing && !isPaperOpen) return null;

  return (
    <FloatingWrapper>
      <Darkarea />
      <Darkarea />
      <Darkarea />
      <Darkarea />
      <Box sx={{ border: "2px solid black" }}></Box>
      <Darkarea />
      <Darkarea />
      <Darkarea />
      <Darkarea />
    </FloatingWrapper>
  );
};

const offset = 55;

const FloatingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;

  pointer-events: none;

  display: grid;
  grid-template-columns: ${offset}px auto ${offset}px;
  grid-template-rows: ${offset}px auto ${offset}px;
`;

const Darkarea = styled.div`
  background: rgba(0, 0, 0, 0.5);
`;

export default ViewStateMode;
