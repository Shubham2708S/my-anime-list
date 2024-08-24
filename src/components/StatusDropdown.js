/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function StatusDropdown({ searchCriteria, searchAnime }) {
  const categories = ["Ongoing", "Completed"];

  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    searchCriteria.current = {
      ...searchCriteria.current,
      status: event.target.value,
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
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={category}
          label="Status"
          onChange={handleChange}
        >
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
