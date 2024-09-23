import { Box, Button, Tooltip } from "@mui/material";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import Link from "next/link";
import styled from "styled-components";

const Cover = () => {
  return (
    <>
      <CoverWrapper>
        <Background></Background>

        <Wrapper>
          <Box data-type="cover">
            Manage your design and&nbsp;construction projects efficiently with
            Mdlr
          </Box>

          <Box
            data-type="description"
            sx={{
              maxWidth: "750px",
            }}
          >
            {/* MdIr is an AI-driven data visualization, analysis, and optimization */}
            Visualise in{" "}
            <EntityLabel color="orange">
              <img src="/previews/a1a.svg" width="24" height="24" />
              &nbsp;3D&nbsp;Viewer
            </EntityLabel>
            , gain valuable project insights on{" "}
            <EntityLabel color="orange">
              <img src="/previews/a3a.svg" width="24" height="24" />
              &nbsp;Whiteboard
            </EntityLabel>{" "}
            , and make data-driven decisions using{" "}
            <EntityLabel color="orange">
              <img src="/previews/a2a.svg" width="24" height="24" />
              &nbsp;Dashboards
            </EntityLabel>{" "}
            — all in one place.
            <br />
            {/* <br />
        The tool is designed as a collaborative environment, integrating a
        whiteboard with AI chats, a 3D viewer, and a dashboard that presents
        easy-to-understand project data. */}
          </Box>

          <Link href="/requestdemo">
            <Button variant="contained" color="primary" size="large">
              Request a demo
            </Button>
          </Link>
        </Wrapper>
      </CoverWrapper>

      <CoverImage
        sx={{
          width: {
            xs: "75vw",
            sm: "1200px",
          },

          margin: {
            xs: "80px auto",
            sm: "50px 0px",
          },
        }}
      >
        <Img
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        ></Img>

        <ImgMobile
          sx={{
            display: { xs: "block", sm: "none" },
          }}
        ></ImgMobile>
      </CoverImage>
    </>
  );
};

const AECWithTooltip: React.FC<{
  children: React.ReactNode;
}> = () => {
  return (
    <Tooltip title="Architecture, Engineering, and Construction">
      <UnderlinedText>AEC</UnderlinedText>
    </Tooltip>
  );
};

const UnderlinedText = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const CoverImage = styled(Box)`
  position: relative;
  align-self: center;
`;

const Img = styled(Box)`
  position: relative;
  width: 100%;
  padding-bottom: 26%;
  background-image: url("/thumbs/cover.svg");
  background-size: cover;
  background-position: center;
`;

const ImgMobile = styled(Box)`
  position: relative;
  width: 100%;
  padding-bottom: 220%;
  background-image: url("/thumbs/cover-mobile.svg");
  background-size: cover;
  background-position: center;
`;

export const EntityLabel = styled.span<{
  color: string;
}>`
  gap: 10px;
  white-space: nowrap;

  &,
  & * {
    font-weight: 700;
  }

  /* &&::before {
    content: "";
    width: 10px;
    height: 10px;
    min-width: 10px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
  } */
`;

const CoverWrapper = styled.div`
  width: 100vw;

  position: relative;
`;

const Background = styled.div`
  position: absolute;
  z-index: -0;
  width: 100vw;
  height: 100vh;
  /* background: radial-gradient(
    rgb(68, 91, 222) 0%,
    rgb(215, 78, 243) 25%,
    rgb(255, 255, 255) 50%
  ); */
`;

const Wrapper = styled.div`
  width: 100vw;
  position: relative;
  z-index: 1;

  min-height: max-content;

  padding: 0px 80px;
  gap: 50px;

  @media (max-width: 576px) {
    padding: 0px 20px;
  }

  @media (min-width: 1200px) {
    height: 100vh;
    max-height: 600px;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &,
  & * {
    text-align: center;
  }

  && div[data-type="cover"] {
    max-width: 1200px;

    &,
    & * {
      font-size: var(--font-size-1);
      line-height: var(--line-height-0);
      font-family: "Euclid Circular A", sans-serif;
      font-weight: 700;
    }

    @media (max-width: 800px) {
      & {
        margin-top: 100px;
      }
    }
  }

  @media (max-width: 576px) {
    & div[data-type="divider"] {
      display: none;
    }
  }

  && div[data-type="description"] {
    &,
    & span {
      font-size: var(--font-size-l);
    }

    @media (max-width: 576px) {
      & img {
        width: 18px;
        height: 18px;
      }
    }

    & span {
      font-weight: 700;
    }

    color: var(--text-secondary);
    font-weight: 300;
  }
`;

export default Cover;
