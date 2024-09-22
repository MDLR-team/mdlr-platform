import { useState } from "react";
import { Box, Button, ButtonGroup, Divider } from "@mui/material";
import { title } from "process";
import CheckIcon from "@mui/icons-material/Check";
import WideScreen from "../about/layout/wide-screen";
import WideHeader from "../about/layout/wide-header";
import styled, { css } from "styled-components";

const Screens = () => {
  // Define the slides data
  const slides = [
    {
      badge: "3D Viewer",
      backgroundImage:
        "url(https://images.ctfassets.net/kftzwdyauwt9/2Wet7rkEt83TBP19pRaoSU/c227e5b5949a5931c343eeb70e4bd99f/Mac_App_Hero_V1.png?w=3840&q=90&fm=webp)",
      thumbnail: "/thumbs/c11.png",
      title: "Instantly Explore and Annotate 3D Models",
      description:
        "Leave feedback directly on 3D models—comments, drawings, and media—all in real-time with your team.",
      features: [
        "Comments & Drawing Tools",
        "Real-Time Collaboration",
        "Media Attachments",
        "AI-Powered Search",
        "Custom Widgets (Enterprise)",
      ],
    },

    {
      badge: "Dashboard",
      backgroundImage:
        "url(https://images.ctfassets.net/kftzwdyauwt9/2Wet7rkEt83TBP19pRaoSU/c227e5b5949a5931c343eeb70e4bd99f/Mac_App_Hero_V1.png?w=3840&q=90&fm=webp)",
      thumbnail: "/thumbs/c34.png",
      title: "Interactive Reports with Real-Time Updates",
      description:
        "Tailored dashboards for end-users with dynamic charts, real-time data, AI insights, and multiple download formats",
      features: [
        "Pre-built chart components",
        "Real-time data updates",
        "AI-powered insights",
        "Multiple download formats",
        "Custom widgets (Enterprise)",
      ],
    },
    {
      badge: "Whiteboard",
      backgroundImage:
        "url(https://images.ctfassets.net/kftzwdyauwt9/2Wet7rkEt83TBP19pRaoSU/c227e5b5949a5931c343eeb70e4bd99f/Mac_App_Hero_V1.png?w=3840&q=90&fm=webp)",
      thumbnail: "/thumbs/c22.png",
      title: "Real-Time Data Management, Visualization, and Delivery",
      description:
        "Retrieve data from the 3D viewer, create dashboards, and automate delivery for different groups, specifying who receives them, how, and when.",
      features: [
        "Integrate Data from 3D Viewer",
        "Interactive AI Setup & Delivery",
        "Real-Time Visual Updates",
        "Customizable Dashboard Delivery",
      ],
    },
  ];

  return (
    <WideScreen id="Product">
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <WideHeader>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxWidth: { xs: "auto", sm: "50%" },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#E6E6E6",
                  padding: "5px 10px",
                  fontSize: "var(--font-size-p)",
                  borderRadius: "10px",
                  border: "1px solid #D9D9D9",
                  maxWidth: "max-content",
                  alignItems: "center",
                  display: "flex",
                  gap: "10px",
                }}
              >
                {slide.badge}
              </Box>
              {/* <Box
                sx={{
                  fontSize: "var(--font-size-d)",
                }}
              >
                {slide.badge}
              </Box> */}
              <Box
                sx={{
                  fontSize: "var(--font-size-3)",
                  lineHeight: "var(--line-height-1)",
                  fontFamily: "var(--primary-font-family)",
                  fontWeight: "bold",
                }}
              >
                {slide.title}
              </Box>
              <Box
                sx={{
                  fontSize: "var(--font-size-p)",
                }}
              >
                {slide.description}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "300px",
              }}
            >
              {slide.features.map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <Check
                    color={index <= 3 ? "black" : "#1200ff"}
                    sx={
                      index <= 3
                        ? {
                            fontSize: "var(--font-size-d)",
                          }
                        : {
                            fontSize: "var(--font-size-d)",
                            color: "#1200ff !important",
                          }
                    }
                  />

                  <Box
                    sx={
                      index <= 3
                        ? { fontSize: "var(--font-size-d)" }
                        : {
                            fontSize: "var(--font-size-d)",
                            color: "#1200ff !important",
                          }
                    }
                  >
                    {feature}
                  </Box>
                </Box>
              ))}
            </Box>
          </WideHeader>

          <Box
            sx={{
              width: "100%",
              position: "relative",
              marginTop: "40px",
            }}
          >
            <Box
              sx={{
                padding: { xs: "5px", sm: "10px" },
                width: "100%",
                backgroundColor: "rgb(236, 236, 236)",
                borderRadius: { xs: "15px", sm: "20px" },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  paddingBottom: "54.5%",
                  position: "relative",
                  borderRadius: "10px",
                  backgroundImage: `url(${slide.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.15)",
                  border: "1px solid white",
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
      ))}

      <Divider />
    </WideScreen>
  );
};

const Check = styled(CheckIcon)<{
  color: string;
  [key: string]: any;
}>`
  ${({ color }) =>
    color &&
    css`
      &,
      & * {
        color: ${color} !important;
      }
    `};
`;

export default Screens;
