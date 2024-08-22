import React from "react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AnimeCard from "./AnimeCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "./Pagination";
import TextField from "@mui/material/TextField";
import Toggle from "./Toggle";
import { FormControlLabel } from "@mui/material";
import FilterRadioButton from "./FilterRadioButton";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FilterCheckBoxes from "./FilterCheckBoxes";
import GenreDropdown from "./GenreDropdown";
import ShuffleOnOutlinedIcon from '@mui/icons-material/ShuffleOnOutlined';
import { animeSearch } from "../apis/animeListApi";

const Home = () => {

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
    axios
      .get(
        `http://localhost:8080/anime_info/v1/search?page_no=${page}&page_size=${rowsPerPage}&name=${searchValue}`
      )
      .then(({ data }) => {
        setAnimeData(data.content);
        setTotalAnimes(data.page.totalElements);
      });
  }, [page, rowsPerPage, searchValue]);
  const handleRefreshButton = async () => {
    await axios.get("http://localhost:8080/anime_info/v1/refresh");
    getAnimeList();
  };
  const handleShuffleButton = async () => {
    await axios.get("http://localhost:8080/anime_info/v1/random")
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
        <FilterRadioButton
          setAnimeData={setAnimeData}
          setTotalAnimes={setTotalAnimes}
          page={page}
          rowsPerPage={rowsPerPage}
        />
        <FilterCheckBoxes />
        <GenreDropdown/>
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
            {animeData.map((anime, index) => (
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
