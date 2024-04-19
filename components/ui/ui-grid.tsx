import styled from "styled-components";
import Bar from "./bar/bar";
import CommentsBlock from "../comments/comment-layout/comment-layout";
import Share from "../layout/share/share";
import ToolPanel from "./tool-panel/tool-panel";
import ActiveCommentDialog from "./active-comment-dialog/active-comment-dialog";
import ViewStateMode from "./view-state-mode/view-state-mode";
import CommentForm from "./floating-dialogs/comment-form/comment-form";
import {
  BarWrapper,
  ContentWrapper,
  FloatingWrapper,
  FooterWrapper,
  Grid,
  Wrapper,
} from "./ui-grid.styled";

const UIGrid = () => {
  return (
    <>
      <ViewStateMode />

      <FloatingWrapper>
        <CommentForm />
        <ActiveCommentDialog />
      </FloatingWrapper>

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
    </>
  );
};

export default UIGrid;
