import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import healthy from '../../api/healthy'; //new instance of axios with a custom config
import people from '../../assets/people.png';

const useStyles = makeStyles(theme => ({
  gridFiche: {
    height: 'auto'
  },
  large: {
    marginTop: '4%',
    width: theme.spacing(20),
    height: theme.spacing(20)
  },
  typography: {
    marginTop: '20%',
    marginLeft: '4%',
    margin: 'auto',
    color: 'white'
  },

  grid: {
    display: 'flex',
    overflow: 'hidden'
  },
  patientPaper: {
    backgroundColor: 'rgb(63, 81, 181)',
    marginRight: 15,
    height: 'auto',
    paddingBottom: '14%'
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
        console.log(error.response);
      }
    };
    //call function
    loadPatientById();
  }, [id]);
  if (patient.length === 0) {
    return (
      <Fragment>
        <Skeleton variant="text" height="20%" width="99%" />
        <Skeleton
          variant="circle"
          mx="auto"
          width={90}
          height={90}
          className={classes.skeleton}
        />
        <Skeleton variant="rect" width="99%" height="60%" />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Grid className={classes.gridFiche}>
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
      </Grid>
    </Fragment>
  );
}
