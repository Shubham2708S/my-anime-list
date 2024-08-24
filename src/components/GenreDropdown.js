/* eslint-disable react/prop-types */
import React,{useState,useEffect} from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getCategories } from "../apis/animeListApi";
import startCase from "lodash/startCase";

const GenreDropdown = ({
  searchCriteria,
  searchAnime
}) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    searchCriteria.current = {
      ...searchCriteria.current,
      genre: event.target.value,
    };
    searchAnime(searchCriteria.current)
  };

  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(data.sort().map((d) => startCase(d)));
    });
  }, []);

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
        <InputLabel id="genre-select-label">Genre</InputLabel>
        <Select
          labelId="genre-select-label"
          id="genre-select"
          value={category}
          label="Genre"
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

export default GenreDropdown
