import { Box, Divider } from "@mui/material";

const WideScreen: React.FC<{
  dividerDisabled?: boolean;
  children?: React.ReactNode;
}> = ({ dividerDisabled = false, children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1300px",
        margin: "0 auto",
        position: "relative",
        marginBottom: "80px",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "max-content",
          position: "relative",
          borderRadius: "10px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            gap: "80px",
          }}
        >
          {!dividerDisabled && <Divider />}

          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default WideScreen;
