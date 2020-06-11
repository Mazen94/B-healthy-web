import React, { useState, useEffect, Fragment } from 'react';
import { Pie } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import {
  CHART_BACKGROUNDCOLOR,
  PRIMARY_COLOR,
  SKELETON_VARIANT_RECT,
} from '../../shared/constants/constants'; // Get constants from  constants  file
import {
  DISTRIBUTION_BY_GENDER,
  CHART_LABEL_MALE,
  CHART_LABEL_FEMALE,
  ZERO_PATIENTS,
  CLICK_FOR_CREATE,
} from '../../shared/strings/strings';
import { STATISTICS_GENDER } from '../../shared/constants/endpoint';
import { axiosService } from '../../shared/services/services';
import { GET } from '../../shared/constants/constants';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { useStyles } from './styles';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { PATH_PATIENTS, PATH_PATIENT } from '../../routes/path';

export default function Chart() {
  const classes = useStyles(); //add styles to variable classes
  const [countMale, setCountMale] = useState(0); //state to recover the number of male
  const [countFemale, setCountFemale] = useState(0); //state to recover the number of female
  const history = useHistory();
  const [flag, setFlag] = useState(true);
  const fixedHeightPaperEmpty = clsx(
    classes.paper,
    classes.fixedHeightPaperEmpty
  );
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight); //clsx is a tiny utility for constructing className strings conditionally
  //Bring in data
  const data = {
    labels: [CHART_LABEL_FEMALE, CHART_LABEL_MALE],
    datasets: [
      {
        data: [countFemale, countMale],
        backgroundColor: CHART_BACKGROUNDCOLOR,
      },
    ],
  };
  /**
   * Hook to get the patient by gender
   */
  useEffect(() => {
    let mounted = true;
    axiosService(STATISTICS_GENDER, GET, true, null, (error, response) => {
      if (response) {
        if (mounted) {
          setCountFemale(response.data.data.female);
          setCountMale(response.data.data.male);
          setFlag(false);
        }
      } else console.log(error);
    });
    return () => {
      mounted = false;
    };
  }, []);
  /**
   * Function to render
   */
  const handleButton = () => {
    history.push(PATH_PATIENT);
  };
  const renderFunction = () => {
    if (flag) {
      return (
        <div className={classes.skeleton}>
          {/* Loading when the data is empty */}
          <Skeleton
            variant={SKELETON_VARIANT_RECT}
            className={classes.skeletonStyle}
          />
        </div>
      );
    } else {
      if (countMale === 0 && countFemale === 0)
        return (
          <React.Fragment>
            <Paper className={fixedHeightPaperEmpty}>
              <Typography
                className={classes.typography}
                color={PRIMARY_COLOR}
                gutterBottom
              >
                {DISTRIBUTION_BY_GENDER}
              </Typography>
              {ZERO_PATIENTS}
              <Button onClick={handleButton} color={PRIMARY_COLOR}>
                {CLICK_FOR_CREATE.toUpperCase()}
              </Button>
            </Paper>
          </React.Fragment>
        );
      else
        return (
          <React.Fragment>
            <Paper className={fixedHeightPaper}>
              {/* Title of  Pie */}
              <Typography
                className={classes.typography}
                color={PRIMARY_COLOR}
                gutterBottom
              >
                {DISTRIBUTION_BY_GENDER}
              </Typography>
              {/* Chart Pie */}
              <Pie className={classes.pie} data={data} width={60} height={20} />
            </Paper>
          </React.Fragment>
        );
    }
  };
  return <Fragment>{renderFunction()}</Fragment>;
}
