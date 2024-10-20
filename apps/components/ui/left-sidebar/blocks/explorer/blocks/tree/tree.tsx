import * as React from "react";
import Box from "@mui/material/Box";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";

const treeData: TreeViewBaseItem[] = [
  {
    id: "autodesk",
    label: "Autodesk",
    children: [{ id: "tandem", label: "Tandem" }],
  },
  { id: "cxm", label: "CXM" },
  {
    id: "dashboards",
    label: "Dashboards",
    children: [
      { id: "pbd-dashboards", label: "PBD Dashboards" },
      { id: "coordinates", label: "The coordinates" },
    ],
  },
  {
    id: "days",
    label: "days",
    children: [
      { id: "02-10-2024", label: "02-10-2024" },
      { id: "03-10-2024", label: "03-10-2024" },
      { id: "17-10-2024", label: "17-10-2024" },
      { id: "18-10-2024", label: "18-10-2024" },
      { id: "19-10-2024", label: "19-10-2024" },
    ],
  },
  {
    id: "global-talent-visa",
    label: "Global talent visa",
    children: [
      { id: "global-talent-visa-label", label: "Global Talent Visa" },
      { id: "global-talent-visa-canvas", label: "Global talent visa - canvas" },
      { id: "successful-stories", label: "Successful Stories" },
    ],
  },
  { id: "hit-walls", label: "Hit walls" },
  {
    id: "mdlr",
    label: "MDLR",
    children: [
      {
        id: "marketing",
        label: "Marketing",
        children: [{ id: "articles", label: "Articles" }],
      },
      {
        id: "sales",
        label: "Sales",
        children: [
          { id: "open-source-examples", label: "Open Source examples" },
          { id: "open-source-strategy", label: "Open source strategy" },
          { id: "untitled-canvas", label: "Untitled canvas" },
        ],
      },
      {
        id: "viewer",
        label: "Viewer",
        children: [
          { id: "viewer-features", label: "Viewer Features" },
          { id: "hit-the-wall-issue", label: "Hit the wall Issue" },
          { id: "mdlr-label", label: "MDLR" },
        ],
      },
    ],
  },
  { id: "parties", label: "Parties" },
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
      }}
    >
      <RichTreeView defaultExpandedItems={allIds} items={treeData} />
    </Box>
  );
};

export default Tree;
