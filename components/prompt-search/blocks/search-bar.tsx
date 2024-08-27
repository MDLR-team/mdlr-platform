import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useProject } from "@/components/services/project-services/project-service/project-provider";
import { useComment } from "@/components/services/project-services/comment-service/comment-provider";
import styled from "styled-components";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";

const PromptSearchBar = () => {
  const { projectService } = useProject();
  const { mlSearch, setMlSearch } = useComment();
  const promptSearchService = projectService.promptSearchService;

  const [loading, setLoading] = useState(false);

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
        }}
      >
        <TextField
          sx={{ margin: "0px" }}
          multiline
          fullWidth
          rows={2}
          placeholder="Search any prompt. For example: 'Show me all comments by John and sort by date'"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          variant="outlined"
          required
          size="small"
          margin="normal"
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

        <Button
          size="small"
          variant="contained"
          color="primary"
          fullWidth
          onClick={onComplete}
          disabled={loading}
          startIcon={
            loading && (
              <CircularProgress size={16} color="inherit" /> // Add spinner here
            )
          }
        >
          {loading ? "Searching..." : "Search"}
        </Button>
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
    }
  }

  display: flex;
  gap: 6px;
  flex-direction: column;
  align-items: flex-end;
`;

export default PromptSearchBar;
