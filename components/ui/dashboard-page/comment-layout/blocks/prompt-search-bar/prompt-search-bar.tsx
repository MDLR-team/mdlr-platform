import { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";

const PromptSearchBar = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "16px",
        marginBottom: "16px",
      }}
    >
      <Wrapper
        sx={{
          display: "flex",
          gap: "6px",
          alignItems: "center",
          width: "100%",
          background:
            "linear-gradient(97deg, #4168FF 0%, #AB62F8 58%, #F4A700 100%)",
          padding: "2px",
          borderRadius: "11px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            borderRadius: "9px",
            background: "white",
            padding: "8px",
            alignItems: "flex-end",
            gap: "12px",
          }}
        >
          <TextField
            multiline
            fullWidth
            minRows={2}
            maxRows={10}
            placeholder="Ask Copilot for insights or actions, e.g., 'Show project risks' or 'Download dashboard as PDF'"
            value={""}
            onChange={(event) => {}}
            variant="outlined"
            required
            size="small"
            margin="normal"
            sx={{
              margin: "0px",
              border: "0px !important",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
            }}
          />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: "6px",
              alignItems: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "6px",
                alignItems: "center",
              }}
            ></Box>

            <Button
              size="small"
              sx={{ maxWidth: "100px" }}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={16} color="inherit" /> : "Go"}
            </Button>
          </Box>
        </Box>
      </Wrapper>
    </Box>
  );
};

const Wrapper = styled(Box)`
  & .MuiInputBase-root {
    border-radius: 9px;

    & textarea::placeholder {
      color: black;
      opacity: 0.7 !important;
      border: 0px !important;
    }
  }

  display: flex;
  gap: 6px;
  flex-direction: column;
  align-items: flex-end;
`;

export default PromptSearchBar;
