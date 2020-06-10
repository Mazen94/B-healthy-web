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
import {
  GET,
  VARAINT_SUBTITLE_ONE,
  OUTLINED,
  SKELETON_VARIANT_TEXT,
  SKELETON_VARIANT_RECT,
} from '../../shared/constants/constants';
import * as strings from '../../shared/strings/strings';
import { useStyles } from './styles';

export default function HistoricalMeasures() {
  const classes = useStyles();
  const [visit, setVisit] = useState(['']);
  const [flag, setFlag] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axiosService(
      `${ENDPOINT_PATIENTS}${id}/${ENDPOINT_VISITS}`,
      GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (response.data.data.data.length !== 0)
            setVisit(response.data.data.data[0]); //add the received data to the state data
          setFlag(false);
        }
      }
    );
  }, [id]);
  const customTextField = (name, value, srcIcon) => {
    return (
      <TextField
        className={classes.textFiledMesure}
        label={name}
        variant={OUTLINED}
        disabled
        value={value || ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Avatar src={srcIcon} className={classes.small} />
            </InputAdornment>
          ),
        }}
      />
    );
  };
  if (flag) {
    return (
      <Fragment>
        <Skeleton
          variant={SKELETON_VARIANT_TEXT}
          className={classes.skeletonText}
        />
        <Skeleton
          variant={SKELETON_VARIANT_RECT}
          className={classes.skeletonRect}
        />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Grid item sm={6}>
          <Paper className={classes.paperFiche}>
            <Typography
              variant={VARAINT_SUBTITLE_ONE}
              gutterBottom
              className={classes.typography}
            >
              {strings.HISTORY_PERVIOUS_MEASUREMENTS}
            </Typography>
            <TextField
              className={classes.date}
              label={strings.DATE}
              variant={OUTLINED}
              disabled
              value={visit.updated_at || ''}
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
                {customTextField(strings.WEIGHT, visit.weight, weight)}
                {customTextField(strings.TALL, visit.tall, tall)}
                {customTextField(strings.CHEST, visit.chest, chest)}
              </Grid>
              <Grid className={classes.gridMesure}>
                {customTextField(strings.BELLY, visit.belly, belly)}
                {customTextField(strings.NECK, visit.neck, neck)}
                {customTextField(strings.LEGS, visit.legs, legs)}
              </Grid>
              <TextField
                className={classes.textArea}
                label={strings.NOTE}
                multiline
                rows="4"
                disabled
                value={visit.note || ''}
                variant={OUTLINED}
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
