import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Fragment } from 'react';
import belly from '../../assets/belly.png';
import chest from '../../assets/chest.png';
import legs from '../../assets/legs.png';
import neck from '../../assets/neck.png';
import tall from '../../assets/tall.png';
import weight from '../../assets/weight.png';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

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
    margin: '2%'
  },
  button: {
    marginTop: '4%'
  }
}));

export default function NewMeasures() {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid className={classes.gridMesure}>
        <TextField
          className={classes.textFiledMesure}
          id="input-with-icon-textfield"
          label="Poids (kg)"
          variant="outlined"
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar alt="Remy Sharp" src={legs} className={classes.small} />
              </InputAdornment>
            )
          }}
        />
      </Grid>

      <Button
        mx="auto"
        size="small"
        variant="contained"
        className={classes.button}
        color="primary"
      >
        Valider
      </Button>
    </Fragment>
  );
}
