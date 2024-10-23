import AuthProvider from "@/components/services/app-services/auth/auth-provider";
import Wrapper from "@/components/layout/wrapper/wrapper";
import type { AppProps } from "next/app";
import { createGlobalStyle, css } from "styled-components";
import { Analytics } from "@vercel/analytics/react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Analytics />

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

const TipTapStyles = css`
  /* Base editor styles */
  .tiptap-editor {
    padding: 10px;
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    min-height: 100%;
    overflow-y: auto; /* Allow scrolling when the content exceeds the height */
    display: flex;
  }

  .tiptap.ProseMirror {
    min-height: 100%;
    width: 100%;
    border: 0px !important;
    outline: none !important;

    &.ProseMirror-focused {
      // remove the border when the editor is focused
      border-color: transparent;
    }
  }

  /* Paragraphs and text content */
  .tiptap-editor p {
    margin: 0 0 0px; /* Space between paragraphs */
    padding: 0;
    font-size: 15px;
  }

  /* Headings */
  .tiptap-editor h1 {
    font-size: 24px; /* Large heading */
  }

  .tiptap-editor h2 {
    font-size: 20px; /* Medium heading */
  }

  .tiptap-editor h3 {
    font-size: 18px; /* Small heading */
  }

  .tiptap-editor strong {
    font-weight: bold; /* Bold text */
  }

  .tiptap-editor em {
    font-style: italic; /* Italic text */
  }

  .tiptap-editor blockquote {
    margin: 0 0 10px;
    padding-left: 10px;
    border-left: 3px solid #ccc; /* Blockquote styles */
    color: #666;
  }

  .tiptap-editor ul,
  .tiptap-editor ol {
    padding-left: 20px; /* Indentation for lists */
  }

  .tiptap-editor li {
    margin-bottom: 5px; /* Spacing between list items */
  }

  /* Mention styles */
  .mention {
    color: blue;
    padding: 2px 4px;
    border-radius: 4px;
    cursor: pointer; /* Make mentions clickable */
  }

  /* Tag styles */
  .tag {
    color: green;
    background-color: #e0ffe0;
    padding: 2px 4px;
    border-radius: 4px;
    cursor: pointer;
  }

  /* Placeholder styles (if you're using placeholder extension) */
  .tiptap-editor.is-empty::before {
    content: attr(
      data-placeholder
    ); /* Placeholder text from the data-placeholder attribute */
    color: #aaa;
    font-style: italic;
  }

  /* Popup suggestion styles */
  .suggestion-popup {
    z-index: 100;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 8px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
  }

  .suggestion-popup div {
    padding: 5px;
    cursor: pointer;
    border-radius: 3px;
  }

  .suggestion-popup div:hover {
    background-color: #f0f0f0; /* Highlight hovered suggestion */
  }

  .dropdown-menu {
    background: var(--white);
    border: 1px solid var(--gray-1);
    border-radius: 0.7rem;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    overflow: auto;
    padding: 0.4rem;
    position: relative;

    & button.is-selected {
      background-color: var(--gray-2);
    }

    & button {
      align-items: center;
      background-color: transparent;
      display: flex;
      gap: 0.25rem;
      text-align: left;
      width: 100%;
      cursor: pointer;

      &:hover {
        background-color: var(--gray-2);
      }

      border-radius: 0.5rem;
      border: none;
      color: var(--black);
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.15;
      margin: none;
      padding: 0.375rem 0.625rem;
      transition: all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
    }
  }

  // Comment References
  .ed-comment-ref {
    display: flex;
    gap: 5px;
    margin: 5px;

    max-width: max-content;
    border: 1px solid var(--gray-4);

    border-radius: 9px;
    padding: 2px;

    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }

    & .ed-comment-avatar {
      min-width: 20px;
      max-width: 20px;
      min-height: 20px;
      max-height: 20px;
      background-color: #309b57;
      color: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const MuiTreeStyles = css`
  .MuiRichTreeView-root {
    &,
    & * {
      font-size: 14px !important;
      color: #686868 !important;
    }
  }
`;

const ReactSplitStyles = css`
  .gutter.gutter-horizontal {
    &:hover,
    &.gutter-dragging {
      background-color: #ec6033 !important;
      outline: 1px solid #ec6033 !important;
      cursor: col-resize !important;

      z-index: 1000 !important;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  // variables
  :root {
    --color-primary: #F6754C;
    --color-primary-dark: #EC6033;

    --color-secondary: #0E1931;

    --color-error-500: #DE3830;

    --white: #FFF;
    --black: #2E2B29;
    --black-contrast: #110F0E;
    --gray-1: rgba(61, 37, 20, .05);
    --gray-2: rgba(61, 37, 20, .08);
    --gray-3: rgba(61, 37, 20, .12);
    --gray-4: rgba(53, 38, 28, .3);
    --gray-5: rgba(28, 25, 23, .6);
    --green: #22C55E;
    --purple: #6A00F5;
    --purple-contrast: #5800CC;
    --purple-light: rgba(88, 5, 255, .05);
    --yellow-contrast: #FACC15;
    --yellow: rgba(250, 204, 21, .4);
    --yellow-light: #FFFAE5;
    --red: #FF5C33;
    --red-light: #FFEBE5;
    --shadow: 0px 12px 33px 0px rgba(0, 0, 0, .06), 0px 3.618px 9.949px 0px rgba(0, 0, 0, .04);
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
    background: rgba(0,0,0,0.1); /* color of the scroll thumb */
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
      border: 1.5px solid var(--color-primary-dark);
      
      &:hover {
        background-color: var(--color-primary);
      }

      &.Mui-disabled {
        background-color: lightgrey;
        border: 1px solid lightgrey;
      }

      &, & * {
        color: white !important;
        stroke: white !important;
      }
    }

    &.MuiButton-containedSecondary {
      background-color: white;
      border: 1px solid lightgrey;
      
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

  // TipTap
  ${TipTapStyles}

  // React Split
  ${ReactSplitStyles}

  // MuiTree
  ${MuiTreeStyles}
`;

export default App;
