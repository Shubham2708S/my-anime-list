import React, { useRef, useCallback, useEffect, useState } from "react";

import {
  Paper,
  Skeleton,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ShuffleOnOutlinedIcon from "@mui/icons-material/ShuffleOnOutlined";

import AnimeCard from "./AnimeCard";
import Pagination from "./Pagination";
import FilterCheckBoxes from "./FilterCheckBoxes";
import GenreDropdown from "./GenreDropdown";
import { animeSearch, refreshAnime, shuffleAnime } from "../apis/animeListApi";
import DubbedDropdown from "./DubbedDropdown";
import WatchedDropdown from "./WatchedDropdown";
import YearsDropdown from "./YearsDropdown";
import RatingsDropdown from "./RatingsDropdown";
import StatusDropdown from "./StatusDropdown";
import nothingFound from "../image/nothing_found.png";
import CategoryDropdown from "./CategoryDropdown";
import EpisodesDropDown from "./EpisodesDropDown";

const Home = () => {
  const searchCriteria = useRef({});

  const [animeData, setAnimeData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalAnimes, setTotalAnimes] = useState(20);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchAnime = useCallback(
    () => {
      setIsLoading(true);
      animeSearch(page, rowsPerPage, searchCriteria.current)
        .then(({ data }) => {
          setAnimeData(data.content);
          setTotalAnimes(data.page.totalElements);
        })
        .finally(() => setIsLoading(false));
    },
    [page, rowsPerPage]
  );

  useEffect(() => {
    searchAnime(searchCriteria);
  }, [searchAnime]);

  const searchAnimeByName = useCallback(() => {
    searchCriteria.current = { ...searchCriteria.current, name: searchValue };
    searchAnime(searchCriteria.current);
  }, [searchValue, searchAnime]);

  const handleRefreshButton = () => {
    refreshAnime();
    searchAnime();
  };

  const handleShuffleButton = () => {
    setIsLoading(true);
    shuffleAnime(rowsPerPage, searchCriteria.current)
      .then(({ data }) => {
        setAnimeData(data.content);
        setTotalAnimes(data.page.totalElements);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getAnimeCard = () => {
    if (!isLoading && !animeData.length) {
      return (
        <Grid
          sx={{
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          item
          xs={12}
        >
          <img
            src={nothingFound}
            alt="No result found"
            style={{ width: "50vw", height: "70vh" }}
          />
        </Grid>
      );
    }
    return (isLoading ? Array.from(new Array(rowsPerPage)) : animeData).map(
      (anime, index) => (
        <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
          {anime ? (
            <AnimeCard animeData={anime} />
          ) : (
            <Skeleton
              animation="wave"
              variant="rectangular"
              xs={12}
              sm={6}
              md={6}
              lg={3}
              height={600}
            />
          )}
        </Grid>
      )
    );
  };

  return (
    <Grid container>
      <Grid container direction="row-reverse" sx={{ mx: "5vw", mt: "4vh" }}>
        <TextField
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={searchAnimeByName}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          onKeyDown={(e) =>
            e.key === "Enter" ? searchAnimeByName(e.target.value) : null
          }
          sx={{
            minWidth: 120,
            display: "flex",
            my: 1.5,
          }}
          variant="standard"
        />
        <DubbedDropdown
          searchCriteria={searchCriteria}
          searchAnime={searchAnime}
        />
        <WatchedDropdown
          searchCriteria={searchCriteria}
          searchAnime={searchAnime}
        />
        <GenreDropdown
          searchCriteria={searchCriteria}
          searchAnime={searchAnime}
        />
        <YearsDropdown
          searchCriteria={searchCriteria}
          searchAnime={searchAnime}
        />
        <RatingsDropdown
          searchCriteria={searchCriteria}
          searchAnime={searchAnime}
        />
        <StatusDropdown
          searchCriteria={searchCriteria}
          searchAnime={searchAnime}
        />
        <CategoryDropdown
        searchCriteria={searchCriteria}
        searchAnime={searchAnime}
        />
        <EpisodesDropDown
        searchCriteria={searchCriteria}
        searchAnime={searchAnime}
        />
      </Grid>
      <Grid container direction="row-reverse" sx={{ mx: "5vw", my: "2vh" }}>
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
            my: 2.5,
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
            m: 2.5,
          }}
        >
          Shuffle
        </Button>
        <FilterCheckBoxes
          searchCriteria={searchCriteria}
          searchAnime={searchAnime}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            flexGrow: 1,
            mx: "5vw",
          }}
        >
          {
            <Grid container spacing={2}>
              {getAnimeCard(isLoading, rowsPerPage, animeData)}
            </Grid>
          }
        </Paper>
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
