import { Box, Button } from "@mui/material";
import { useRef } from "react";
import styled from "styled-components";
import { useNodeModel } from "../../node-thumb-type";

const UploadFile = () => {
  const { modelService } = useNodeModel();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      modelService.uploadFile(file);
    }
    event.target.value = ""; // Clear the input value
  };

  return (
    <Box
      sx={{ height: "100%" }}
      onClick={() => fileInputRef.current && fileInputRef.current.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <Box
        style={{
          display: "flex",
          height: "100%",
        }}
      >
        <ClickableDiv data-status={"default"}>
          <Box>Drag & drop your Model to upload</Box>
          <Box>or</Box>

          <Button color="primary" variant="contained" size="small">
            Browse for file
          </Button>
        </ClickableDiv>
      </Box>
    </Box>
  );
};

const ClickableDiv = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 18px;

  position: relative;

  overflow: hidden;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  && > * + * {
    margin-top: 8px;
  }

  border: 1px dashed #4f4f4f;
  border-radius: 9px;
  background-color: rgba(0, 0, 0, 0.04);

  &&[data-status="dragging"] {
    border: 2px solid #4f4f4f;
  }

  text-align: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.02);
  }
`;

export default UploadFile;
