import { Box } from "@mui/material";

const TopBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "45px",
        minHeight: "45px",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderBottom: "var(--mr-border)",
        paddingLeft: "20px",
        padding: "5px 5px 0px 5px",
        pointerEvents: "all",
        backdropFilter: "blur(5px)",
        display: "flex",
        zIndex: 1000,
      }}
    >
      {["Model 1", "Image 2", "Pdf document 3", "Model 3"].map((a, i) => {
        return (
          <Box
            sx={{
              height: "100%",
              padding: "0px 14px",
              display: "flex",
              alignItems: "center",
              borderRight: "var(--mr-border)",
              cursor: "pointer",
              backgroundColor:
                i === 2 ? "rgba(255, 255, 255, 1)" : "transparent",
            }}
          >
            {a}
          </Box>
        );
      })}
    </Box>
  );
};

export default TopBar;
