import AuthProvider from "@/components/services/app-services/auth/auth-provider";
import Wrapper from "@/components/layout/wrapper/wrapper";
import type { AppProps } from "next/app";
import { createGlobalStyle, css } from "styled-components";
import AboutPage from "./about";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />

      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </>
  );
};

const LandingPageStyles = css`
  :root {
    --background-color: white;
    --text-primary: black;
    --text-secondary: rgba(0, 0, 0, 0.8);
    --button-primary: black;
    --button-text-primary: white;
    --border-color: rgba(0, 0, 0, 0.9);
    --bar-color: white;
    --primary-font-family: "Euclid Circular A", sans-serif;
  }

  @font-face {
    font-family: "Euclid Circular A";
    src: url("/fonts/Euclid Circular A Bold.ttf") format("truetype");
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: "Euclid Circular A";
    src: url("/fonts/Euclid Circular A Bold Italic.ttf") format("truetype");
    font-weight: bold;
    font-style: italic;
  }

  @font-face {
    font-family: "Euclid Circular A";
    src: url("/fonts/Euclid Circular A Italic.ttf") format("truetype");
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: "Euclid Circular A";
    src: url("/fonts/Euclid Circular A Light.ttf") format("truetype");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "Euclid Circular A";
    src: url("/fonts/Euclid Circular A Light Italic.ttf") format("truetype");
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: "Euclid Circular A";
    src: url("/fonts/Euclid Circular A Medium.ttf") format("truetype");
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: "Euclid Circular A";
    src: url("/fonts/Euclid Circular A Medium Italic.ttf") format("truetype");
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: "Euclid Circular A";
    src: url("/fonts/Euclid Circular A Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Euclid Circular A";
    src: url("/fonts/Euclid Circular A SemiBold.ttf") format("truetype");
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: "Euclid Circular A";
    src: url("/fonts/Euclid Circular A SemiBold Italic.ttf") format("truetype");
    font-weight: 600;
    font-style: italic;
  }

  & .MuiButton-root {
    border-radius: 200px !important;

    &.MuiButton-containedPrimary {
      background-color: var(--button-primary) !important;
      &,
      & * {
        color: var(--button-text-primary) !important;
      }
    }

    &.MuiButton-sizeLarge {
      padding: 12px 24px !important;
      height: 80px !important;

      &,
      & * {
        font-size: 24px !important;
      }
    }
  }

  &#use-cases-menu {
    & > &.MuiPaper-root {
      max-width: max-content !important;
    }
  }

  a {
    text-decoration: none;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
    background-color: var(--background-color);
    overflow-x: hidden;

    &, & * {
      color: var(--text-primary);
      font-size: 12px;
      box-sizing: border-box;
      font-family: "Inter", sans-serif
    }
  }

  // Landing Page Styles
  ${LandingPageStyles}
  

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
    & .MuiInputBase-root {
      padding: 8px;

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
        border: 1px solid var(--border-color) !important;
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
    max-width: max-content !important;

    &, & * {
      font-size: 12px;
    }

    & .MuiMenuItem-root {
      border-radius: 8px !important;
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

    &[data-active="true"] {
      background-color: #FEFAE5 !important;
    }

    & > svg {
      min-width: 18px;
      min-height: 18px;
    }

    &.Mui-disabled {
      opacity: 0.4;
    }
  }

  // MuiButton
  && .MuiButton-root {
    min-width: max-content;
    height: 33px;

    &.MuiButton-sizeSmall {
      height: 27px;
    }

    &.MuiButton-contained {
      box-shadow: none !important;
    }

    &.MuiButton-containedPrimary {
      background-color: #f9e05e;
      
      &:hover {
        background-color: #f9e05e;
      }
    }

    &, & * {
      color: #333333;
      text-transform: none !important;
    }
  }

  // Forge Viewer
  & .forge-spinner {
    display: none !important;
  }

  & .adsk-control.adsk-toolbar {
    display: none !important;
  }

  & .viewcubeWrapper {
    left: auto !important;
    top: auto !important;
    right: 10px !important;
    bottom: 10px !important;
    border: 1px solid grey;
  }

  // tooltips
  & .MuiTooltip-tooltip {
    font-size: 14px;
    background-color: black;
    padding: 8px 16px;
  }
`;

export default App;
