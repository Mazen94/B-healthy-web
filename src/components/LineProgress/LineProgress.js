import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { Line as LineChart } from 'react-chartjs-2';
import { useStyles } from './styles';
import { Typography } from '@material-ui/core';
import {
  PROGRESSION,
  PER_MONTH,
  EMPTY_PROGRESSION_DATA,
  GET_MEASURE,
} from '../../shared/strings/strings';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import { PATH_PATIENT, PATH_CONSULTATION } from '../../routes/path';
import { PRIMARY_COLOR } from '../../shared/constants/constants';

function chartData(label, labels, backgroundColor, borderColor, values) {
  return {
    labels: labels,
    datasets: [
      {
        label: `${PROGRESSION} ${label} ${PER_MONTH}`,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        data: values,
      },
    ],
  };
}

const LineProgress = ({
  label,
  labels,
  backgroundColor,
  borderColor,
  values,
}) => {
  const history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const [data] = React.useState(
    chartData(label, labels, backgroundColor, borderColor, values)
  );
  if (values.length === 0) {
    console.log(values);
    return (
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <Typography
            className={classes.typogh}
            align="center"
            color="textPrimary"
            variant="subtitle1"
          >
            {`${EMPTY_PROGRESSION_DATA} ${label}`.toUpperCase()}
          </Typography>
          <Button
            onClick={() =>
              history.push(`${PATH_PATIENT}/${params.id}${PATH_CONSULTATION}`)
            }
            color={PRIMARY_COLOR}
          >
            {GET_MEASURE}
          </Button>
        </Paper>
      </Grid>
    );
  } else {
    return (
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <LineChart data={data} />
        </Paper>
      </Grid>
    );
  }
};

export default LineProgress;
