import React from "react";

import { Box, Divider, IconButton, Paper } from "@mui/material";
import CommentsIcon from "@/components/ui/icons/comments-icon";
import {
  CommentList,
  Header,
  List,
} from "@/components/comments/comment-layout/comment-layout.styled";
import PromptSearchBar from "./blocks/prompt-search-bar/prompt-search-bar";
import copilotDialogData from "./data/copilot-dialog.json";
import { Wrapper } from "@/components/comments/comment-layout/blocks/comment/comment";
import ResolveIcon from "../../icons/resolve-icon";
import Avatar from "@/components/layout/avatar/avatar";
import moment from "moment";
import { useAuth } from "@/components/services/app-services/auth/auth-provider";

const CommentsBlock: React.FC = () => {
  const { userMetadata } = useAuth();

  return (
    <>
      <Paper sx={{ flexDirection: "column" }}>
        {/* Header */}
        <Header>
          <Box sx={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <IconButton>
              <CommentsIcon />
            </IconButton>

            <Box
              sx={{
                fontSize: "14px",
              }}
            >
              Dashboard Copilot
            </Box>
          </Box>
        </Header>

        <Header>
          <PromptSearchBar />
        </Header>

        <CommentList>
          <List>
            {copilotDialogData.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Wrapper>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "9px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          columnGap: "9px",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", columnGap: "9px" }}>
                          <Avatar
                            isCopilot={
                              item.author_type === "Copilot" ? true : false
                            }
                            username={
                              item.author_type === "client"
                                ? userMetadata?.username!
                                : "Copilot"
                            }
                            size="small"
                          />

                          <Box
                            sx={{
                              display: "flex",
                              gap: "2px",
                              flexDirection: "column",
                            }}
                          >
                            <Box sx={{ display: "flex", gap: "9px" }}>
                              <Box sx={{ fontWeight: "500" }}>
                                {item.author_type === "client"
                                  ? userMetadata?.username
                                  : "Copilot"}
                              </Box>
                            </Box>

                            <Box
                              sx={{
                                color: "#999999",
                                fontSize: "9px",
                                fontWeight: "500",
                              }}
                            >
                              <Box sx={{ color: "#999999" }}>
                                {"6 minutes ago"}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      <Box>{item.message}</Box>

                      {item.table && (
                        <Box>
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse", // Ensure borders collapse into a single border
                              borderRadius: "8px",
                              marginTop: "8px",
                            }}
                          >
                            <thead>
                              <tr
                                style={{
                                  backgroundColor: "#f2f2f2", // Add a grey background to the table header
                                }}
                              >
                                {item.table.header.map((column, index) => (
                                  <th
                                    key={index}
                                    style={{
                                      textAlign: "left",
                                      minWidth: "max-content",
                                      border: "1px solid #ddd", // Add border to table headers
                                      padding: "4px", // Add padding to table headers
                                      fontSize: "11px",
                                    }}
                                  >
                                    {column}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {item.table.rows.map((row, index) => (
                                <tr key={index}>
                                  {row.map((cell, index) => (
                                    <td
                                      key={index}
                                      style={{
                                        border: "1px solid #ddd", // Add border to table cells
                                        padding: "8px", // Add padding to table cells
                                        fontSize: "11px",
                                      }}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </Box>
                      )}

                      {item.attachments && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                          }}
                        >
                          {item.attachments.map((attachment, index) => (
                            <Box
                              key={index}
                              sx={{
                                color: "blue",
                                padding: "10px",
                                borderRadius: "8px",
                                border: "1px solid blue",
                              }}
                            >
                              {attachment.name}
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Wrapper>

                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        </CommentList>
      </Paper>
    </>
  );
};

export default CommentsBlock;
