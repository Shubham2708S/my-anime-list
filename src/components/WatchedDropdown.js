/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function WatchedDropdown({ searchCriteria, searchAnime }) {
  const categories = [
    { label: "Watched", value: "WATCHED" },
    { label: "Not Watched", value: "NOT_WATCHED" },
    { label: "Watching", value: "WATCHING" },
    { label: "Won't Watch", value: "WONT_WATCH" },
  ];
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    searchCriteria.current = {
      ...searchCriteria.current,
      watchStatus: event.target.value,
    };
    searchAnime(searchCriteria.current);
  };

  return (
    <Box
      sx={{
        minWidth: 120,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        my: 1,
      }}
    >
      <FormControl fullWidth variant="standard">
        <InputLabel id="watched-select-label">Watched</InputLabel>
        <Select
          labelId="watched-select-label"
          id="watched-select"
          value={category}
          label="Watched"
          onChange={handleChange}
        >
          {categories.map((category, index) => (
            <MenuItem key={index} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
