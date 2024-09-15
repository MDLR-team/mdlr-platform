import React from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Bar from "@/components/about/bar/bar";

const locations = ["Europe", "United Kingdom", "North America", "Other"];
const rolePositions = [
  "Architect",
  "Developer",
  "Project Manager",
  "Engineer",
  "Other",
];
const numberOfProjects = ["1-5", "5-10", "10-20", "20+"];

const DemoForm: React.FC = () => {
  return (
    <>
      <Bar />

      <Box
        sx={{
          maxWidth: "1100px",
          width: "100%",
          margin: "30px auto",
          padding: "20px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          border: "1px solid var(--border-color)",
        }}
      >
        {/* <Link href="/">
          <Box
            sx={{
              fontFamily: "var(--primary-font-family)",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            MDLR
          </Box>
        </Link> */}

        {/* Form Block */}
        <Box
          sx={{
            display: "flex",
            gap: "80px",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontFamily: "var(--primary-font-family) !important",
                paddingBottom: "20px",
                fontSize: "var(--font-size-3)",
                fontWeight: "bold",
              }}
            >
              Leave Feedback
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                columnGap: "12px",
                rowGap: "5px",
              }}
            >
              {[
                [
                  "Use this form to share product opinions, ask questions, or propose collaboration ideas beyond the website content",
                ],
              ].map((benefit, index) => (
                <React.Fragment key={index}>
                  <Typography variant="body1" gutterBottom>
                    {benefit[0]}
                  </Typography>
                </React.Fragment>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: "20px",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                }}
                marginBottom="16px"
              >
                <Typography variant="subtitle2">Name</Typography>
                <TextField fullWidth required margin="normal" />
              </Box>
            </Box>
            <Box marginBottom="16px">
              <Typography variant="subtitle2">Email</Typography>
              <TextField type="email" fullWidth required margin="normal" />
            </Box>

            {/* Add TextArea for Message */}
            <Box marginBottom="16px">
              <Typography variant="subtitle2">Message</Typography>
              <TextField
                multiline
                rows={6} // Adjust the number of rows for textarea
                fullWidth
                required
                margin="normal"
                placeholder="Enter your message here..."
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "20px", height: "50px !important" }}
            >
              Send message
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DemoForm;
