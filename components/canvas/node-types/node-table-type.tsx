import { Box, CircularProgress, Tab } from "@mui/material";
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
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const NodeTableType = ({ data, isConnectable }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timer to simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide spinner after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  const rows = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, index) => {
        const randomInt = Math.floor(Math.random() * 1000);

        // generate value 'Mark_123' or 'John_456' or 'Element_789'
        const values = ["Window", "Beam", "Wall", "Partition"];
        const randomValue = values[Math.floor(Math.random() * values.length)];

        return {
          id: index + 1,
          name: `Element_${randomInt}`,
          value: `${uuidv4()}`,
          type: randomValue,
        };
      }),
    []
  );

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
          width: "240px",
          height: "max-content", // 'max-content' is the same as 'auto'
          maxHeight: "400px",
          background: "white",
          border: "1px solid grey",
          borderRadius: "9px",
          overflow: "scroll",
          position: "relative",
        }}
      >
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: isLoading ? "grey" : "white",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoading && <CircularProgress />}
          </Box>
        )}

        <Wrapper>
          <TableContainer>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>{row.type}</TableCell>
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
    height: max-content;

    &,
    & * {
      font-size: 6px;
    }

    & .MuiTableCell-root {
      padding: 4px 8px !important;
    }
  }
`;

export default NodeTableType;
