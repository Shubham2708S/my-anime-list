/* eslint-disable react/prop-types */
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
import { animeSearch } from '../apis/animeListApi';

export default function FilterCheckBoxes({ setAnimeData,setTotalAnimes,page, rowsPerPage, searchCriteria }) {
    const [newFilter,setNewFilter] = React.useState(false)
    const handleCheckBox = () => {
        searchCriteria.current = {...searchCriteria.current,newly:!newFilter}
        setNewFilter(!newFilter)
        animeSearch(page,rowsPerPage,searchCriteria.current)
          .then(({ data }) => {
            setAnimeData(data.content);
            setTotalAnimes(data.page.totalElements);
          });
      };

    
  return (
    <Box
    sx={{
      minWidth: 120,
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      p: 0.5,
      my: 2.5,
      mx: 0,
    }}>
    <FormGroup row>
      <FormControlLabel value="new" control={<Checkbox onChange={handleCheckBox} checked={newFilter}/>} label="New" />
    </FormGroup>
    </Box>
  );
}
