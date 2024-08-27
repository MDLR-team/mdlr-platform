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
      <Link href="/">
        <Box
          sx={{
            fontFamily: "var(--primary-font-family)",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          MDLR
        </Box>
      </Link>

      {/* Form Block */}
      <Box
        sx={{
          display: "flex",
          gap: "80px",
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
            }}
          >
            Request a&nbsp;Demo&nbsp;page
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "40px 1fr",
              columnGap: "12px",
              rowGap: "5px",
            }}
          >
            {[
              ["25%", "Increase in Team Engagement"],
              ["15%", "Reduction in Project Costs"],
              ["20%", "Faster Project Completion"],
              ["100%", "Better Built Environment"],
            ].map((benefit, index) => (
              <React.Fragment key={index}>
                <Box
                  sx={{
                    backgroundColor: "rgb(167, 243, 208)",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid rgba(4, 120, 87, .5)",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    maxHeight: "25px",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "rgb(4, 120, 87)",
                        fontWeight: "bold",
                        textAlign: "center",
                        lineHeight: "1",
                      }}
                    >
                      {benefit[0]}
                    </span>
                  </Typography>
                </Box>

                <Typography variant="body1" gutterBottom>
                  {benefit[1]}
                </Typography>
              </React.Fragment>
            ))}
          </Box>

          {/* Testimonial Block */}
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              marginTop: "40px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontStyle: "italic", fontSize: "1rem" }}
              >
                &quot;MDLR has streamlined our project management, saving us
                countless hours on data analysis and visualization.&quot;
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                - Alex Johnson, Lead Architect
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontStyle: "italic", fontSize: "1rem" }}
              >
                &quot;The integration of 3D models and real-time data insights
                in one platform has completely transformed how we manage our
                projects.&quot;
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                - Emily Davis, Project Manager
              </Typography>
            </Box>
          </Box> */}
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
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
              marginBottom="16px"
            >
              <Typography variant="subtitle2">First name</Typography>
              <TextField fullWidth required margin="normal" />
            </Box>
            <Box
              sx={{
                width: "100%",
              }}
              marginBottom="16px"
            >
              <Typography variant="subtitle2">Last name</Typography>
              <TextField fullWidth required margin="normal" />
            </Box>
          </Box>
          <Box marginBottom="16px">
            <Typography variant="subtitle2">Email</Typography>
            <TextField type="email" fullWidth required margin="normal" />
          </Box>
          <Box marginBottom="16px">
            <Typography variant="subtitle2">Location</Typography>
            <TextField select fullWidth required margin="normal">
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{
              lineHeight: "1.2",
            }}
          >
            Which MDLR features are you most interested in? Please select or
            describe the ones that matter most to you.*
          </Typography>
          <FormControlLabel control={<Checkbox />} label="3D Viewer" />
          <FormControlLabel control={<Checkbox />} label="Insight Whiteboard" />
          <FormControlLabel
            control={<Checkbox />}
            label="Interactive Dashboards"
          />

          <Box marginBottom="16px" marginTop="16px">
            <Typography variant="subtitle2">Role/Position</Typography>
            <TextField select fullWidth required margin="normal">
              {rolePositions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* <Box marginBottom="16px">
            <Typography variant="subtitle2">
              Number of Projects Managed Annually
            </Typography>
            <TextField select fullWidth required margin="normal">
              {numberOfProjects.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box> */}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px", height: "50px !important" }}
          >
            Send to get Mdlr
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DemoForm;
