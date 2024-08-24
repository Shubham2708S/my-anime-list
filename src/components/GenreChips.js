/* eslint-disable react/prop-types */
import React from 'react';

import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const GenreChips = ({genres}) => {

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        listStyle: 'none',
        px: 0.5,
        m: 0,
        height: '40px',
        overflowX: 'scroll',
        scrollbarWidth: "none", // Hide the scrollbar for firefox
    '&::-webkit-scrollbar': {
        display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
    },
      }}
      component="ul"
    >
      {genres.map((data,index) => {
        return (
          <ListItem key={index}>
            <Chip
              label={data}
              size="small"
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}

export default GenreChips
