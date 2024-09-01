import { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";

const PromptSearchBar: React.FC<{
  extended?: boolean;
  isWhiteboard?: boolean;
}> = ({ extended, isWhiteboard }) => {
  const [loading, setLoading] = useState(false);

  const placeholder = isWhiteboard
    ? "Describe your chart, including type, sorting, and key metrics. E.g., 'Bar chart of costs by phase, sorted by highest cost' or 'Line chart of task completion over time, sorted by date.'"
    : "Ask Copilot for insights or actions, e.g., 'Show project risks' or 'Download dashboard as PDF'";

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
          {isWhiteboard && (
            <Box
              sx={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
              }}
            >
              {[
                "Bar Chart",
                "Pie Chart",
                "Line Chart",
                "Scatter Plot",
                "Sankey Diagram",
                "Gantt Chart",
                "Heat Map",
              ].map((chartType, index) => (
                <Button
                  key={index}
                  size="small"
                  variant="contained"
                  color="secondary"
                  sx={{
                    background: "white",
                    color: "black",
                    border: "1px solid #E0E0E0",
                    backgroundColor: "#F3F4F6 !important",
                    borderRadius: "9px",
                    textTransform: "none",
                    fontSize: "10px",
                    height: "10px",
                  }}
                >
                  {chartType}
                </Button>
              ))}
            </Box>
          )}

          <TextField
            multiline
            fullWidth
            minRows={extended ? 8 : 2}
            maxRows={10}
            placeholder={placeholder}
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
