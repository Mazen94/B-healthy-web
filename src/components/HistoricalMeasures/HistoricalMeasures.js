import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ENDPOINT_PATIENTS,
  ENDPOINT_VISITS,
} from '../../shared/constants/endpoint';
import belly from '../../assets/belly.png';
import chest from '../../assets/chest.png';
import legs from '../../assets/legs.png';
import neck from '../../assets/neck.png';
import note from '../../assets/note.png';
import tall from '../../assets/tall.png';
import weight from '../../assets/weight.png';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { axiosService } from '../../shared/services/services';
import { GET } from '../../shared/constants/constants';
import {
  HISTORY_PERVIOUS_MEASUREMENTS,
  DATE,
  WEIGHT,
  TALL,
  CHEST,
  BELLY,
  NECK,
  LEGS,
  NOTE,
} from '../../shared/strings/strings';
import { useStyles } from './styles';

export default function HistoricalMeasures() {
  const classes = useStyles();
  const [visit, setVisit] = useState(['']);
  const [flag, setFlag] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axiosService(
      `${ENDPOINT_PATIENTS}${id}/${ENDPOINT_VISITS}?page=1&orderBy=updated_at&orderDirection=desc`,
      GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (response.data.data.data.length !== 0)
            setVisit(response.data.data.data[0]); //add the received data to the state data
          setFlag(false);
        } else console.log('error to get data', error);
      }
    );
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
              {HISTORY_PERVIOUS_MEASUREMENTS}
            </Typography>
            <TextField
              className={classes.date}
              label={DATE}
              variant="outlined"
              disabled
              value={visit.updated_at || ''}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl>
              <Grid className={classes.gridMesure}>
                <TextField
                  className={classes.textFiledMesure}
                  label={WEIGHT}
                  variant="outlined"
                  disabled
                  value={visit.weight || ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar src={weight} className={classes.small} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.textFiledMesure}
                  label={TALL}
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
                    ),
                  }}
                />

                <TextField
                  className={classes.textFiledMesure}
                  label={CHEST}
                  variant="outlined"
                  disabled
                  value={visit.chest || ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar src={chest} className={classes.small} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid className={classes.gridMesure}>
                <TextField
                  className={classes.textFiledMesure}
                  label={BELLY}
                  variant="outlined"
                  disabled
                  value={visit.belly || ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar src={belly} className={classes.small} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.textFiledMesure}
                  label={NECK}
                  variant="outlined"
                  disabled
                  value={visit.neck || ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar src={neck} className={classes.small} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.textFiledMesure}
                  label={LEGS}
                  variant="outlined"
                  disabled
                  value={visit.legs || ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar src={legs} className={classes.small} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <TextField
                className={classes.textArea}
                label={NOTE}
                multiline
                rows="4"
                disabled
                value={visit.note || ''}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar src={note} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Paper>
        </Grid>
      </Fragment>
    );
  }
}
