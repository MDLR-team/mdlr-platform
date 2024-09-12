import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import PriceCard from "@/components/pricing/blocks/price-card";
import FAQItem from "@/components/pricing/blocks/faq-item";
import Wrapper from "@/components/layout/wrapper/wrapper";
import Bar from "@/components/about/bar/bar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Feedback from "@/components/about/feedback/feedback";
import Footer from "@/components/about/footer/footer";

const PricingContainer = styled(Container)`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const FAQSection = styled.div`
  margin-top: 50px;
`;

const PricingPage: React.FC = () => {
  const starterFeatures = [
    "Access to the 3D Viewer for up to 5 projects",
    "Basic Insight Whiteboard functionality",
    "AI Chats with limited queries per month",
    "Interactive Dashboards with predefined templates",
    "Email support",
    "Secure data storage up to 10GB",
  ];

  const professionalFeatures = [
    "Everything in Starter, plus:",
    "Access to the 3D Viewer for up to 20 projects",
    "Advanced Insight Whiteboard features with custom data visualization",
    "AI Chats with unlimited queries",
    "Interactive Dashboards with customization options",
    "Priority email support",
    "Secure data storage up to 100GB",
    "Integration with third-party tools (e.g., BIM software, Slack)",
  ];

  const enterpriseFeatures = [
    "Everything in Professional, plus:",
    "Unlimited access to the 3D Viewer and Insight Whiteboard",
    "AI Chats with dedicated AI training for company-specific needs",
    "Interactive Dashboards with multi-user collaboration and role-based access",
    "Dedicated account manager and 24/7 support",
    "Secure data storage with no limits",
    "Custom integrations and on-premises deployment",
    "Advanced security features and compliance options",
  ];

  return (
    <>
      <Bar />

      <Wrapper>
        <PricingContainer maxWidth="lg">
          <Box
            sx={{
              fontSize: "var(--font-size-2)",
              fontWeight: "bold",
              fontFamily: "var(--primary-font-family)",
              margin: "0 auto",
              textAlign: "center",
              marginBottom: "80px",
            }}
          >
            A plan for every stage
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <PriceCard
                title="Starter"
                description="Ideal for small teams."
                price="$49/month"
                features={starterFeatures}
                buttonText="Contact Us"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PriceCard
                title="Professional"
                description="Perfect for growing firms."
                price="$99/month"
                features={professionalFeatures}
                buttonText="Contact Us"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PriceCard
                title="Enterprise"
                description="Best for large companies."
                price="Custom pricing"
                features={enterpriseFeatures}
                buttonText="Contact Us"
              />
            </Grid>
          </Grid>

          <FAQSection>
            <Box
              sx={{
                fontSize: "var(--font-size-3)",
                fontFamily: "var(--primary-font-family)",
                margin: "0 auto",
                textAlign: "center",
                marginBottom: "80px",
                marginTop: "120px",
                fontWeight: "bold",
              }}
            >
              Frequently Asked Questions
            </Box>

            <Accordion
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>What is included in the Starter Plan?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The Starter Plan offers access to the core features of MDLR,
                  including the 3D Viewer, Insight Whiteboard, AI Chats, and
                  Interactive Dashboards, but with limits on the number of
                  projects and data storage.
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
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>
                  Can I upgrade or downgrade my plan at any time?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes, you can upgrade or downgrade your plan at any time to
                  better suit your needs. Changes will take effect in the next
                  billing cycle.
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
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>
                  What kind of support is offered with each plan?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  The Starter Plan includes basic email support, the
                  Professional Plan offers priority email support, and the
                  Enterprise Plan comes with 24/7 dedicated support, including a
                  dedicated account manager.
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
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>
                  How does the custom pricing for the Enterprise Plan work?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Custom pricing is tailored to the specific needs of your
                  organization, including the number of users, data storage
                  requirements, custom integrations, and any additional features
                  you require.
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
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Is my data secure with MDLR?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Absolutely. All plans include secure data storage, and the
                  Enterprise Plan offers advanced security features and
                  compliance options tailored to your company’s needs.
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
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>
                  Can MDLR integrate with other tools we use?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes, the Professional and Enterprise Plans offer integration
                  with third-party tools. The Enterprise Plan also allows for
                  custom integrations based on your specific requirements.
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
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>What payment methods do you accept?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We accept major credit cards for all plans. Enterprise
                  customers may also arrange invoicing and wire transfers.
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
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Is there a trial period available?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Yes, we offer a 14-day free trial for the Starter and
                  Professional Plans. This allows you to explore our features
                  and determine the best fit for your team.
                </Typography>
              </AccordionDetails>
            </Accordion>
            {/* Add more FAQItems as needed */}
          </FAQSection>
        </PricingContainer>

        <Feedback />

        <Footer />
      </Wrapper>
    </>
  );
};

export default PricingPage;
