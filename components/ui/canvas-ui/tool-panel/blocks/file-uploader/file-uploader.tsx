import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import styled from "styled-components";
import PlusIcon from "@/components/ui/icons/plus-icon";
import AiUploadIcon from "@/components/ui/icons/ai-upload-icon";
import { useNodes } from "@/components/canvas/node-service/node-provider";

const FileUploader = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { nodeSevice } = useNodes();

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  // Function to handle outside clicks
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false);
    }
  };

  // Attach event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Box sx={{ position: "relative" }}>
      {isOpened && (
        <Wrapper ref={wrapperRef}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
              width: "100%",
            }}
          >
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Tabs
                value={tabIndex}
                onChange={handleChangeTab}
                aria-label="file upload options"
              >
                <Tab label="Upload File" />
                <Tab label="API" />
              </Tabs>
            </Box>
            {tabIndex === 0 && (
              <Box
                sx={{ height: "100%" }}
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".rvt"
                  onChange={(event: any) => {
                    nodeSevice.addModel();
                    event.target.value = "";

                    setIsOpened(false);
                  }}
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
            )}
            {tabIndex === 1 && (
              <Box
                sx={{
                  border: "1px solid white",
                  height: "100%",
                  borderRadius: "9px",
                  display: "flex",
                  alignItems: "center",
                  padding: "18px",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                }}
              >
                {/*  <Box
                sx={{
                  backgroundColor: "grey",
                  color: "white",
                  maxWidth: "max-content",
                  marginBottom: "9px",
                  padding: "3px 9px",
                  borderRadius: "9px",
                }}
              >
                Group 1
            </Box> */}

                <Box
                  sx={{
                    width: "100%",
                    padding: "0px",
                    borderRadius: "9px",
                  }}
                >
                  <FormControl sx={{ minWidth: "100%" }}>
                    <Box sx={{ display: "flex", gap: "9px" }}>
                      <Input
                        fullWidth
                        placeholder="Paste Endpoint here"
                        maxRows={1}
                        size="small"
                        sx={{
                          border: "1px solid grey",
                          borderRadius: "9px",
                          height: "27px",
                          fontSize: "12px",
                          padding: "0 10px",
                          backgroundColor: "white",
                        }}
                      />
                      <IconButton
                        sx={{ backgroundColor: "#FAE57E" }}
                        type="submit"
                        data-type="exception"
                        data-add="comment"
                        onClick={() => {
                          nodeSevice.addApiModel();
                          setIsOpened(false);
                        }}
                      >
                        <PlusIcon />
                      </IconButton>
                    </Box>

                    <Box>
                      <FormControlLabel
                        required
                        checked
                        control={<Checkbox size="small" />}
                        label="Use AI Parsing"
                      />
                    </Box>
                  </FormControl>
                </Box>
              </Box>
            )}
          </Paper>
        </Wrapper>
      )}

      <IconButton
        data-active={isOpened ? "true" : "false"}
        onClick={() => setIsOpened((s) => !s)}
      >
        <AiUploadIcon />
      </IconButton>
    </Box>
  );
};

const Wrapper = styled.div`
  min-width: max-content;
  height: max-content;
  width: 400px;
  position: absolute;
  display: flex;

  height: 200px;

  top: -20px;
  left: calc(27px / 2);
  transform: translate(-50%, -100%);
`;

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

export default FileUploader;
