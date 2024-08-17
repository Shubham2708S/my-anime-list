import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';

export default function AnimeCard({name,imageUrl,rating}) {
  const BASE_URL = "https://www10.gogoanimes.fi";
  return (
    <Card raised sx={{height : '500px'}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="240"
        image={imageUrl.startsWith("/") ? BASE_URL+imageUrl : imageUrl}
        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
      />
      <CardContent sx={{height: '160px'}}>
        <Typography gutterBottom variant="h6" component="div" sx={{height: '100px'}}>
          {name}
        </Typography>
        <Rating name="size-small" value={rating} size="small" />
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
