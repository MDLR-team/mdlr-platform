import { Paper } from "@mui/material";
import styled from "styled-components";
import Bar from "./bar/bar";
import CommentsBlock from "../comments/comment-layout/comment-layout";
import Share from "../layout/share/share";
import ToolPanel from "./tool-panel/tool-panel";

const UIGrid = () => {
  return (
    <Wrapper>
      <Grid>
        <BarWrapper>
          <Bar />
          <Share />
        </BarWrapper>

        <ContentWrapper>
          <CommentsBlock />
        </ContentWrapper>

        <FooterWrapper>
          <ToolPanel />
        </FooterWrapper>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  position: fixed;

  z-index: 2;

  display: flex;
  pointer-events: none;
`;

const Grid = styled.div`
  margin: 9px;
  width: 100%;

  display: grid;
  grid-template-rows: 45px auto 45px;
  grid-row-gap: 6px;

  & > * > * {
    pointer-events: all;
  }

  & > * > * {
    height: 100%;
  }
`;

const BarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  & > *:first-child {
    width: 100%;
    max-width: 250px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > *:first-child {
    width: 100%;
    max-width: 250px;
  }

  height: 100%;
  position: relative;
  overflow: hidden;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default UIGrid;
