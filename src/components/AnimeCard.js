/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from "react";

import {
  Avatar,
  Box,
  Card,
  CardHeader,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Link,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { parse, isToday } from "date-fns";

import GenreChips from "./GenreChips";
import { updateAnime } from "../apis/animeListApi";
import apiConfig from "../apiConfig";

const AnimeCard = ({ animeData }) => {
  const {
    id,
    name,
    image_url,
    star,
    anime_url,
    genres,
    watch_status,
    updated_date,
    status,
    release_year,
    summary,
  } = animeData;
  const isNew = isToday(parse(updated_date, "yyyy-MM-dd", new Date()));
  const categories = [
    { label: "Watched", value: "WATCHED" },
    { label: "Not Watched", value: "NOT_WATCHED" },
    { label: "Watching", value: "WATCHING" },
    { label: "Won't Watch", value: "WONT_WATCH" },
  ];

  const [disabled, setDisabled] = useState(true);
  const [watchedStatus, setWatchedStatus] = useState(watch_status);
  const [rating, setRating] = useState(star);

  const saveAnimeDetails = useCallback(() => {
    const animeUpdateRequest = {
      id,
      watch_status: watchedStatus,
      star: rating,
    };
    updateAnime(animeUpdateRequest);
  }, [id, watchedStatus, rating]);

  useEffect(() => {
    setWatchedStatus(watch_status);
    setRating(star);
  }, [watch_status, star]);

  return (
    <Card
      raised
      sx={{
        maxWidth: 345,
        ":hover": {
          boxShadow: 20,
          transform: "scale3d(1.05, 1.05, 1)",
        },
      }}
    >
      <CardHeader
        sx={{ objectFit: "contain", height: "50px" }}
        avatar={
          <Avatar
            src={
              image_url?.startsWith("/")
                ? apiConfig.BASE_URL + image_url
                : image_url
            }
          />
        }
        title={
          <Rating
            name="size-small"
            value={rating}
            size="small"
            disabled={disabled}
            onChange={(_, newValue) => {
              setRating(newValue);
            }}
            max={10}
          />
        }
        subheader={
          <span>
            <Chip label={status} />
            <Chip label={release_year} sx={{ ml: "1em" }} />
          </span>
        }
        action={
          <Grid container>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Link
                  href={`${apiConfig.BASE_URL}${anime_url}`}
                  underline="none"
                  target="_blank"
                >
                  <OpenInNewIcon sx={{ pr: "0px" }} />
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                {disabled ? (
                  <EditIcon onClick={() => setDisabled(false)} />
                ) : (
                  <>
                    <DoneIcon
                      onClick={() => {
                        setDisabled(true);
                        saveAnimeDetails();
                      }}
                    />
                    <CloseIcon
                      onClick={() => {
                        setDisabled(true);
                      }}
                    />
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        }
      />
      <CardMedia
        component="img"
        alt="green iguana"
        height="280px"
        image={
          image_url?.startsWith("/")
            ? apiConfig.BASE_URL + image_url
            : image_url
        }
        sx={{ objectFit: "contain", height: "200px" }}
      />
      <CardContent sx={{ height: "250px" }}>
        <Paper
          sx={{
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          direction="column"
        >
          <Typography gutterBottom variant="body2" component="div">
            {name}
          </Typography>
        </Paper>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            my: 0.5,
            height: "145px",
            overflowY: "scroll",
            scrollbarWidth: "none", // Hide the scrollbar for firefox
            "&::-webkit-scrollbar": {
              display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
            },
          }}
        >
          <Typography gutterBottom variant="caption" component="div">
            {summary}
          </Typography>
        </Paper>
        <GenreChips genres={genres} />
      </CardContent>
      <CardActions sx={{ height: "20px" }}>
        <Grid container>
          <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
              <Select
                labelId="watch-status-select-label"
                id="watch-status-select"
                value={watchedStatus}
                defaultValue={watchedStatus}
                label="Watch Status"
                onChange={(e) => {
                  setWatchedStatus(e.target.value);
                }}
                disabled={disabled}
              >
                {categories.map((category, index) => (
                  <MenuItem
                    key={index}
                    value={category.value}
                    name={category.value}
                  >
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row-reverse">
              {isNew && (
                <Grid item display="flex">
                  <Chip label="New" />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default AnimeCard;
