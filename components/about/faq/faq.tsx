import styled from "styled-components";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import WideScreen from "../layout/wide-screen";

const FAQ = () => {
  return (
    <WideScreen>
      <FAQSection>
        <Box
          sx={{
            fontSize: "var(--font-size-3)",
            fontFamily: "var(--primary-font-family)",
            margin: "0 auto",
            textAlign: "center",
            marginBottom: "80px",
            marginTop: "60px",
            fontWeight: "bold",
          }}
        >
          Questions?
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            border: "1px solid var(--border-color)",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Accordion
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>What is MDLR?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                MDLR is an AI-powered project management platform designed for
                AEC professionals. It provides customizable 3D viewers,
                real-time dashboards, and an interactive whiteboard to
                streamline project workflows, data insights, and
                collaboration—all without coding.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Is there a free trial?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Currently, we don&apos;t offer a standard free trial. However,
                you can gain access by submitting a form and booking a demo to
                explore the platform&apos;s features.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>What does the enterprise version include?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <b>3D Viewer</b>
                <br />
                Based on your requirements, we create customized extensions for
                the 3D viewer, adding tailored widgets and tools, along with
                core functionality adjustments to fit specific workflows.
                Whiteboard &
                <br />
                <br />
                <b>Dashboard</b>
                <br />
                The whiteboard and dashboard maintain their primary features,
                but we can add custom charts and advanced visualizations to
                provide more detailed project insights, based on your needs.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>What file types does MDLR support?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              MDLR&apos;s primary input data is handled through the 3D viewer,
              which accepts a wide range of formats commonly used in AEC
              projects. These include: <br />
              <br />
              {[
                ".rvt (Revit)",
                ".dwg (AutoCAD)",
                ".nwd, .nwc (Navisworks)",
                ".ifc (Industry Foundation Classes)",
                ".obj (Wavefront)",
                ".fbx (Filmbox)",
                ".step, .stp (STEP)",
                ".iges, .igs (IGES)",
                ".stl (Stereolithography)",
              ].map((format) => (
                <Box key={format}>{format}</Box>
              ))}
              <br />
              For a complete list of all supported formats, <u>click here.</u>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>
                Can I trust MDLR to give accurate information from insights?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Absolutely. MDLR works with your own data sources and generates
                insights based on the data you provide. If the system can&apos;t
                produce an answer, it will notify you, ensuring transparency in
                all outputs.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>Is my data secure and confidential?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, all your data is stored in secure, GDPR-compliant cloud
                storage. When you delete any information, it is permanently
                removed from our system.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Add more FAQItems as needed */}
      </FAQSection>
    </WideScreen>
  );
};

const FAQSection = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  & .MuiAccordionDetails-root {
    max-width: 500px;
    &,
    & * {
      font-size: var(--font-size-p);
      line-height: 1.4;
      color: var(--text-secondary);
    }
  }

  & .MuiAccordionSummary-content {
    &,
    & * {
      font-weight: 700;
      font-size: var(--font-size-m);
    }
  }

  & .MuiPaper-root:last-child {
    border-bottom: 0px;
  }

  & .MuiAccordion-root.Mui-expanded {
    margin: 0px !important;
  }

  & .MuiPaper-root {
    border: 0px;
    border-bottom: 1px solid var(--border-color);
    border-radius: 0px !important;

    &::before {
      display: none !important;
    }
  }
`;

export default FAQ;
