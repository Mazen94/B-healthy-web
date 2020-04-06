import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  GET,
  PATIENT_STATISTICS_LABELS,
  PATIENT_STATISTICS_BACKGROUNDCOLOR,
} from '../../shared/constants/constants';
import { DISTRIBUTION_BY_AGE_GROUB } from '../../shared/strings/strings';
import { axiosService } from '../../shared/services/services';
import { STATISTICS_AGE } from '../../shared/constants/endpoint';
import { headers } from '../../shared/constants/env';

const useStyles = makeStyles((theme) => ({
  typography: {
    margin: 'auto',
  },
  bar: {
    padding: 'auto',
  },
}));
export default function PatientStatistics() {
  const classes = useStyles(); //add styles to variable classes
  const [group, setGroup] = useState([]);
  useEffect(() => {
    let mounted = true;
    const getPatientByAgeRange = async () => {
      const res = await axiosService(STATISTICS_AGE, GET, headers);
      if (mounted && res.status === 200) setGroup(res.data.countGender);
    };
    getPatientByAgeRange();
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
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
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
    </React.Fragment>
  );
}
