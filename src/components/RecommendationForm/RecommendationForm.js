import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import {
  MESSAGE_VALIDATORS_REQUIRED,
  PRIMARY_COLOR,
  POST,
} from '../../shared/constants/constants';
import { axiosService } from '../../shared/services/services';
import { AVOID, NAME, VALIDATE } from '../../shared/strings/strings';
import AlertComponent from '../AlertComponent/AlertComponent';
import { useStyles } from './styles';
import { useHistory, useParams } from 'react-router-dom';
import { PATH_PATIENT, PATH_RECOMMENDATION } from '../../routes/path';

const RecommendationForm = (props) => {
  const classes = useStyles(); //add styles to variable classes
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [avoid, setAvoid] = useState(''); // to retrieve the avoid entered by the user (initial value empty string)
  const [openSnackbar, setOpenSnackbar] = useState(false); //state used to open and close the alert
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const params = useParams(); //get params from url

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
    if (props.data.length !== 0) {
      setName(props.data.name);
      setAvoid(props.data.avoid);
    }
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
    axiosService(
      props.endPoint,
      props.method,
      true,
      recommendation,
      (error, response) => {
        if (response) {
          if (props.method === POST)
            history.push(
              `${PATH_PATIENT}/${params.id}${PATH_RECOMMENDATION}/${response.data.recommendation.id}`
            );
          setOpenSnackbar(true);
        } else console.log('error to modifie a recommendation', error);
      }
    );
  };

  return (
    <div>
      {/*Alert */}
      <AlertComponent
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        message={props.message}
      />
      {/* From */}

      <ValidatorForm
        onSubmit={onSubmitForm}
        className={classes.formValidator}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextValidator
              className={classes.textValidator}
              label={NAME}
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
              label={AVOID}
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
          {VALIDATE}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default RecommendationForm;
