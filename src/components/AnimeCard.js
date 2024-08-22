import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Toggle from "./Toggle";
import {
  Avatar,
  Box,
  CardHeader,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import Link from "@mui/material/Link";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";
import Chip from "@mui/material/Chip";
import GenreChips from "./GenreChips";
import { parse, isToday } from "date-fns";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CloseIcon from '@mui/icons-material/Close';
import WatchIcon from '@mui/icons-material/Watch';
import WatchOutlinedIcon from '@mui/icons-material/WatchOutlined';

export default function AnimeCard({ animeData }) {
  const {
    id,
    name,
    imageUrl,
    star,
    animeUrl,
    genres,
    isWatched,
    createdDate,
    status,
    releaseYear,
  } = animeData;
  const isNew = isToday(parse(createdDate, "yyyy-MM-dd", new Date()));
  const BASE_URL = "https://www10.gogoanimes.fi";
  const [disabled, setDisabled] = React.useState(true);
  const [watched, setWatched] = React.useState(isWatched);
  const [rating, setRating] = React.useState(star);
  const saveAnimeDetails = React.useCallback(() => {
    const animeUpdateRequest = {
      id,
      is_watched: watched,
      star: rating,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    axios.put("http://localhost:8080/anime_info/v1", animeUpdateRequest, {
      headers,
    });
  }, [id, watched, rating]);
  return (
    <Card raised sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{ objectFit: "contain", height: "50px" }}
        avatar={
          <Avatar
            src={imageUrl?.startsWith("/") ? BASE_URL + imageUrl : imageUrl}
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
            <Chip label={releaseYear} sx={{ ml: "1em" }} />
          </span>
        }
        action={
          <Grid container>
            <Grid xs={12} direction="row-reverse">
              <Box display="flex" justifyContent="flex-end">
              <Link
                href={`${BASE_URL}${animeUrl}`}
                underline="none"
                target="_blank"
              >
                <OpenInNewIcon sx={{ pr: "0px" }} />
              </Link>
              </Box>
            </Grid>
            <Grid xs={12}>
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
              <CloseIcon onClick={() => {
                  setDisabled(true);
                }}/>
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
        height="250px"
        image={imageUrl?.startsWith("/") ? BASE_URL + imageUrl : imageUrl}
        sx={{ objectFit: "contain", height: "200px" }}
      />
      <CardContent sx={{ height: "230px" }}>
        <Grid
          container
          sx={{ height: "90px" }}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </Grid>
        <Grid xs={12} sx={{ height: "135px" }}>
          <GenreChips genres={genres} />
        </Grid>
      </CardContent>
      <CardActions sx={{ height: "20px" }}>
        <Grid container>
          <Grid xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={disabled}
                  checked={watched}
                  onChange={(e) => {
                    console.log(e.target)
                    setWatched(!watched)}}
                  value={watched}
                  icon={<WatchOutlinedIcon />}
                  checkedIcon={<WatchIcon />}
                />
              }
              label={watched ? "Watched" : "Not Watched"}
              //sx={{ pl: "0.5em" }}
            />
          </Grid>
          {isNew && (
            <Grid xs={6} display="flex" direction="row-reverse">
              <Chip label="New" />
            </Grid>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
}
