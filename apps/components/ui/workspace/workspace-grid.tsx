import styled, { css } from "styled-components";
import LeftBar2 from "./left-bar/left-bar-v2";

const WorkspaceGrid: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Wrapper>
        {/* <Tabs /> */}

        <Grid>
          <LeftBarWrapper>
            <LeftBar2 />
          </LeftBarWrapper>

          <ContentWrapper>{children}</ContentWrapper>
        </Grid>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f4f4f4;

  position: fixed;

  z-index: 4;

  display: flex;
  flex-direction: column;

  && *[data-type="user-profile"] {
    &: hover {
      background-color: #e4e2df;
      border: 1px solid #999999 !important;
    }
  }
`;

const Grid = styled.div`
  margin: 0px 18px 0px 0px;
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 280px auto;

  position: relative;

  & > * > * {
    pointer-events: all;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  overflow-x: hidden;

  gap: 18px;

  padding: 0px 18px 18px 18px;
  margin-top: 72px;
`;

const BarWrapper = css`
  & {
    display: flex;
    flex-direction: column;
    max-height: max-content;

    gap: 9px;
  }
`;

const LeftBarWrapper = styled.div`
  ${BarWrapper}
`;

const RightBarWrapper = styled.div`
  ${BarWrapper}
`;

export default WorkspaceGrid;
