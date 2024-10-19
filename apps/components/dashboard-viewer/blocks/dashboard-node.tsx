import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import styled from "styled-components";
import EditGroup from "./edit-group/edit-group";
import TableSection from "./table/table";

const PieChart = dynamic(() => import("./pie-chart/pie-chart"), {
  ssr: false,
});
const SankeyChart = dynamic(() => import("./sankey-chart/sankey-chart"), {
  ssr: false,
});

const DashboardNode = () => {
  return (
    <Wrapper className="dashboard-container">
      <Section className="chart-area-by-material" title="Project Areas">
        <PieChart
          items={[
            { name: "Design", value: 100 },
            { name: "Management", value: 80 },
            { name: "Cost", value: 300 },
            { name: "Quality", value: 70 },
            { name: "Risk", value: 500 },
          ]}
          options={{ maxHeight: "400px", type: "pie" }}
        />
      </Section>
      <Section className="chart-number-of-panels" title="Issue Focus">
        <PieChart
          items={[
            { name: "Team", value: 100 },
            { name: "Site", value: 70 },
            { name: "Client", value: 300 },
            { name: "Quality Control", value: 100 },
            { name: "Budget", value: 500 },
          ]}
          options={{ maxHeight: "400px", type: "bar" }}
        />
      </Section>
      <Section className="model-viewer" title="3D Model Viewer">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ccc",
            backgroundImage:
              "url(https://ixuszjrnviwgquuqfbmk.supabase.co/storage/v1/object/public/thumbs/4e43c4d0-942c-4772-aac2-d9e56a89d5de-1724503777883.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Section>
      <Section
        className="curtain-panel-schedule"
        title="Curtain Panel Schedule"
      >
        <SankeyChart />
      </Section>
      <Section className="panel-summary" title="Comments">
        <TableSection />
      </Section>
    </Wrapper>
  );
};

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  className: string;
}> = ({ children, title, className }) => {
  return (
    <EditGroup className={className}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
        className="section-header"
      >
        {title}
      </Box>

      <Box className="section-content">{children}</Box>
    </EditGroup>
  );
};

const Wrapper = styled(Box)`
  & {
    width: 1440px;
    height: 900px;
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: 350px auto 350px;
    gap: 10px; /* Adjust the gap between the grid items */
    padding: 10px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  & > *.edit-group > *.edit-group-child {
    background-color: #fff;
    border: 1px solid #ccc;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border-radius: 6px;

    & > *.section-header {
      border-top: 3px solid #3f51b5;

      &,
      & * {
        font-weight: bold;
        font-size: 12px;
      }
    }
    & > .section-content {
      height: 100%;
      padding: 10px;
    }

    & > div {
      padding: 10px;
    }
  }

  .chart-area-by-material {
    grid-column: 1 / 2; /* Spans from column 1 to 2 */
    grid-row: 1 / 2; /* Spans from row 1 to 2 */
    max-height: 460px;
  }

  .chart-number-of-panels {
    grid-column: 2 / 3; /* Spans from column 2 to 3 */
    grid-row: 1 / 2; /* Spans from row 1 to 2 */
    max-height: 460px;
  }

  .model-viewer {
    grid-column: 3 / 4; /* Spans from column 3 to 4 */
    grid-row: 1 / 3; /* Spans from row 1 to 3 */
  }

  .curtain-panel-schedule {
    grid-column: 1 / 3; /* Spans from column 1 to 3 */
    grid-row: 2 / 4; /* Spans from row 2 to 3 */
  }

  .panel-summary {
    grid-column: 3 / 4; /* Spans all columns */
    grid-row: 3 / 4; /* Spans from row 3 to 4 */
    max-height: 350px;
  }
`;

export default DashboardNode;
