import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  PATIENT_STATISTICS_LABELS,
  PATIENT_STATISTICS_BACKGROUNDCOLOR
} from '../../constants/constants';
import healthy from '../../api/healthy';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  typography: {
    margin: 'auto'
  },
  bar: {
    padding: 'auto'
  }
}));
export default function PatientStatistics() {
  const classes = useStyles(); //add styles to variable classes
  const [group, setGroup] = useState([]);
  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();
    const getPatientByAgeRange = async () => {
      const authStr = `Bearer ${localStorage.getItem('token')}`;
      const response = await healthy.get(
        `statistics/age`,
        {
          headers: { Authorization: authStr }
        },
        {
          cancelToken: source.token
        }
      );

      if (mounted) setGroup(response.data.countGender);
    };
    getPatientByAgeRange();
    return () => {
      //cancel the request
      mounted = false;
      source.cancel();
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
          group['[56-60]']
        ],
        backgroundColor: PATIENT_STATISTICS_BACKGROUNDCOLOR
      }
    ]
  };
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Répartition des patients par tranche d’âge
      </Typography>

      <div className={classes.bar}>
        <Bar
          data={data}
          width={80}
          height={20}
          options={{
            legend: {
              display: false
            }
          }}
        />
      </div>
    </React.Fragment>
  );
}
