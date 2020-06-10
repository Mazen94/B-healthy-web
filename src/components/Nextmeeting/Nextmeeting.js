import DateFnsUtils from '@date-io/date-fns';
import { Button, List, ListItem, TextField, Snackbar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import 'date-fns';
import frLocale from 'date-fns/locale/fr';
import React, { Fragment, useState } from 'react';
import * as constants from '../../shared/constants/constants';
import { axiosService } from '../../shared/services/services';
import * as strings from '../../shared/strings/strings';
import { useStyles } from './styles';
import { useParams } from 'react-router-dom';
import { PATH_PATIENTS } from '../../routes/path';
import * as endpoint from '../../shared/constants/endpoint';
import Alert from '@material-ui/lab/Alert';

export default function Nextmeeting() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState('07:30');
  const [cirularProgress, setCirularProgress] = useState(false);
  const [displayMeetingHour, setDisplayMeetingHour] = useState(false);
  const [data, setData] = useState([]);
  const params = useParams();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDisplayMeetingHour(false);
    setCirularProgress(true);
    setData([]);
    let meetingDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}   `;
    axiosService(
      endpoint.ENDPOINT_MEETING,
      constants.POST,
      true,
      { date: meetingDate },
      (error, response) => {
        if (response) {
          console.log(response.data.data);
          setCirularProgress(false);
          setDisplayMeetingHour(true);
          if (response.data.data.length !== 0) setData(response.data.data);
        }
      }
    );
  };

  const handleHourChange = (e) => {
    setSelectedHour(e.target.value);
  };
  const handleClickButton = () => {
    let meetingDate = `${selectedDate.getFullYear()}-${
      selectedDate.getMonth() + 1
    }-${selectedDate.getDate()}   `;
    let sendData = {
      date: meetingDate,
      hour: selectedHour,
    };
    axiosService(
      `${endpoint.ENDPOINT_PATIENTS}${params.id}/${endpoint.ENDPOINT_VISITS}${endpoint.ENDPOINT_NEW_MEETING}`,
      constants.POST,
      true,
      sendData,
      (error, response) => {
        if (response) {
          setOpenSnackbar(true);
        }
      }
    );
  };

  const meetingHourRender = (
    selectedHour,
    handleHourChange,
    handleClickButton
  ) => {
    return (
      <Fragment>
        <TextField
          label={strings.CHOOSE_HOUR}
          type="time"
          value={selectedHour}
          onChange={handleHourChange}
          className={classes.time}
        />

        <br />
        <Button
          className={classes.button}
          color={constants.PRIMARY_COLOR}
          variant={constants.CONTAINED}
          onClick={handleClickButton}
        >
          {strings.VALIDATE}
        </Button>
      </Fragment>
    );
  };
  return (
    <Fragment>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {strings.MEEETING_ADDED}
        </Alert>
      </Snackbar>
      <Grid item sm={6}>
        <Paper className={classes.paperFiche}>
          <Typography
            variant={constants.VARAINT_SUBTITLE_ONE}
            gutterBottom
            className={classes.typography}
          >
            {strings.NEXT_MEETING}
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
            <KeyboardDatePicker
              disablePast
              disabled={cirularProgress}
              variant={constants.OUTLINED}
              className={classes.keyboardDatePicker}
              label={strings.SELECT_DATA}
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
          {displayMeetingHour &&
            (data.length !== 0 ? (
              <Fragment>
                <Typography
                  variant={constants.VARAINT_BODY_TWO}
                  gutterBottom
                  className={classes.typographyTwo}
                >
                  {strings.MEETING_DATE.toUpperCase()}
                </Typography>
                <List dense>
                  {data.map((value) => {
                    return (
                      <ListItem
                        key={Math.random()}
                        className={classes.listItem}
                        button
                      >
                        <Typography
                          variant={constants.VARAINT_SUBTITLE_ONE}
                          gutterBottom
                        >
                          {value.meetingHour.slice(0, 5)}
                        </Typography>
                      </ListItem>
                    );
                  })}
                </List>
                {meetingHourRender(
                  selectedHour,
                  handleHourChange,
                  handleClickButton
                )}
              </Fragment>
            ) : (
              <div className={classes.nomeeting}>
                <Typography
                  variant={constants.VARAINT_SUBTITLE_ONE}
                  className={classes.typographyTwoStyle}
                  gutterBottom
                >
                  {strings.NO_MEETING_DATE.toUpperCase()}
                </Typography>
                {meetingHourRender(
                  selectedHour,
                  handleHourChange,
                  handleClickButton
                )}
              </div>
            ))}
          {cirularProgress && (
            <CircularProgress className={classes.cirularProgress} />
          )}
        </Paper>
      </Grid>
    </Fragment>
  );
}
