import { Box, Paper } from "@mui/material";
import styled from "styled-components";
import UploadModel from "../content/blocks/upload-model";
import SyncExplorer from "../content/blocks/sync-explorer";

const NewModel: React.FC = () => {
  return (
    <Wrapper>
      <LayoutWrapper>
        <Box
          sx={{
            width: "100%",
            display: "block",
          }}
        >
          <Paper>
            <UploadModel />
          </Paper>
        </Box>

        <Paper>
          <SyncExplorer />
        </Paper>
      </LayoutWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 27px;
`;

export default NewModel;
