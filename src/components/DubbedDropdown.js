/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DubbedDropdown = ({ searchCriteria, searchAnime }) => {
  const categories = ["Dubbed", "Subbed"];

  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    switch (event.target.value) {
      case "Dubbed":
        delete searchCriteria.current.subbed;
        searchCriteria.current = { ...searchCriteria.current, dubbed: true };
        break;
      case "Subbed":
        delete searchCriteria.current.dubbed;
        searchCriteria.current = { ...searchCriteria.current, subbed: true };
        break;
      default:
        delete searchCriteria.current.subbed;
        delete searchCriteria.current.dubbed;
    }
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
        <InputLabel id="dubbed-select-label">Dubbed</InputLabel>
        <Select
          labelId="dubbed-select-label"
          id="dubbed-select"
          value={category}
          label="Dubbed"
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
};

export default DubbedDropdown;
