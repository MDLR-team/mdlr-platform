import { Box, Button, Divider } from "@mui/material";
import WideScreen from "../../layout/wide-screen";
import WideHeader from "../../layout/wide-header";
import { AddBox } from "@mui/icons-material";
import Link from "next/link";

const EnterpriseSmallFeatures = () => {
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
              Designed for Businesses, Trusted by AEC Professionals
            </Box>
          </Box>

          <Link href="/requestdemo">
            <Button
            size="large"
              sx={{
                padding: "25px 30px",
                borderRadius: "25px",
                display: "flex",
                gap: "10px",
              }}
              variant="contained"
              color="primary"
            >
              Talk to Sales
            </Button>
          </Link>
        </WideHeader>
      </Box>

      <WideHeader>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr 1fr",
            },
            gap: { xs: "20px", sm: "60px" },
          }}
        >
          {[
            {
              title: "Start Small & Scale",
              description:
                "Easily integrate MDLR into your workflow and grow as your needs evolve",
            },
            {
              title: "Custom AI Models",
              description:
                "Build AI models tailored to your project data and requirements.",
            },
            {
              title: "White Label Solutions",
              description:
                "Customize the platform with your own branding and interface.",
            },
            {
              title: "Secure Environment",
              description:
                "Your data stays private, with top-tier security measures.",
            },
            {
              title: "Cloud & On-Premise Options",
              description:
                "Deploy MDLR wherever it fits your needs, with flexible hosting.",
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
                <Box
                  sx={{
                    width: "30px",
                    height: "30px",
                    backgroundImage: `url(/enterprise/${index + 1}.svg)`,
                    backgroundSize: "cover",
                  }}
                ></Box>

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

export default EnterpriseSmallFeatures;
