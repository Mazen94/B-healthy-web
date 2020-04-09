import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useParams } from 'react-router-dom';
import {
  MESSAGE_VALIDATORS_REQUIRED,
  PRIMARY_COLOR,
  PUT,
} from '../../shared/constants/constants';
import {
  ENDPOINT_PATIENTS,
  ENDPOINT_RECOMMENDATIONS,
} from '../../shared/constants/endpoint';
import { axiosService } from '../../shared/services/services';
import { EDIT } from '../../shared/strings/strings';
import AlertComponent from '../AlertComponent/AlertComponent';
import { useStyles } from './styles';

const ModificationRecommendation = (props) => {
  const classes = useStyles(); //add styles to variable classes
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [avoid, setAvoid] = useState(''); // to retrieve the avoid entered by the user (initial value empty string)
  const params = useParams(); //to get params from the url
  const [openSnackbar, setOpenSnackbar] = useState(false); //state used to open and close the alert

  /**
   * To close the alert
   * @param {event} event
   * @param {string} reason
   */
  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };
  /**
   * get the name and avoid from the props
   */
  useEffect(() => {
    setName(props.name);
    setAvoid(props.avoid);
  }, [props]);
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
   * and call the funtion updateRecommendation to send the data to the DB
   * @param {event} e
   */
  const onSubmitForm = (e) => {
    e.preventDefault();

    const recommendation = {
      name: name,
      avoid: avoid,
    };
    updateRecommendation(recommendation);
  };
  /**
   * Send data to db ( update method)
   * @param {object} recommendation
   */
  const updateRecommendation = (recommendation) => {
    axiosService(
      `${ENDPOINT_PATIENTS}${params.id}/${ENDPOINT_RECOMMENDATIONS}${params.idRecommendation}`,
      PUT,
      true,
      recommendation,
      (error, response) => {
        if (response) setOpenSnackbar(true);
        else console.log('error to modifie a recommendation', error);
      }
    );
  };
  return (
    <div>
      <AlertComponent
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
      />
      {/* From */}
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
                onChange={handleName}
                value={name}
                autoFocus
                validators={['required']}
                errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                endadornment={<InputAdornment position="end">g</InputAdornment>}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                className={classes.textValidator}
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                onChange={handleAvoid}
                value={avoid}
                validators={['required']}
                errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                endadornment={<InputAdornment position="end">g</InputAdornment>}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color={PRIMARY_COLOR}
            className={classes.submit}
          >
            {EDIT}
          </Button>
        </ValidatorForm>
      </Paper>
    </div>
  );
};

export default ModificationRecommendation;
