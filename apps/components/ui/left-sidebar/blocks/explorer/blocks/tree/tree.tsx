import * as React from "react";
import Box from "@mui/material/Box";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import TreeItem from "../tree-item/tree-item";

const treeData: TreeViewBaseItem[] = [
  { id: "qualityControls", label: "Quality Controls Diary" },
  { id: "hvac", label: "Thoughts on HVAC" },
  { id: "dashboards", label: "Dashboards" },
  { id: "days", label: "days" },
];

const allIds = treeData.flatMap((item) => [
  item.id,
  ...(item.children ? item.children.map((child) => child.id) : []),
]);

const Tree = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {[
        {
          id: "qualityControls",
          label: "Quality Controls Diary",
        },
        {
          id: "hvac",
          label: "Thoughts on HVAC",
        },
        {
          id: "dashboards",
          label: "Dashboards",
        },
        {
          id: "days",
          label: "days",
        },
      ].map((item) => {
        return <TreeItem key={item.id} item={item} />;
      })}
    </Box>
  );
};

export default Tree;
