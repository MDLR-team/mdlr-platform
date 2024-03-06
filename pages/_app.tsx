import { AuthProvider } from "@/components/auth/auth-provider";
import Wrapper from "@/components/layout/wrapper/wrapper";
import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";

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

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;

    &, & * {
      color: #333333;
      font-size: 12px;
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

  // Papers
  & .MuiPaper-root {
    & {
      & {
        border-radius: 9px !important;
        box-shadow: none !important;
        position: relative;
        display: flex;
        gap: 9px;

        padding: 9px;
        box-sizing: border-box;
      }
    }
  }

  // IconButtons
  & .MuiButtonBase-root {
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
      background-color: #FEFAE5 !important;
    }

    & > svg {
      min-width: 18px;
      min-height: 18px;
    }
  }

  // MuiButton
  & .MuiButton-root {
    border-radius: 9px !important;
    background-color: #f9e05e !important;
    box-shadow: none !important;
    min-width: max-content;
    height: 33px;

    &, & * {
      color: #333333 !important;
      text-transform: none !important;
    }
  }
`;

export default App;
