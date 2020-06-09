import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as constants from '../../shared/constants/constants';
import { axiosService } from '../../shared/services/services';
import { ENDPOINT_PATIENTS } from '../../shared/constants/endpoint';
import { PATIENT } from '../../shared/strings/strings';
import { useStyles } from './styles';

export default function CardPatient() {
  const classes = useStyles();
  const [patient, setPatient] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    axiosService(
      `${ENDPOINT_PATIENTS}${id}`,
      constants.GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) setPatient(response.data.data);
        } else console.log(error);
      }
    );
    return () => {
      mounted = false;
    };
  }, [id]);
  if (patient.length === 0) {
    return (
      <Fragment>
        <Skeleton
          variant={constants.SKELETON_VARIANT_TEXT}
          className={classes.skeletonText}
        />
        <Skeleton
          variant={constants.SKELETON_VARIANT_CIRCLE}
          className={classes.skeletonCircle}
        />
        <Skeleton
          variant={constants.SKELETON_VARIANT_RECT}
          className={classes.skeletonRec}
        />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Grid className={classes.gridFiche}>
        <Paper className={classes.patientPaper}>
          <Typography
            variant={constants.VARAINT_SUBTITLE_ONE}
            gutterBottom
            className={classes.patientTypography}
          >
            {PATIENT}
          </Typography>
          <img
            src={constants.PATH_IMAGES_PAITENTS + patient.photo}
            className={classes.large}
            alt={patient.firstName}
          />
          <Grid className={classes.grid}>
            <Typography
              variant={constants.VARAINT_SUBTITLE_TWO}
              gutterBottom
              className={classes.typography}
            >
              {patient.firstName} {patient.lastName}
            </Typography>
            <Typography
              variant={constants.VARAINT_SUBTITLE_TWO}
              gutterBottom
              className={classes.typography}
            >
              {patient.email}
            </Typography>
            <Typography
              variant={constants.VARAINT_SUBTITLE_TWO}
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
