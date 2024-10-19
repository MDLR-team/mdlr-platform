import { Box } from "@mui/material";
import { useMemo } from "react";
import styled from "styled-components";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import StorageIcon from "@mui/icons-material/Storage";

const EditGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  [x: string]: any;
}> = ({ children, className, ...props }) => {
  const assembledClassName = useMemo(() => {
    if (className) {
      return `${className} edit-group`;
    }

    return "edit-group";
  }, [className]);

  return (
    <BoxWrapper className={assembledClassName} {...props}>
      <Box
        className="edit-group-hover-panel"
        sx={{
          border: "3px solid #4F70FC",
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: "6px",
          zIndex: 2,
        }}
      >
        <Box className="edit-group-zoom-point" />
        <Box className="edit-group-zoom-point" />
        <Box className="edit-group-zoom-point" />
        <Box className="edit-group-zoom-point" />

        <Box
          className="edit-group-action-panel"
          sx={{
            width: "100%",
            gap: "10px",
            position: "absolute",
            transform: "translateY(-100%)",
            display: "flex",
            padding: "5px 0px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#4F70FC",
              display: "flex",
              color: "white",
              padding: "5px",
              borderRadius: "6px",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <DragIndicatorIcon className="edit-group-icon" />
            Chart panel
          </Box>

          <Box
            sx={{
              backgroundColor: "#43BA7E",
              display: "flex",
              color: "white",
              padding: "5px",
              borderRadius: "6px",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <StorageIcon className="edit-group-icon" />
            Connect data
          </Box>
        </Box>
      </Box>

      <Box
        className="edit-group-child"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {children}
      </Box>
    </BoxWrapper>
  );
};

const BoxWrapper = styled(Box)`
  display: flex;
  position: relative;

  & *.edit-group-hover-panel {
    display: none;
  }

  &:hover *.edit-group-hover-panel {
    display: flex;
  }

  & .edit-group-icon {
    &,
    & * {
      color: white;
    }

    font-size: 14px;
  }

  & .edit-group-zoom-point {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: white;
    border: 3px solid #4f70fc;
    border-radius: 50%;
  }

  & .edit-group-zoom-point:nth-child(1) {
    top: -5px;
    left: -5px;
  }

  & .edit-group-zoom-point:nth-child(2) {
    top: -5px;
    right: -5px;
  }

  & .edit-group-zoom-point:nth-child(3) {
    bottom: -5px;
    left: -5px;
  }

  & .edit-group-zoom-point:nth-child(4) {
    bottom: -5px;
    right: -5px;
  }
`;

export default EditGroup;
