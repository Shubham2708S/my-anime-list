import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { Box, Paper } from "@mui/material";
import { animeSearch } from "../apis/animeListApi";

export default function WatchedFilterRadioButton({
  setAnimeData,
  setTotalAnimes,
  page,
  rowsPerPage,
  searchCriteria,
}) {
  const handleRadio = (e) => {
    switch (e.target.defaultValue) {
      case "watched":
        delete searchCriteria.current.notwatched
        searchCriteria.current = {...searchCriteria.current,watched:true};
        break;
      case "notWatched":
        delete searchCriteria.current.watched
        searchCriteria.current = {...searchCriteria.current,notwatched:true};
        break;
    } 
    animeSearch(page,rowsPerPage,searchCriteria.current)
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
          value="watched"
          control={<Radio onChange={handleRadio} />}
          label="Watched"
        />
        <FormControlLabel value="notWatched" control={<Radio onChange={handleRadio} />} label="Not Watched" />
      </RadioGroup>
    </FormControl>
    </Paper>
  );
}
