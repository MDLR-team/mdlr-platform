import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNodeViewer } from "../../node-viewer-type";

const InputData = () => {
  const { viewerService } = useNodeViewer();

  const [value, setValue] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <TextField
        sx={{
          width: "100%",
        }}
        fullWidth
        size="small"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ marginLeft: "10px" }}
        onClick={() => true}
      >
        Save
      </Button>
    </Box>
  );
};

export default InputData;
