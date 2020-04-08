import React, { Fragment } from 'react';
import people from '../../assets/people.png';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';

export default function CardPatient() {
  const classes = useStyles();

  return (
    <Fragment>
      <img src={people} className={classes.large} alt="Logo" />
      <Grid className={classes.grid}>
        <Typography
          variant="subtitle2"
          gutterBottom
          className={classes.typography}
        >
          Elayeb Mazen
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          className={classes.typography}
        >
          El.ayeb.mazen@gmail.com
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          className={classes.typography}
        >
          53097128
        </Typography>
      </Grid>
    </Fragment>
  );
}
