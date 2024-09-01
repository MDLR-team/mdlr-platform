import React from "react";
import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import styled from "styled-components";
import data from "./data/content.json";
import ReactMarkdown from "react-markdown";
import EditGroup from "@/components/dashboard-viewer/blocks/edit-group/edit-group";

const NodeSticker: React.FC<{
  data: {
    label: string;
  };
}> = ({ data }) => {
  return (
    <>
      <div className="text-updater-node">
        <Wrapper>{data?.label}</Wrapper>
      </div>
    </>
  );
};

const Wrapper = styled.div`
  width: 150px;
  height: 150px;
  padding: 20px;
  background: #fbf8af;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  gap: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  & {
    font-size: 14px;
    text-align: center;
    line-height: 1.5;
  }
`;

export default NodeSticker;
