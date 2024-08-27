import AuthProvider from "@/components/services/app-services/auth/auth-provider";
import Wrapper from "@/components/layout/wrapper/wrapper";
import type { AppProps } from "next/app";
import { createGlobalStyle, css } from "styled-components";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />

      <AuthProvider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </AuthProvider>
    </>
  );
};
const TextFieldStyles = css`
  // TEXT INPUTS
  & .MuiInputBase-root {
    border-radius: 9px;

    & input {
      height: 33px;
      box-sizing: border-box;
      font-size: 12px;
      padding: 0 9px;
    }
  }
`;

const MentionListStyles = css`
  & ul[role="listbox"] {
    & li {
      padding: 5px;
    }

    & li:hover,
    & li[aria-selected="true"] {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  // variables
  :root {
    --color-primary: #F6754C;
    --color-secondary: #0E1931;

    --color-error-500: #DE3830;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
    background-color: #F1F0EE;

    &, & * {
      color: #333333;
      font-size: 12px;
      box-sizing: border-box;
      font-family: "Inter", sans-serif;
    }
  }

  ::-webkit-scrollbar {
    width: 3px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: rgba(0,0,0,0);
  }

  ::-webkit-scrollbar-thumb {
    background: #8C8C8C; /* color of the scroll thumb /
    border-radius: 3px; / roundness of the scroll thumb */
    }
    
  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* color when hovering over the scroll thumb */
  }


  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(.4) ;
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.4;
    }
    100% {
      transform: translate(-50%, -50%) scale(.4);
      opacity: 1;
    }
  }

  & .MuiFormControl-root {
    & .MuiInput-root {
      &::before, &::after {
        display: none;
      }

      & input {
        padding: 0px;
      }
    }

    & .MuiFormControlLabel-root {
      &, & * {
        font-size: 12px 
      }
    }

    & .MuiInputBase-root {
      padding: 8px;
      

      &, & * {
        font-size: 12px 
      }

      // small size
      &.MuiInputBase-sizeSmall {
        padding: 5px;
      }
    }
  }

  // Papers
  & .MuiPaper-root {
    & {
      & {
        border-radius: 8px !important;
        border: 1px solid #E0E0E0 !important;
        box-shadow: none !important;
        position: relative;
        display: flex;
        gap: 9px;

        padding: 9px;
        box-sizing: border-box;
      }
    }
  }

  & .MuiPopover-paper {
    &, & * {
      font-size: 12px !important;
      color: #333333;
    }

    & .MuiMenuItem-root {
      border-radius: 8px !important;
    }
  }

  // Tabs
  & .MuiTabs-root {
    min-height: 27px !important;
    height: 27px !important;
    border-radius: 9px !important;
    border: 1px solid black !important;

    & .MuiButtonBase-root {
      &, & * {
        min-height: 27px !important;
        height: 27px !important;
        font-size: 12px !important;
        text-transform: none !important;
        padding: 0px 18px !important;
      }

      &.Mui-selected {
        color: white !important;
        background-color: black !important;
        border-radius: 8px !important;
      }
    }

    & .MuiTabs-indicator {
      background-color: grey !important;
      display: none !important;
    }
  }

  // IconButtons
  & .MuiButtonBase-root.MuiIconButton-root {
    min-width: 27px;
    width: 27px;
    height: 27px;
    min-height: 27px;

    margin: 0;
    padding: 0;

    &:not([data-type='exception']) {
    border-radius: 9px !important;
    }

    &[data-active="true"] {
      background-color: #EDF1F4;
    }

    & > svg {
      min-width: 18px;
      min-height: 18px;
    }

    &.Mui-disabled {
      opacity: 0.4;
    }

    &.MuiIconButton-colorPrimary {
      background-color: var(--color-primary);
      &, & * {
        stroke: white !important;
      }  
    }
  }

  // MuiButton
  && .MuiButton-root, && .MuiButtonBase-root {
    border-radius: 8px !important;
    min-width: max-content;
    height: 33px;

    &.MuiButton-sizeSmall {
      height: 27px;
    }

    &.MuiButton-contained {
      box-shadow: none !important;
    }

    &.MuiButton-containedPrimary {
      background-color: var(--color-primary);
      
      &:hover {
        background-color: var(--color-primary);
      }

      &, & * {
        color: white !important;
        stroke: white !important;
      }
    }

    &.MuiButton-containedSecondary {
      background-color: white;
      border: 1px solid var(--color-primary);
      
      &:hover {
        background-color: white;
      }

      &, & * {
        color: black !important;
        stroke: black !important;
      }
    }

    &.MuiButton-containedError {
      background-color: transparent !important;
      border: 1px solid var(--color-error-500) !important;

      &, & * {
        color: var(--color-error-500) !important;
      }
    }

    &, & * {
      color: #333333;
      text-transform: none !important;
    }
  }

  & .MuiButtonBase-root {
    &, & * {
      color: #333333 !important;
    }
  }

  // Divider
  & .MuiDivider-root {
    &.MuiDivider-vertical {
      height: 20px;
    }
  }

  // Forge Viewer
  & .forge-spinner {
    display: none !important;
  }

  & .adsk-control.adsk-toolbar {
    display: none !important;
  }

    
  // Properties panel
  & &.docking-panel-title {
       border-bottom: 1px solid transparent !important;
  }

  & &.docking-panel.model-structure-panel {
    & {
      z-index: 1000 !important;
    }

    & &.docking-panel-title {
       border-bottom: 1px solid transparent !important;
    }

    & {
      border-radius: 9px !important;
      overflow: hidden !important;
      box-shadow: none !important;
      border: 1px solid #E0E0E0 !important;
    }

    &&&&& > div {
      background-color: #ffffff !important;

      &, & * {
        color: #333333;
        font-family: "Roboto", sans-serif;
        font-size: 12px;
      }

      & .collapsed.group, & .model-div {
        background-color: white;

        &:hover {
          background-color: rgba(0,0,0,.005) !important;
        }
      }
    }
  }

  // Poppers
  & &.base-Popper-root {
    z-index: 10 !important;
  }

  & &.adsk-control.adsk-searchbox {
    & input {
      background-color: white !important;
      width: calc(100% - 18px) !important;
      margin-left: 9px !important;
      border-radius: 9px;
      border: 1px solid rgba(0,0,0,0.2) !important;
      box-shadow: none !important;
    }
  }

  & .viewcubeWrapper {
    left: auto !important;
    top: auto !important;
    right: 10px !important;
    bottom: 10px !important;
    border: 1px solid grey;
  }

  // React flow
  & .react-flow__handle {
    background-color: rgb(156, 163, 175) !important;
    width: 9px !important;
    height: 9px !important;
    border-radius: 50% !important;
  }

  & .MuiSlider-thumb, & .MuiSwitch-thumb {
    width: 8px !important;
    height: 16px !important;
    border-radius: 2px !important;
  }

  // TextFields
  ${TextFieldStyles}

  // Mentions
  ${MentionListStyles}
`;

export default App;
