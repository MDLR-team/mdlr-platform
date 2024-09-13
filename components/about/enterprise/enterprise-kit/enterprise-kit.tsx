import { Box, Button, Divider } from "@mui/material";
import WideScreen from "../../layout/wide-screen";
import WideHeader from "../../layout/wide-header";

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

      <WideHeader>
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
      </WideHeader>
    </WideScreen>
  );
};

export default EnterpriseKit;
