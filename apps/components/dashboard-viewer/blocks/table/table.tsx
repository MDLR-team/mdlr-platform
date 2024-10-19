import React from "react";
import styled from "styled-components";
import tableData from "./table.json";
import Avatar from "@/components/layout/avatar/avatar";
import CommentContent from "@/components/comments/comment-layout/blocks/comment/blocks/comment-content";
import { Box } from "@mui/material";
import stc from "string-to-color";

const TableSection = () => {
  return (
    <TableLayout>
      <TableWrapper>
        <TableGrid>
          {tableData.map((comment: any, index) => {
            /* const allPossibleTags = [
              "Design",
              "Management",
              "Cost",
              "Quality",
              "Risk",
              "Team",
              "Site",
              "Client",
              "Quality Control",
              "Budget",
            ]; */

            const topicTags = comment.topic_tags;
            const allTags = Object.values(topicTags).flat();

            return (
              <React.Fragment key={index}>
                <div>
                  <Avatar username={comment.author_username} size="small" />
                </div>
                <div
                  style={{
                    paddingBottom: "15px",
                    paddingRight: "30px",
                  }}
                >
                  <CommentContent content={comment.content} />
                </div>
                <div>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      paddingBottom: "10px",
                    }}
                  >
                    {allTags.map((tag: any, i: number) => (
                      <Box
                        key={i}
                        sx={{
                          padding: "2px 4px",
                          borderRadius: "5px",
                          fontSize: "12px",
                          color: "rgba(0, 0, 0, 1)",
                          border: "1px solid #ccc",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Box
                          sx={{
                            minWidth: "6px",
                            width: "6px",
                            height: "6px",
                            minHeight: "6px",
                            borderRadius: "50%",
                            backgroundColor: stc(tag[0]),
                          }}
                        />

                        {`${tag[0]} - ${tag[1]}%`}
                      </Box>
                    ))}
                  </Box>
                </div>
              </React.Fragment>
            );
          })}
        </TableGrid>
      </TableWrapper>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        <Box>2 minutes ago</Box>

        <Box>
          <b>124 comments</b>
        </Box>
      </Box>
    </TableLayout>
  );
};

const TableGrid = styled.div`
  width: 100%;
  min-height: max-content;
  display: grid;
  grid-template-columns: 30px 2fr 2fr;
  gap: 10px;

  & > div {
    min-height: 40px;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  border-bottom: 2px solid #e0e0e0;
`;

const TableLayout = styled.div`
  width: 100%;
  overflow-x: hidden;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  max-height: 290px;
`;

export default TableSection;
