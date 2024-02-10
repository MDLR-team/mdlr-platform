import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />

      <Component {...pageProps} />
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
`;

export default App;
