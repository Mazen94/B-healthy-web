import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';
import people from '../../assets/people.png';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import healthy from '../../api/healthy'; //new instance of axios with a custom config
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  large: {
    marginTop: 18,
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  typography: {
    marginTop: '10%',
    marginRight: '6%',
    color: 'white',
    margin: 'auto'
  },
  grid: {
    display: 'flex'
  },
  patientPaper: {
    backgroundColor: 'rgb(63, 81, 181)',
    marginRight: 15,
    height: '100%',
    marginBottom: 45
  },
  patientTypography: {
    paddingTop: 12,
    color: 'white',

    'font-size': '16px'
  },
  skeleton: {
    margin: 'auto'
  }
}));

export default function CardPatient() {
  const classes = useStyles();
  const [patient, setPatient] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    /**
     * Arrow function to get the data (patients) using Async await
     */
    const loadPatientById = async () => {
      try {
        const authStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
        const response = await healthy.get(`patients/` + id, {
          headers: { Authorization: authStr }
        });

        setPatient(response.data.patient); //add the received data to the state data
      } catch (error) {
        console.log(error.response.data);
      }
    };
    //call function
    loadPatientById();
  }, [id]);
  if (patient.length === 0) {
    return (
      <Fragment>
        <Skeleton variant="text" />
        <Skeleton
          variant="circle"
          mx="auto"
          width={90}
          height={90}
          className={classes.skeleton}
        />
        <Skeleton variant="rect" width="100%" height={300} />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Paper className={classes.patientPaper}>
        <Typography
          variant="subtitle1"
          gutterBottom
          className={classes.patientTypography}
        >
          Patient
        </Typography>
        <img src={people} className={classes.large} alt="Logo" />
        <Grid className={classes.grid}>
          <Typography
            variant="subtitle2"
            gutterBottom
            className={classes.typography}
          >
            {patient.firstName} {patient.lastName}
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            className={classes.typography}
          >
            {patient.email}
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            className={classes.typography}
          >
            {patient.numberPhone}
          </Typography>
        </Grid>
      </Paper>
    </Fragment>
  );
}
