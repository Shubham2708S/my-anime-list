import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { Paper } from "@mui/material";
import { animeSearch } from "../apis/animeListApi";

export default function WatchedDropdown({ setAnimeData,setTotalAnimes,page, rowsPerPage, searchCriteria }) {
  const categories = ['Watched','Not Watched'];
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    switch (event.target.value) {
      case "Watched":
        delete searchCriteria.current.notwatched
        searchCriteria.current = {...searchCriteria.current,watched:true};
        break;
      case "Not Watched":
        delete searchCriteria.current.watched
        searchCriteria.current = {...searchCriteria.current,notwatched:true};
    }
    animeSearch(page,rowsPerPage,searchCriteria.current)
      .then(({ data }) => {
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
        m: 1,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Watched</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Age"
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
