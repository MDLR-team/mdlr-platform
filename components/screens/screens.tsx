import { useState } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";

const Screens = () => {
  // State to manage the selected slide
  const [selectedSlide, setSelectedSlide] = useState(0);

  // Define the slides data
  const slides = [
    {
      title: "3D Viewer",
      backgroundImage:
        "url(https://images.ctfassets.net/kftzwdyauwt9/2Wet7rkEt83TBP19pRaoSU/c227e5b5949a5931c343eeb70e4bd99f/Mac_App_Hero_V1.png?w=3840&q=90&fm=webp)",
      thumbnail: "/thumbs/c1.png",
    },
    {
      title: "Whiteboard",
      backgroundImage:
        "url(https://images.ctfassets.net/kftzwdyauwt9/2Wet7rkEt83TBP19pRaoSU/c227e5b5949a5931c343eeb70e4bd99f/Mac_App_Hero_V1.png?w=3840&q=90&fm=webp)",
      thumbnail: "/thumbs/c2.png",
    },
    {
      title: "Dashboard",
      backgroundImage:
        "url(https://images.ctfassets.net/kftzwdyauwt9/2Wet7rkEt83TBP19pRaoSU/c227e5b5949a5931c343eeb70e4bd99f/Mac_App_Hero_V1.png?w=3840&q=90&fm=webp)",
      thumbnail: "/thumbs/c3.png",
    },
  ];

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
          paddingBottom: "51%",
          position: "relative",
          borderRadius: "10px",
          backgroundImage: slides[selectedSlide].backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "absolute",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Box
              sx={{
                padding: "15px",
                width: "80%",
                backgroundColor: "white",
                borderRadius: "40px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {slides.map((slide, index) => (
                <Button
                  key={index}
                  color="secondary"
                  variant="contained"
                  onClick={() => setSelectedSlide(index)}
                  sx={{
                    backgroundColor:
                      selectedSlide === index
                        ? "black !important"
                        : "white !important",
                    color:
                      selectedSlide === index
                        ? "white !important"
                        : "black !important",
                    //border: "1px solid black",
                    height: "45px !important",
                  }}
                >
                  {slide.title}
                </Button>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                width: "70%",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  paddingBottom: "53.5%",
                  position: "relative",
                  borderRadius: "10px",
                  backgroundImage: `url(${slides[selectedSlide].thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Screens;