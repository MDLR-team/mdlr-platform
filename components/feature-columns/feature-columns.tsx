import { Box, Button, Divider } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import Link from "next/link";
import WideScreen from "../about/layout/wide-screen";
import WideHeader from "../about/layout/wide-header";
import { Badge } from "../about/features-cards/features-cards";

const FeatureColumns = () => {
  return (
    <WideScreen dividerDisabled>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            fontSize: "var(--font-size-3)",
            fontFamily: "var(--primary-font-family)",
            margin: "0 auto",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Power-Packed Features
        </Box>
      </Box>

      <WideHeader>
        <Box
          sx={{
            width: "100%",
            maxWidth: "1024px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: { xs: "20px", sm: "60px" },
          }}
        >
          {[
            {
              section: "3D Viewer",
              title: "Custom Feedback Tools",
              description:
                "Leave comments, pinpoints, media, or files directly on 3D models.",
            },
            {
              section: "Across All Entities",
              title: "Real-Time Data Sync",
              description:
                "Automatically update dashboards and whiteboards with 3D viewer data.",
            },
            {
              section: "Dashboard & Whiteboard",
              title: "AI-Generated Insights",
              description:
                "AI provides instant suggestions and risk assessments.",
            },
            {
              section: "Dashboard & Whiteboard",
              title: "Automated Reporting and Scheduling",
              description:
                "Schedule dashboard delivery via email or chatbot at set intervals.",
            },
            {
              section: "3D Viewer",
              title: "Customizable Widgets",
              description:
                "Add custom widgets, charts, or visualizations for tailored project needs.",
            },
            {
              section: "Across All Entities",
              title: "Enterprise",
              description:
                "HIPAA compliance, single sign-on (SSO), advanced security, priority support and more.",
            },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundImage: `url(/enterprise/${index + 1}.svg)`,
                    backgroundSize: "cover",
                  }}
                ></Box> */}
                <Box>
                  <Box
                    sx={{
                      gap: "5px",
                      display: "flex",
                      marginBottom: "10px",
                    }}
                  >
                    {/* <Box
                      sx={{
                        backgroundColor: "#E6E6E6",
                        fontSize: "var(--font-size-p)",
                        borderRadius: "10px",
                        border: "1px solid #D9D9D9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0px 8px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "20px",
                          height: "20px",
                          backgroundImage: `url(/schema/1.svg)`,
                          backgroundSize: "cover",
                        }}
                      />
                    </Box> */}
                    <Box
                      sx={{
                        backgroundColor: "#E6E6E6",
                        padding: "5px 10px",
                        fontSize: "var(--font-size-p)",
                        borderRadius: "10px",
                        border: "1px solid #D9D9D9",
                      }}
                    >
                      {item.section}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      paddingBottom: "56%",
                      backgroundColor: "#F4F4F4",
                      border: "1px solid #D9D9D9",
                      borderRadius: "10px",
                      position: "relative",
                    }}
                  ></Box>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    height: "max-content",
                    fontSize: "var(--font-size-l)",
                    fontFamily: "var(--primary-font-family)",
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    height: "max-content",
                    fontSize: "var(--font-size-p)",
                  }}
                >
                  {item.description}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </WideHeader>
    </WideScreen>
  );
};

export default FeatureColumns;
