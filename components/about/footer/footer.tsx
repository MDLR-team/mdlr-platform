import React from "react";
import { Box, Typography, Link } from "@mui/material";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <Wrapper
      component="footer"
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {/* Left Section */}
      <Box sx={{ flex: "1 1 300px", marginBottom: "20px", maxWidth: "600px" }}>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          A project by the MDLR team
        </Typography>
        <Typography
          variant="h5"
          sx={{ marginTop: "10px", fontWeight: "bold", lineHeight: 1.2 }}
        >
          We are transforming the AEC industry by providing AI-driven tools for
          project management, empowering professionals to deliver better
          outcomes faster.
        </Typography>
      </Box>

      <Box sx={{ minWidth: "150px" }} className="footer-links">
        <Typography variant="h6" sx={{ marginBottom: "10px" }}>
          Legal
        </Typography>
        <Link href="#" color="inherit" underline="hover" display="block">
          Privacy Policy
        </Link>
        <Link href="#" color="inherit" underline="hover" display="block">
          Terms of Service
        </Link>
        <Link href="#" color="inherit" underline="hover" display="block">
          Compliance
        </Link>
        <Link href="#" color="inherit" underline="hover" display="block">
          Imprint
        </Link>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          flexBasis: "100%",
          borderTop: "1px solid #333",
          marginTop: "20px",
          paddingTop: "20px",
          textAlign: "center",
          opacity: 0.7,
        }}
      >
        <Typography variant="body2">
          info@mdlr.com — Copyright © 2024 MDLR Inc. All rights reserved
        </Typography>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  width: 100%;
  display: flex;
  gap: 40px;
  justify-content: space-between;
  flex-wrap: wrap;

  &,
  & * {
    color: #fff !important;
  }

  .footer-links {
    min-width: 150px;

    & a {
      margin-bottom: 10px;
      font-size: 16px;
    }
  }
`;

export default Footer;
