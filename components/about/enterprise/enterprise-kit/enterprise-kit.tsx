import { Box, Button, Divider } from "@mui/material";
import WideScreen from "../../layout/wide-screen";
import WideHeader from "../../layout/wide-header";
import { AddBox } from "@mui/icons-material";

const EnterpriseKit = () => {
  return (
    <WideScreen>
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
                fontSize: "var(--font-size-3)",
                lineHeight: "var(--line-height-1)",
                fontFamily: "var(--primary-font-family)",
                fontWeight: "bold",
              }}
            >
              Customizable AEC Toolkits
            </Box>

            <Box
              sx={{
                fontSize: "var(--font-size-p)",
              }}
            >
              MDLR offers adaptable tools for architecture, engineering, and
              construction teams. Choose one, several, or all to fit your
              project needs.
            </Box>
          </Box>
        </WideHeader>
      </Box>

      {/* <WideHeader>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {[
            "3D Viewer",
            "AI-Powered Analysis",
            "Interactive Dashboards",
            "Automated Reports",
          ].map((item, index) => (
            <Button key={index} size="large" variant="outlined">
              {item}
            </Button>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            backgroundColor: "grey",
            paddingBottom: "20%",
          }}
        ></Box>
      </WideHeader> */}

      <WideHeader>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              sm: "1fr 1fr 1fr",
            },
            gap: { xs: "20px", sm: "40px" },
          }}
        >
          {[
            { title: "3D Viewer" },
            { title: "Whiteboard" },
            { title: "Dashboard" },
            { title: "Graph View" },
            { title: "Insight Chatbots" },
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
                  paddingBottom: { xs: "110%", sm: "60%" },
                  borderRadius: "20px",
                  border: "1px solid #000",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px 20px 0 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        padding: { xs: "20px", sm: "40px" },
                        borderRadius: "50%",
                        border: "1px dashed rgba(0,0,0,0.4)",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          filter: "blur(40px)",
                          width: { xs: "30px", sm: "50px" },
                          height: { xs: "30px", sm: "50px" },
                          backgroundImage: `url(/entity-icons/${
                            index + 1
                          }.svg)`,
                          backgroundSize: "contain",
                        }}
                      ></Box>
                      <Box
                        sx={{
                          width: { xs: "30px", sm: "50px" },
                          height: { xs: "30px", sm: "50px" },
                          backgroundImage: `url(/entity-icons/${
                            index + 1
                          }.svg)`,
                          backgroundSize: "contain",
                        }}
                      ></Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "max-content",
                      padding: "20px",
                      fontSize: "var(--font-size-m)",
                    }}
                  >
                    {item.title}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </WideHeader>
    </WideScreen>
  );
};

export default EnterpriseKit;
