import React, { useState, useEffect, Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import {
  GET,
  PATIENT_STATISTICS_BACKGROUNDCOLOR,
  PRIMARY_COLOR,
  SKELETON_VARIANT_RECT,
} from '../../shared/constants/constants';
import {
  DISTRIBUTION_BY_AGE_GROUB,
  ZERO_PATIENTS,
  CLICK_FOR_CREATE,
} from '../../shared/strings/strings';
import { axiosService } from '../../shared/services/services';
import { STATISTICS_AGE } from '../../shared/constants/endpoint';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import { useStyles } from './styles';
import { PATH_PATIENT } from '../../routes/path';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function PatientStatistics() {
  const classes = useStyles(); //add styles to variable classes
  const [group, setGroup] = useState([]);
  const [labels, setLabels] = useState([]);
  const [flag, setFlag] = useState(true);
  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    axiosService(STATISTICS_AGE, GET, true, null, (error, response) => {
      if (response) {
        if (mounted) {
          let groupData = Object.values(response.data.data); //return values of object in array
          let key = Object.keys(response.data.data); // return keys of object in array
          setLabels(key);
          console.log(key);
          setGroup(groupData);
          setFlag(false);
        }
      } else console.log(error);
    });

    return () => {
      mounted = false;
    };
  }, []);
  const data = {
    labels: ['', ...labels, ''],
    datasets: [
      {
        data: [0, ...group, 0],
        backgroundColor: PATIENT_STATISTICS_BACKGROUNDCOLOR,
      },
    ],
  };
  const handleButton = () => {
    history.push(PATH_PATIENT);
  };
  /**
   * Function to render
   */
  const renderFunction = () => {
    if (flag) {
      return (
        <div className={classes.skeleton}>
          {/* Loading when the data is empty */}
          <Skeleton
            variant={SKELETON_VARIANT_RECT}
            className={classes.skeletonRect}
          />
        </div>
      );
    } else {
      if (group.length === 0) {
        return (
          <React.Fragment>
            <Paper className={classes.paper}>
              <Typography color={PRIMARY_COLOR} gutterBottom>
                {DISTRIBUTION_BY_AGE_GROUB}
              </Typography>

              {ZERO_PATIENTS}
              <Button onClick={handleButton} color={PRIMARY_COLOR}>
                {CLICK_FOR_CREATE.toUpperCase()}
              </Button>
            </Paper>
          </React.Fragment>
        );
      } else
        return (
          <React.Fragment>
            <Paper className={classes.paper}>
              <Typography color={PRIMARY_COLOR} gutterBottom>
                {DISTRIBUTION_BY_AGE_GROUB}
              </Typography>

              <div className={classes.bar}>
                <Bar
                  data={data}
                  width={80}
                  height={20}
                  options={{
                    legend: {
                      display: false,
                    },
                  }}
                />
              </div>
            </Paper>
          </React.Fragment>
        );
    }
  };
  return <Fragment>{renderFunction()}</Fragment>;
}
