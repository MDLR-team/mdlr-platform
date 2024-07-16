import { useMarkup3D } from "@/components/services/project-services/markup-3d-service/markup-3d-provider";
import PlusIcon from "@/components/ui/icons/plus-icon";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { useComment } from "@/components/services/project-services/comment-service/comment-provider";

const SearchBar = () => {
  const { search, setSearch } = useComment();
  ///const { markup3DService, search, setSearch } = useMarkup3D();

  const clearQuery = () => {
    setSearch("");
  };

  return (
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
        rows={1}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        required
        size="small"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                style={{
                  fontSize: "16px",
                  color: "#8C8C8C !important",
                  opacity: 0.5,
                }}
              />
            </InputAdornment>
          ),
          endAdornment: search && (
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

      <IconButton
        data-type="exception"
        data-add="comment"
        //onClick={() => markup3DService.toggleAddComment()}
      >
        <PlusIcon />
      </IconButton>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  & .MuiInputBase-root {
    border-radius: 9px;

    height: 27px;
  }
`;

export default SearchBar;
