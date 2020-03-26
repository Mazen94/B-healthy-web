import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import React, { Fragment } from 'react';
import belly from '../../assets/belly.png';
import chest from '../../assets/chest.png';
import legs from '../../assets/legs.png';
import neck from '../../assets/neck.png';
import tall from '../../assets/tall.png';
import weight from '../../assets/weight.png';
import note from '../../assets/note.png';

const useStyles = makeStyles(theme => ({
  small: {
    width: 35,
    height: 35
  },
  large: {
    marginTop: 18,
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  gridMesure: {
    marginTop: 25
  },
  textFiledMesure: {
    width: 120,
    margin: '1%'
  },
  button: {
    marginTop: '2%'
  },
  date: {
    marginTop: 20,
    width: '90%'
  },
  textArea: {
    marginTop: '2%',
    width: '34%'
  }
}));

export default function HistoricalMeasures() {
  const classes = useStyles();

  return (
    <Fragment>
      <TextField
        className={classes.date}
        id="input-with-icon-textfield"
        label="Date"
        variant="outlined"
        disabled
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon />
            </InputAdornment>
          )
        }}
      />
      <Grid className={classes.gridMesure}>
        <TextField
          className={classes.textFiledMesure}
          id="input-with-icon-textfield"
          label="Poids (kg)"
          variant="outlined"
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar
                  alt="Remy Sharp"
                  src={weight}
                  className={classes.small}
                />
              </InputAdornment>
            )
          }}
        />
        <TextField
          className={classes.textFiledMesure}
          id="input-with-icon-textfield"
          label="taille (cm)"
          variant="outlined"
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar alt="Remy Sharp" src={tall} className={classes.small} />
              </InputAdornment>
            )
          }}
        />
        <TextField
          className={classes.textFiledMesure}
          id="input-with-icon-textfield"
          label="Poitrine (cm)"
          variant="outlined"
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar
                  alt="Remy Sharp"
                  src={chest}
                  className={classes.small}
                />
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid className={classes.gridMesure}>
        <TextField
          className={classes.textFiledMesure}
          id="input-with-icon-textfield"
          label="Hanche (cm)"
          variant="outlined"
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar
                  alt="Remy Sharp"
                  src={belly}
                  className={classes.small}
                />
              </InputAdornment>
            )
          }}
        />
        <TextField
          className={classes.textFiledMesure}
          id="input-with-icon-textfield"
          label="Cou (cm)"
          variant="outlined"
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar alt="Remy Sharp" src={neck} className={classes.small} />
              </InputAdornment>
            )
          }}
        />
        <TextField
          className={classes.textFiledMesure}
          id="input-with-icon-textfield"
          label="Cuisse (cm)"
          variant="outlined"
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar alt="Remy Sharp" src={legs} className={classes.small} />
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <TextField
        className={classes.textArea}
        id="outlined-multiline-static"
        label="Notes"
        multiline
        rows="4"
        disabled
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Avatar alt="Remy Sharp" src={note} />
            </InputAdornment>
          )
        }}
      />
    </Fragment>
  );
}
