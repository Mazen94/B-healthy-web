import React, { Fragment } from 'react';
import LineProgress from '../../components/LineProgress/LineProgress';
import * as constants from '../../shared/constants/constants';
import { findTheMonth } from '../../shared/services/services';
import * as strings from '../../shared/strings/strings';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './styles';

const LineProgressPatient = ({ data }) => {
  const classes = useStyles();

  //GET THE  LABELS FOR THE CHART LINE USING THE FUNCTION findTheMonth key : items.month
  function _getLabels(values) {
    let dataLabels = [];
    values.forEach((element) => {
      dataLabels.push(findTheMonth(element.month));
    });

    return dataLabels;
  }

  //Function to GET the DATA OF WEIGHT FOR THE CHART LINE
  function _getData(values) {
    let dataValues = [];
    values.forEach((element) => {
      const arrayData = Object.values(element);
      dataValues.push(arrayData[1]);
    });
    return dataValues;
  }
  if (data.length !== 0)
    return (
      <Fragment>
        <LineProgress
          label={strings.WEIGHT_PROGRESSION}
          labels={_getLabels(data.weights)}
          backgroundColor={constants.WEIGHT_PROGRESSION_BACKGROUNDCOLOR}
          borderColor={constants.WEIGHT_PROGRESSION_BORDERCOLOR}
          values={_getData(data.weights)}
        />
        <LineProgress
          label={strings.CHEST_PROGRESSION}
          labels={_getLabels(data.chest)}
          values={_getData(data.chest)}
          backgroundColor={constants.CHEST_PROGRESSION_BACKGROUNDCOLOR}
          borderColor={constants.CHEST_PROGRESSION_BORDERCOLOR}
        />
        <LineProgress
          label={strings.LEGS_PROGRESSION}
          labels={_getLabels(data.legs)}
          values={_getData(data.legs)}
          backgroundColor={constants.LEGS_PROGRESSION_BACKGROUNDCOLOR}
          borderColor={constants.LEGS_PROGRESSION_BORDERCOLOR}
        />
        <LineProgress
          label={strings.BELLY_PROGRESSION}
          labels={_getLabels(data.belly)}
          values={_getData(data.belly)}
          backgroundColor={constants.BELLY_PROGRESSIO_BACKGROUNDCOLOR}
          borderColor={constants.BELLY_PROGRESSIO_BORDERCOLOR}
        />
      </Fragment>
    );
  else
    return (
      <Fragment>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <CircularProgress />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <CircularProgress />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <CircularProgress />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <CircularProgress />
          </Paper>
        </Grid>
      </Fragment>
    );
};

export default LineProgressPatient;
