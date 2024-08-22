import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormLabel, Paper } from '@mui/material';

export default function FilterCheckBoxes() {
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
      <FormControlLabel control={<Checkbox />} label="New" />
      <FormControlLabel control={<Checkbox />} label="Watched" />
      <FormControlLabel control={<Checkbox />} label="Not Watched" />
    </FormGroup>
    </Paper>
  );
}
