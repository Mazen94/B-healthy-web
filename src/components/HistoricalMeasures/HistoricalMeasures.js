import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import healthy from '../../api/healthy'; //new instance of axios with a custom config
import belly from '../../assets/belly.png';
import chest from '../../assets/chest.png';
import legs from '../../assets/legs.png';
import neck from '../../assets/neck.png';
import note from '../../assets/note.png';
import tall from '../../assets/tall.png';
import weight from '../../assets/weight.png';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  paperFiche: {
    display: 'grid',
    margin: 'auto',
    width: '98%',
    paddingBottom: '2%'
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
    marginTop: 10,
    width: '100%'
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
    width: '60%',

    margin: 'auto'
  },
  textArea: {
    marginTop: '2%',
    margin: 'auto',
    width: '45%'
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
        const response = await healthy.get(
          `patients/${id}/visits?page=1&orderBy=updated_at&orderDirection=desc`,
          {
            headers: { Authorization: authStr }
          }
        );
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
        <Skeleton variant="rect" width="99%" height={350} />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Grid item sm={12}>
          <Paper className={classes.paperFiche}>
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.typography}
            >
              Hisotrique des précédents mesures
            </Typography>
            <TextField
              className={classes.date}
              label="Date"
              variant="outlined"
              disabled
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
            <FormControl>
              <Grid className={classes.gridMesure}>
                <TextField
                  className={classes.textFiledMesure}
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
                <TextField
                  className={classes.textFiledMesure}
                  label="taille (cm)"
                  variant="outlined"
                  disabled
                  value={visit.tall || ''}
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

                <TextField
                  className={classes.textFiledMesure}
                  label="Poitrine (cm)"
                  variant="outlined"
                  disabled
                  value={visit.chest || ''}
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
                  label="Hanche (cm)"
                  variant="outlined"
                  disabled
                  value={visit.belly || ''}
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
                  label="Cou (cm)"
                  variant="outlined"
                  disabled
                  value={visit.neck || ''}
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
                <TextField
                  className={classes.textFiledMesure}
                  label="Cuisse (cm)"
                  variant="outlined"
                  disabled
                  value={visit.legs || ''}
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
              <TextField
                className={classes.textArea}
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
            </FormControl>
          </Paper>
        </Grid>
      </Fragment>
    );
  }
}
