import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import { useComment } from "@/components/services/project-services/comment-service/comment-provider";
import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import AIGradient from "../ai-gradient";
import InsightsIcon from "@mui/icons-material/Insights";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import { useGlobalStates } from "@/components/services/project-services/global-states-service/global-states-provider";

const PromptSearchBar = () => {
  const { projectService } = useProject();
  const { mlSearch, setMlSearch } = useComment();
  const promptSearchService = projectService.promptSearchService;

  const [loading, setLoading] = useState(false);

  const { setIsAiTopicsOpen } = useGlobalStates();

  useEffect(() => {
    const fids = promptSearchService.filteredIds$.subscribe(setMlSearch);
    const lds = promptSearchService.loading$.subscribe(setLoading);

    return () => {
      fids.unsubscribe();
      lds.unsubscribe();
    };
  }, []);

  const [searchValue, setSearchValue] = useState("");

  const onComplete = async () => {
    promptSearchService.searchPrompt(searchValue);
  };

  const clearQuery = () => {
    promptSearchService.clearFilteredIds();
    setSearchValue("");
  };

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
            placeholder="Search any prompt. For example: 'Show me all comments by John and sort by date'"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
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
            InputProps={{
              endAdornment: mlSearch && (
                <Box
                  onClick={clearQuery}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CancelIcon
                    style={{
                      fontSize: "16px",
                      color: "#8C8C8C !important",
                    }}
                    color="inherit"
                  />
                </Box>
              ),
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
            >
              <Button
                size="small"
                variant="contained"
                color="secondary"
                sx={{
                  marginRight: "6px",
                }}
                onClick={() => setIsAiTopicsOpen(true)}
                startIcon={
                  <DataSaverOffIcon
                    sx={{
                      fontSize: "14px !important",
                    }}
                  />
                }
              >
                Topics
              </Button>

              {/* <ThumbUpOffAltIcon
                sx={{
                  color: "#8C8C8C",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              />
              <ThumbDownOffAltIcon
                sx={{
                  color: "#8C8C8C",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              /> */}
            </Box>

            <Button
              size="small"
              sx={{ maxWidth: "100px" }}
              variant="contained"
              color="primary"
              onClick={onComplete}
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
