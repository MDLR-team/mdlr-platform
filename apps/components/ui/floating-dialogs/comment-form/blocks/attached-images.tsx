import { Box } from "@mui/material";

const AttachedImages = (images: string[]) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
        marginTop: "4px",
      }}
      data-type="attached-images"
    >
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            width: "50px",
            height: "50px",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px",
          }}
        ></Box>
      ))}
    </Box>
  );
};

export default AttachedImages;
