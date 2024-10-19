import { Box, Button, Paper } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNodes } from "@/components/canvas/node-service/node-provider";

const PagesPanel = () => {
  const { presentationNodes } = useNodes();

  return (
    <Paper
      sx={{
        display: "flex",
        gap: "6px",
        alignItems: "center",
        minWidth: "max-content",
      }}
    >
      <Button
        variant="contained"
        sx={{
          backgroundColor: false ? "#FEFAE5 !important" : "white !important",
          border: false ? "1px solid #E0E0E0 !important" : "none",
          color: "black",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 8px",
        }}
      >
        <Box>Whiteboard</Box>

        <ArrowDropDownIcon sx={{ width: "18px", height: "18px" }} />
      </Button>

      {presentationNodes.map((page, i) => (
        <Button
          key={page.id}
          variant="contained"
          sx={{
            backgroundColor: false ? "#FEFAE5 !important" : "white !important",
            border: false ? "1px solid #E0E0E0 !important" : "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 8px",
          }}
        >
          <Box>{`Presentation ${i}`}</Box>

          <ArrowDropDownIcon sx={{ width: "18px", height: "18px" }} />
        </Button>
      ))}
    </Paper>
  );
};

export default PagesPanel;
