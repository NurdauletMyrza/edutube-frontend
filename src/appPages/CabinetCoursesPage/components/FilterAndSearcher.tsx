import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

const FilterAndSearcher = () => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Box>
      {/* Search bar and filter button */}
      <Box
        display="flex"
        gap={2}
        alignItems="center"
        sx={{ backgroundColor: "#F4F4F8", p: 2, borderRadius: "12px" }}
      >
        <TextField
          placeholder="Search by course name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ backgroundColor: "white", borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          onClick={() => setShowFilters(!showFilters)}
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <TuneIcon />
        </IconButton>
      </Box>

      {/* Expandable filters section */}
      <Collapse in={showFilters} timeout="auto" unmountOnExit>
        <Box
          mt={2}
          p={2}
          sx={{
            backgroundColor: "#f4f4f8",
            borderRadius: "12px",
            boxShadow: 1,
          }}
        >
          {/* Здесь разместите фильтры */}
          <Button variant="outlined">filter option example</Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default FilterAndSearcher;
