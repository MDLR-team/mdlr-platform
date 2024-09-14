import { useProject } from "@/components/services/project-services/project-service/project-provider";
import { Box, Button, Paper } from "@mui/material";
import html2canvas from "html2canvas";

const Thumbnail = () => {
  const { thumbnail, projectService } = useProject();

  return (
    <Paper
      sx={{ background: "#F1F0EE", position: "relative", overflow: "hidden" }}
    >
      {thumbnail && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
      )}

      <Box
        sx={{
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {!thumbnail && <p>We don&#x27;t have any thumbs now.</p>}
        <Button variant="contained" onClick={projectService.handleAddThumbnail}>
          Add Thumbnail
        </Button>
      </Box>
    </Paper>
  );
};

export default Thumbnail;
