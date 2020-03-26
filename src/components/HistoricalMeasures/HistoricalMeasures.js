import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import React, { Fragment, useEffect, useState } from 'react';
import belly from '../../assets/belly.png';
import chest from '../../assets/chest.png';
import legs from '../../assets/legs.png';
import neck from '../../assets/neck.png';
import tall from '../../assets/tall.png';
import weight from '../../assets/weight.png';
import note from '../../assets/note.png';
import { useParams } from 'react-router-dom';
import healthy from '../../api/healthy'; //new instance of axios with a custom config
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  gridFiche: {
    height: 520
  },
  paperFiche: {
    width: '97%',
    height: 500,
    marginTop: 30,
    margin: 'auto'
  },
  typography: {
    paddingTop: 12,
    color: 'rgb(63, 81, 181)',

    'font-size': '16px'
  },
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
    marginTop: 10
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
  const [visit, setVisit] = useState(['']);
  const [flag, setFlag] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    /**
     * Arrow function to get the data (Visits) using Async await
     */
    const loadVisit = async () => {
      try {
        const authStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
        const response = await healthy.get(`patients/${id}/visits`, {
          headers: { Authorization: authStr }
        });
        console.log(response.data.visits.data);
        if (response.data.visits.data.length !== 0) {
          setVisit(response.data.visits.data[0]); //add the received data to the state data
        }
        setFlag(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    //call function
    loadVisit();
  }, [id]);
  if (flag) {
    return (
      <Fragment>
        <Skeleton variant="text" width="99%" height={100} />
        <Skeleton variant="rect" width="99%" height="75%" />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Paper className={classes.paperFiche}>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.typography}
          >
            Hisotrique des précédents mesures
          </Typography>
          <ValidatorForm noValidate>
            <TextValidator
              className={classes.date}
              id="input-with-icon-TextValidator"
              label="Date"
              variant="outlined"
              disabled
              defaultValue=""
              value={visit.updated_at || ''}
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
              <TextValidator
                className={classes.textFiledMesure}
                id="input-with-icon-TextValidator"
                label="Poids (kg)"
                variant="outlined"
                disabled
                value={visit.weight || ''}
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
              <TextValidator
                className={classes.textFiledMesure}
                id="input-with-icon-TextValidator"
                label="taille (cm)"
                variant="outlined"
                disabled
                value={visit.weight || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar
                        alt="Remy Sharp"
                        src={tall}
                        className={classes.small}
                      />
                    </InputAdornment>
                  )
                }}
              />

              <TextValidator
                className={classes.textFiledMesure}
                id="input-with-icon-TextValidator"
                label="Poitrine (cm)"
                variant="outlined"
                disabled
                value={visit.weight || ''}
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
              <TextValidator
                className={classes.textFiledMesure}
                id="input-with-icon-TextValidator"
                label="Hanche (cm)"
                variant="outlined"
                disabled
                value={visit.weight || ''}
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
              <TextValidator
                className={classes.textFiledMesure}
                id="input-with-icon-TextValidator"
                label="Cou (cm)"
                variant="outlined"
                disabled
                value={visit.weight || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar
                        alt="Remy Sharp"
                        src={neck}
                        className={classes.small}
                      />
                    </InputAdornment>
                  )
                }}
              />
              <TextValidator
                className={classes.textFiledMesure}
                id="input-with-icon-TextValidator"
                label="Cuisse (cm)"
                variant="outlined"
                disabled
                value={visit.weight || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar
                        alt="Remy Sharp"
                        src={legs}
                        className={classes.small}
                      />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <TextValidator
              className={classes.textArea}
              id="outlined-multiline-static"
              label="Notes"
              multiline
              rows="4"
              disabled
              value={visit.note || ''}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar alt="Remy Sharp" src={note} />
                  </InputAdornment>
                )
              }}
            />
            *
          </ValidatorForm>
        </Paper>
      </Fragment>
    );
  }
}
