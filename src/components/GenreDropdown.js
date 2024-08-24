/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { animeSearch, getCategories } from "../apis/animeListApi";
import startCase from "lodash/startCase";

export default function GenreDropdown({
  setAnimeData,
  setTotalAnimes,
  page,
  rowsPerPage,
  searchCriteria,
}) {
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    searchCriteria.current = {
      ...searchCriteria.current,
      genre: event.target.value,
    };
    animeSearch(page, rowsPerPage, searchCriteria.current).then(({ data }) => {
      setAnimeData(data.content);
      setTotalAnimes(data.page.totalElements);
    });
  };

  React.useEffect(() => {
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
        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
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
