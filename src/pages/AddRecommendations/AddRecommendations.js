import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useStyles } from './styles';
import React, { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory, useParams } from 'react-router-dom';
import { axiosService } from '../../shared/services/services';
import { headers } from '../../shared/constants/env';
import {
  ENDPOINT_PATIENTS,
  ENDPOINT_RECOMMENDATIONS,
} from '../../shared/constants/endpoint';
import MenuBar from '../../components/MenuBar/MenuBar';
import NavBar from '../../components/NavBar/NavBar';
import StepperHorizontal from '../../components/StepperHorizontal/StepperHorizontal';
import {
  POST,
  PRIMARY_COLOR,
  MESSAGE_VALIDATORS_REQUIRED,
} from '../../shared/constants/constants';
import {
  ADDRECOMMENDATION_STEPPER_CREATION,
  RECOMMENDATION_STEPPER_ADD,
  NAME,
  AVOID,
  VALIDATE,
  PATIENT,
} from '../../shared/strings/strings';
import { PATH_PATIENT, PATH_RECOMMENDATION } from '../../routes/path';

export default function AddRecommendations() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const params = useParams(); //get params from url
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [avoid, setAvoid] = useState(''); // to retrieve the avoid entered by the user (initial value empty string)
  const step = 0; //const to specify in which stage we are ( in component StepperHorizontal)
  /**
   * arrow function to get the name entered by the user
   * @param {event} e
   */
  const handleName = (e) => {
    setName(e.target.value);
  };
  /**
   * arrow function to get the name entered by the user
   * @param {event} e
   */
  const handleAvoid = (e) => {
    setAvoid(e.target.value);
  };

  /**
   * arrow function to retrieve the final inputs
   * and call the funtion addRecommendation to send the data to the DB
   * @param {event} e
   */
  const onSubmitForm = (e) => {
    e.preventDefault();

    const recommendation = {
      name: name,
      avoid: avoid,
    };
    console.log(recommendation);
    addRecommendation(recommendation);
  };
  /**
   * Function to send the data to DB (using axios and async await)
   * @param {Object} recommendation
   */
  const addRecommendation = async (recommendation) => {
    axiosService(
      `${ENDPOINT_PATIENTS}${params.id}/${ENDPOINT_RECOMMENDATIONS}`,
      POST,
      headers,
      recommendation,
      (error, response) => {
        if (response)
          history.push(
            `${PATH_PATIENT}/${params.id}${PATH_RECOMMENDATION}/${response.data.recommendation.id}`
          );
        else console.log('error to add a recommendations', error);
      }
    );
  };
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <MenuBar title={PATIENT} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <NavBar recommendation="contained"></NavBar>

          <Grid container spacing={4} className={classes.gridContainer}>
            {/* StepperHorizontal component */}
            <StepperHorizontal
              creation={ADDRECOMMENDATION_STEPPER_CREATION}
              add={RECOMMENDATION_STEPPER_ADD}
              stepProps={step}
            />
            <Grid container spacing={1}>
              {/* Component Menu */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <ValidatorForm
                    onSubmit={onSubmitForm}
                    className={classes.formValidator}
                    noValidate
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextValidator
                          className={classes.textValidator}
                          autoComplete="fname"
                          name="name"
                          variant="outlined"
                          required
                          fullWidth
                          id="name"
                          onChange={handleName}
                          value={name}
                          label={NAME}
                          autoFocus
                          validators={['required']}
                          errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                          endadornment={
                            <InputAdornment position="end">g</InputAdornment>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextValidator
                          className={classes.textValidator}
                          autoComplete="fname"
                          name="name"
                          variant="outlined"
                          required
                          fullWidth
                          id="name"
                          rows="4"
                          onChange={handleAvoid}
                          value={avoid}
                          label={AVOID}
                          validators={['required']}
                          errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                          endadornment={
                            <InputAdornment position="end">g</InputAdornment>
                          }
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      variant="contained"
                      color={PRIMARY_COLOR}
                      className={classes.submit}
                    >
                      {VALIDATE}
                    </Button>
                  </ValidatorForm>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    </div>
  );
}
