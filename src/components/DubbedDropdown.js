/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { animeSearch } from "../apis/animeListApi";

export default function DubbedDropdown({ setAnimeData,setTotalAnimes,page, rowsPerPage, searchCriteria }) {
  const categories = ['Dubbed','Subbed'];
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    switch (event.target.value) {
      case "Dubbed":
        delete searchCriteria.current.subbed
        searchCriteria.current = {...searchCriteria.current,dubbed:true};
        break;
      case "Subbed":
        delete searchCriteria.current.dubbed
        searchCriteria.current = {...searchCriteria.current,subbed:true};
        break;
      default:
        delete searchCriteria.current.subbed
        delete searchCriteria.current.dubbed
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
        my: 1,
      }}
    >
      <FormControl fullWidth variant="standard" >
        <InputLabel id="demo-simple-select-label">Dubbed</InputLabel>
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
