import { Box, Button } from "@mui/material";
import { Handle, Position } from "reactflow";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import StickerService from "./service/sticker-service";
import { useNodes } from "../../node-service/node-provider";

const NodeStickerType = ({ data, isConnectable }: any) => {
  const { nodes, nodeService } = useNodes();

  const [expanded, setExpanded] = useState(false);

  const [stickerService] = useState(
    () => new StickerService(nodeService, data.id)
  );

  useEffect(() => {
    return () => {
      stickerService.dispose();
    };
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [useAI, setUseAI] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box
        id={`box${data.id}`}
        sx={{
          width: !expanded ? "150px" : "180px",
          minHeight: !expanded ? "150px" : "30px",
          background: "#f9f1c3",
          border: "1px solid #000",
          borderRadius: "9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "9px",
          transition: "all 0.3s",
        }}
      >
        <Wrapper>
          {expanded && (
            <>
              <Box
                sx={{
                  display: "flex",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <i>Prompt</i>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  fontSize: "12px",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  lineClamp: 2,
                  textOverflow: "ellipsis",
                }}
              >
                {inputValue}
              </Box>
            </>
          )}

          {!expanded && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <i>Prompt</i>
              </Box>
              <br />
              <TextField
                placeholder="Type 'Generate...' or your desired prompt"
                label={null}
                variant="standard"
                size="small"
                multiline
                sx={{ padding: "0px" }}
                spellCheck={false}
                value={inputValue}
                onChange={handleInputChange}
              />

              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  setExpanded(true);

                  stickerService.generate(inputValue, useAI);
                }}
                sx={{ marginTop: "9px" }}
              >
                Generate
              </Button>
            </>
          )}
        </Wrapper>
      </Box>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
};

const Wrapper = styled.div`
  &&& {
    display: flex;
    flex-direction: column;
    width: 100%;

    & .MuiInputBase-root {
      padding: 0px;
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.8);
    }

    & .MuiButton-root {
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
`;

export default NodeStickerType;
