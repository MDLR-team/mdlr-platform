import { Box } from "@mui/material";

const WideHeader: React.FC<{
  children: any;
}> = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        justifyContent: "space-between",
        gap: "40px",
        alignItems: { xs: "flex-start", lg: "flex-end" },
      }}
    >
      {children}
    </Box>
  );
};

export default WideHeader;
