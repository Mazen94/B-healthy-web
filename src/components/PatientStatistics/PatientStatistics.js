import React, { useState, useEffect, Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import {
  GET,
  PATIENT_STATISTICS_LABELS,
  PATIENT_STATISTICS_BACKGROUNDCOLOR,
} from '../../shared/constants/constants';
import { DISTRIBUTION_BY_AGE_GROUB } from '../../shared/strings/strings';
import { axiosService } from '../../shared/services/services';
import { STATISTICS_AGE } from '../../shared/constants/endpoint';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import { useStyles } from './styles';

export default function PatientStatistics() {
  const classes = useStyles(); //add styles to variable classes
  const [group, setGroup] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    let mounted = true;
    axiosService(STATISTICS_AGE, GET, true, null, (error, response) => {
      if (response) {
        if (mounted) {
          setGroup(response.data.countGender);
          setFlag(false);
        }
      } else console.log(error);
    });

    return () => {
      mounted = false;
    };
  }, []);
  const data = {
    labels: PATIENT_STATISTICS_LABELS,
    datasets: [
      {
        data: [
          0,
          group['[10-15]'],
          group['[16-20]'],
          group['[21-25]'],
          group['[26-30]'],
          group['[31-35]'],
          group['[36-40]'],
          group['[41-45]'],
          group['[46-50]'],
          group['[51-55]'],
          group['[56-60]'],
        ],
        backgroundColor: PATIENT_STATISTICS_BACKGROUNDCOLOR,
      },
    ],
  };
  console.log('aaaaaaaaa', data);
  /**
   * Function to render
   */
  const renderFunction = () => {
    if (flag) {
      return (
        <div className={classes.skeleton}>
          {/* Loading when the data is empty */}
          <Skeleton variant="rect" width="100%" height="32vh" />
        </div>
      );
    } else
      return (
        <React.Fragment>
          <Paper className={classes.paper}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
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
  };
  return <Fragment>{renderFunction()}</Fragment>;
}
