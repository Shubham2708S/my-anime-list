/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { animeSearch } from "../apis/animeListApi";

export default function WatchedDropdown({
  setAnimeData,
  setTotalAnimes,
  page,
  rowsPerPage,
  searchCriteria,
}) {
  const categories = [
    { label: "Watched", value: "WATCHED" },
    { label: "Not Watched", value: "NOT_WATCHED" },
    { label: "Watchingd", value: "WATCHING" },
    { label: "Won't Watch", value: "WONT_WATCH" }
  ];
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  
        searchCriteria.current = { ...searchCriteria.current, watchStatus: event.target.value };
        
    
    animeSearch(page, rowsPerPage, searchCriteria.current).then(({ data }) => {
      setAnimeData(data.content);
      setTotalAnimes(data.page.totalElements);
    });
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
        <InputLabel id="demo-simple-select-label">Watched</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Age"
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
