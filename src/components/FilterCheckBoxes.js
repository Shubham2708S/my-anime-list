/* eslint-disable react/prop-types */
import React,{useState} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';

const FilterCheckBoxes= ({ searchCriteria,searchAnime }) => {
    const [newFilter,setNewFilter] = useState(false)

    const handleCheckBox = (e) => {
       if(e.target.checked){
        searchCriteria.current = {...searchCriteria.current,newly:true}
       } else {
        delete searchCriteria.current.newly
       }
        setNewFilter(!newFilter)
        searchAnime(searchCriteria.current)
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
      <FormControlLabel value={newFilter} control={<Checkbox onChange={handleCheckBox} checked={newFilter}/>} label="New" />
    </FormGroup>
    </Box>
  );
}

export default FilterCheckBoxes
