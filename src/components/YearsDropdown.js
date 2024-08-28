/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function YearsDropdown({ searchCriteria, searchAnime }) {
  const currentYear = new Date().getFullYear()
  const yearsMap = {
    0: [1900, 2000],
    1: [2000, 2010],
    2: [2010, 2015],
    3: [2015, 2020],
    4: [2020, currentYear - 1],
    5: [currentYear, currentYear + 1],
    6: [currentYear + 1, 2050]
  };
  const categories = [
    { label: "<2000", value: 0 },
    { label: "2000 - 2010", value: 1 },
    { label: "2010 - 2015", value: 2 },
    { label: "2015 - 2020", value: 3 },
    { label: `2021 - ${currentYear - 1}`, value: 4 },
    { label: `${currentYear}`, value: 5 },
    { label: `> ${currentYear}`, value: 6}
  ];

  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    searchCriteria.current = {
      ...searchCriteria.current,
      releaseYearStart: yearsMap[event.target.value][0],
      releaseYearEnd: yearsMap[event.target.value][1]
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
        <InputLabel id="release-year-select-label">Year</InputLabel>
        <Select
          labelId="release-year-select-label"
          id="release-year-select"
          value={category}
          label="Release Year"
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
