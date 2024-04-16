import { Box } from "@mui/material";
import { Handle, Position } from "reactflow";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "styled-components";

const handleStyle = { left: 10 };

const NodeTableType = ({ data, isConnectable }: any) => {
  const rows = Array.from({ length: 15 }).map((_, index) => ({
    id: index + 1,
    name: `Function ${index + 1}`,
    value: `Value ${index + 1}`,
  }));

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Box
        sx={{
          width: "140px",
          height: "200px",
          background: "white",
          border: "1px solid grey",
          borderRadius: "9px",
          overflow: "auto",
        }}
      >
        <Wrapper>
          <TableContainer>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
  && {
    &,
    & * {
      font-size: 6px;
    }
  }
`;

export default NodeTableType;
