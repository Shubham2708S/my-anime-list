/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function EpisodesDropDown({ searchCriteria, searchAnime }) {
  const episodesMap = {
    0: [0, 15],
    15: [15, 30],
    30: [30, 50],
    50: [50, 100],
    100: [100, 500],
    500: [500, 100000],
  };
  const categories = [
    { label: "0 - 15", value: 0 },
    { label: "15 - 30", value: 15 },
    { label: "30 - 50", value: 30 },
    { label: "50 - 100", value: 50 },
    { label: "100 - 500", value: 100 },
    { label: "> 500", value: 500 },
  ];
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    searchCriteria.current = {
      ...searchCriteria.current,
      episodeStart: episodesMap[event.target.value][0],
      episodeEnd: episodesMap[event.target.value][1],
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
        <InputLabel id="episodes-select-label">Episodes</InputLabel>
        <Select
          labelId="episodes-select-label"
          id="episodes-select"
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
