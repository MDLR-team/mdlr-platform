import React from "react";
import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import styled from "styled-components";
import data from "./data/content.json";
import ReactMarkdown from "react-markdown";
import EditGroup from "@/components/dashboard-viewer/blocks/edit-group/edit-group";

const NodePrompt = () => {
  return (
    <>
      <div className="text-updater-node">
        <Handle type="target" position={Position.Top} isConnectable={true} />

        <EditGroup>
          <Wrapper>
            <h3>{data.title}</h3>
            {data.summary.map((item, index) => (
              <Box key={index}>
                <h4 style={{ paddingTop: "12px", paddingBottom: "8px" }}>
                  {item.title}
                </h4>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Box
                    sx={{
                      width: "5px",
                      minWidth: "5px",
                      height: "5px",
                      maxHeight: "5px",
                      borderRadius: "50%",
                      backgroundColor: "black",
                      marginTop: "3px",
                    }}
                  ></Box>
                  <ReactMarkdown>{item.content}</ReactMarkdown>
                </Box>
              </Box>
            ))}

            <h3 style={{ paddingTop: "24px" }}>Overall:</h3>
            <ReactMarkdown>{data.overall}</ReactMarkdown>
          </Wrapper>
        </EditGroup>

        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          isConnectable={true}
        />
      </div>
    </>
  );
};

const Wrapper = styled.div`
  width: 440px;
  padding: 40px;
  background: white;
  border: 2px solid black;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3 {
    margin: 0;
    font-size: 16px;
  }

  h4 {
    margin: 5px 0;
    font-size: 14px;
  }

  p {
    margin: 0;

    &,
    & * {
      font-size: 12px;
    }
  }
`;

export default NodePrompt;
