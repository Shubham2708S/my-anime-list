import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { Box, Paper } from "@mui/material";

export default function FilterRadioButton({
  setAnimeData,
  setTotalAnimes,
  page,
  rowsPerPage,
}) {
  const handleRadio = (e) => {
    let searchCriteria = "";
    switch (e.target.defaultValue) {
      case "dubbed":
        searchCriteria = "&dubbed=true";
        break;
      case "subbed":
        searchCriteria = "&subbed=true";
        break;
      
    } 
    axios
      .get(
        `http://localhost:8080/anime_info/v1/search?page_no=${page}&page_size=${rowsPerPage}${searchCriteria}`
      )
      .then(({ data }) => {
        setAnimeData(data.content);
        setTotalAnimes(data.page.totalElements);
      });
  };
  return (
    <Paper sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 1,
      }}>
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="dubbed"
          control={<Radio onChange={handleRadio} />}
          label="Dubbed"
        />
        <FormControlLabel value="subbed" control={<Radio onChange={handleRadio} />} label="Subbed" />
      </RadioGroup>
    </FormControl>
    </Paper>
  );
}
