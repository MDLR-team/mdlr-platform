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
import { useNodes } from "../../node-service/node-provider";
import TableService, { TableData } from "./service/table-service";

const NodeTableType = ({ data, isConnectable }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  const { nodeService } = useNodes();

  const [tableData, setTableData] = useState<TableData | null>(null);
  const [tableService] = useState(() => new TableService(nodeService, data));

  useEffect(() => {
    const ep = tableService.tableData$.subscribe((tableData) =>
      setTableData(tableData)
    );

    return () => {
      ep.unsubscribe();

      tableService.dispose();
    };
  }, []);

  useEffect(() => {
    // Set a timer to simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide spinner after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  /* const rows = useMemo(
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
  ); */

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
          width: "300px",
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

        {tableData && (
          <Wrapper>
            <TableContainer>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    {tableData.columns.map((column) => (
                      <TableCell key={column}>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.rows
                    .filter((_, i) => i < 20)
                    .map((row) => (
                      <TableRow key={row.id}>
                        {tableData.columns.map((column) => {
                          let value: any = row[column]
                            ? JSON.stringify(row[column])
                            : "";

                          if (Array.isArray(row[column])) {
                            value = (
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: "2px",
                                  flexWrap: "wrap",
                                }}
                              >
                                {row[column].map((v: any, index: number) => {
                                  let _value = v;

                                  if (Array.isArray(v)) {
                                    _value = v.join(" - ");
                                  }

                                  return (
                                    <Box
                                      key={index}
                                      sx={{
                                        display: "flex",
                                        padding: "1px 3px",
                                        border: "1px solid grey",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      {_value}
                                    </Box>
                                  );
                                })}
                              </Box>
                            );
                          }

                          return <TableCell key={column}>{value}</TableCell>;
                        })}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Wrapper>
        )}
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
