import { Paper } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useParams } from 'react-router-dom';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import RecommendationForm from '../../components/RecommendationForm/RecommendationForm';
import StepperHorizontal from '../../components/StepperHorizontal/StepperHorizontal';
import { POST } from '../../shared/constants/constants';
import {
  ENDPOINT_PATIENTS,
  ENDPOINT_RECOMMENDATIONS,
} from '../../shared/constants/endpoint';
import {
  ADDRECOMMENDATION_STEPPER_CREATION,
  ADD_RECOMMENDATION,
  PATIENT,
  RECOMMENDATION_STEPPER_ADD,
} from '../../shared/strings/strings';
import { useStyles } from './styles';

export default function AddRecommendations() {
  const classes = useStyles(); //add styles to variable classes
  const params = useParams(); //get params from url
  const step = 0; //const to specify in which stage we are ( in component StepperHorizontal)

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        {/* MenuBar Component */}
        <MenuBar title={PATIENT} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {/* NavBar  Component */}
          <NavBar recommendation="contained"></NavBar>

          <Grid container spacing={4} className={classes.gridContainer}>
            {/* StepperHorizontal component */}
            <StepperHorizontal
              creation={ADDRECOMMENDATION_STEPPER_CREATION}
              add={RECOMMENDATION_STEPPER_ADD}
              stepProps={step}
            />
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  {/* RecommendationForm component */}
                  <RecommendationForm
                    data={[]}
                    endPoint={`${ENDPOINT_PATIENTS}${params.id}/${ENDPOINT_RECOMMENDATIONS}`}
                    method={POST}
                    message={ADD_RECOMMENDATION}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    </div>
  );
}
