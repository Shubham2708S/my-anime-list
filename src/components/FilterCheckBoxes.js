import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel, Paper } from '@mui/material';
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
    <Paper
     sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 1,
      }}>
    <FormGroup row>
      <FormControlLabel value="new" control={<Checkbox onChange={handleCheckBox} checked={newFilter}/>} label="New" />
    </FormGroup>
    </Paper>
  );
}
