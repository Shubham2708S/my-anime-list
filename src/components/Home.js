import React, { useRef } from "react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AnimeCard from "./AnimeCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "./Pagination";
import TextField from "@mui/material/TextField";
import Toggle from "./Toggle";
import { FormControlLabel } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FilterCheckBoxes from "./FilterCheckBoxes";
import GenreDropdown from "./GenreDropdown";
import ShuffleOnOutlinedIcon from '@mui/icons-material/ShuffleOnOutlined';
import { animeSearch, refreshAnime, shuffleAnime } from "../apis/animeListApi";
import WatchedFilterRadioButton from "./WatchedFilterRadioButton";
import DubbedDropdown from "./DubbedDropdown";
import WatchedDropdown from "./WatchedDropdown";
import YearsDropdown from "./YearsDropdown";
import RatingsDropdown from "./RatingsDropdown";

const Home = () => {
  const searchCriteria = useRef({})
  const [animeData, setAnimeData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalAnimes, setTotalAnimes] = useState(20);
  const [searchValue, setSearchValue] = useState("");
  const getAnimeList = useCallback(() => {
    animeSearch(page,rowsPerPage)
      .then(({ data }) => {
        setAnimeData(data.content);
        setTotalAnimes(data.page.totalElements);
      });
  }, [page, rowsPerPage]);
  useEffect(() => {
    getAnimeList();
  }, [getAnimeList]);
  const searchAnime = useCallback(() => {
    searchCriteria.current = {...searchCriteria.current, name:searchValue}
    animeSearch(page,rowsPerPage,searchCriteria.current)
      .then(({ data }) => {
        setAnimeData(data.content);
        setTotalAnimes(data.page.totalElements);
      });
  }, [page, rowsPerPage, searchValue]);
  const handleRefreshButton =  () => {
     refreshAnime();
    getAnimeList();
  };
  const handleShuffleButton =  () => {
     shuffleAnime(rowsPerPage)
    .then(({ data }) => {
        setAnimeData(data.content);
        setTotalAnimes(data.page.totalElements);
      });
  };
  return (
    <Grid container>
      <Grid
        container
        direction="row-reverse"
        xs={12}
        sx={{ mx: "5vw", mb: "2vh", mt: "4vh" }}
      >
        <TextField
          label="With normal TextField"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon onClick={searchAnime} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
        <DubbedDropdown 
        page={page}
        rowsPerPage={rowsPerPage}
        searchCriteria={searchCriteria}
        setAnimeData={setAnimeData}
        setTotalAnimes={setTotalAnimes}
        />
        <WatchedDropdown 
        page={page}
        rowsPerPage={rowsPerPage}
        searchCriteria={searchCriteria}
        setAnimeData={setAnimeData}
        setTotalAnimes={setTotalAnimes}
        />
        <FilterCheckBoxes 
        page={page}
        rowsPerPage={rowsPerPage}
        searchCriteria={searchCriteria}
        setAnimeData={setAnimeData}
        setTotalAnimes={setTotalAnimes}
        />
        <GenreDropdown 
        page={page}
        rowsPerPage={rowsPerPage}
        searchCriteria={searchCriteria}
        setAnimeData={setAnimeData}
        setTotalAnimes={setTotalAnimes}
        />
        <YearsDropdown 
        page={page}
        rowsPerPage={rowsPerPage}
        searchCriteria={searchCriteria}
        setAnimeData={setAnimeData}
        setTotalAnimes={setTotalAnimes}
        />
        <RatingsDropdown 
        page={page}
        rowsPerPage={rowsPerPage}
        searchCriteria={searchCriteria}
        setAnimeData={setAnimeData}
        setTotalAnimes={setTotalAnimes}
        />
        <Button
          variant="outlined"
          startIcon={<AutorenewIcon />}
          onClick={handleRefreshButton}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 1,
          }}
        >
          Refresh
        </Button>
        <Button
          variant="outlined"
          startIcon={<ShuffleOnOutlinedIcon />}
          onClick={handleShuffleButton}
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 1,
          }}
        >
          Shuffle
        </Button>
      </Grid>
      <Grid xs={12}>
        <Box sx={{ flexGrow: 1, mx: "5vw" }}>
          <Grid container spacing={2}>
            {animeData.length && animeData.map((anime, index) => (
              <Grid item xs={3} key={index}>
                <AnimeCard animeData={anime} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
      <Grid container direction="row-reverse">
        <Pagination
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalElements={totalAnimes}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
