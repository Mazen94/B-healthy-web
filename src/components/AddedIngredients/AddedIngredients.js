import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { useStyles } from './styles';
import { CONTAINED } from '../../shared/constants/constants';

export default function AddedIngredients({ addedIngredients, handleDelete }) {
  const classes = useStyles(); //add styles to variable classes

  return (
    <Paper elevation={0} className={classes.paperChip}>
      {addedIngredients.map((value) => (
        <Chip
          key={value.id}
          label={value.name}
          onDelete={() => handleDelete(value.id)}
          variant={CONTAINED}
          className={classes.chip}
        />
      ))}
    </Paper>
  );
}
