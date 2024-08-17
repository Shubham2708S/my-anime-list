import React from "react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import AnimeCard from "./AnimeCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "./Pagination";
import TextField from "@mui/material/TextField";

const Home = () => {
  const [animeData, setAnimeData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalAnimes,setTotalAnimes]=useState(20);
  const getAnimeList = useCallback(() => {
    axios
      .get(
        `http://localhost:8080/anime_info/v1?page_no=${page}&page_size=${rowsPerPage}`
      )
      .then(({ data }) => {
        setAnimeData(data.content);
        setTotalAnimes(data.totalElements)
      });
  }, [page, rowsPerPage]);
  useEffect(() => {
    getAnimeList();
  }, [getAnimeList]);
  return (
    <Grid container>
      <Grid container direction="row-reverse" xs={12} sx={{ my: "50px" }}>
        <TextField
          label="Size"
          id="outlined-size-small"
          defaultValue="Small"
          size="small"
        />
      </Grid>
      <Grid xs={12}>
        <Box sx={{ flexGrow: 1, mx: "5vw" }}>
          <Grid container spacing={2}>
            {animeData.map((anime, index) => (
              <Grid item xs={3} key={index}>
                <AnimeCard
                  name={anime.name}
                  imageUrl={anime.imageUrl}
                  rating={anime.star}
                />
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
