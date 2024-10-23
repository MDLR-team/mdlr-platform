import styled from "styled-components";

export const FloatingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  z-index: 4;
  top: 0;
  left: 0;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  position: absolute;

  z-index: 5;

  display: flex;
`;

export const Grid = styled.div`
  padding: 9px;
  width: 100%;
  height: 100%;
  pointer-events: none;

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

export const BarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  & > *:first-child {
    width: 100%;
    max-width: 340px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > *:first-child {
    width: 100%;
    max-width: 340px;
  }

  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
