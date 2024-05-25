import { Box } from "@mui/material";
import styled from "styled-components";

const CoverVer1 = () => {
  return (
    <Wrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "36px",
        }}
      >
        <Box data-type="cover">
          <b>AI-powered data for better built environment</b>
        </Box>
        <Box data-type="description">
          Mdlr is an AI-driven data visualisation, analysis, and optimisation
          platform for the projects in the AEC sector
        </Box>
      </Box>

      <Box
        sx={{
          height: "600px",
          display: "flex",
          width: "1200px",
          position: "relative",
          margin: "60px 0",
          border: "1px solid orange",
          backgroundColor: "white",
        }}
      >
        <iframe
          loading="lazy"
          src="https://player.vimeo.com/video/949359387?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1&amp;loop=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{
            position: "relative",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          title="Mdlr AI-powered data for better built environment"
        />
      </Box>

      <Box
        data-type="description"
        sx={{
          maxWidth: "820px !important",
          fontSize: "42px !important",
          margin: "80px 0px",
        }}
      >
        The tool is designed as a collaborative environment, integrating a
        whiteboard with AI chats, a 3D viewer, and a dashboard that presents
        easy-to-understand project&nbsp;data.
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: max-content;
  margin-top: 80px;

  padding: 0px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &,
  & * {
    text-align: center;
  }

  && div[data-type="cover"] {
    &,
    & * {
      font-size: 80px;
      color: rgba(0, 0, 0, 1);
      font-weight: 300;
      line-height: 1.1 !important;

      & b {
        font-weight: 700;
        font-family: Born;
        line-height: 1.1 !important;
      }
    }
  }

  && div[data-type="description"] {
    &,
    & * {
      font-size: 24px;
      font-weight: 300;
      line-height: 1.3 !important;
    }

    max-width: 600px;
  }
`;

export default CoverVer1;
