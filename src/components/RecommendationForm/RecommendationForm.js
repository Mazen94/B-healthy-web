import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import {
  PRIMARY_COLOR,
  POST,
  OUTLINED,
  CONTAINED,
  GRAM,
} from '../../shared/constants/constants';
import {
  MESSAGE_VALIDATORS_REQUIRED,
  RULES_NAME_REQUIRED,
} from '../../shared/constants/validation';
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

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAvoid = (e) => {
    setAvoid(e.target.value);
  };

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
              `${PATH_PATIENT}/${params.id}${PATH_RECOMMENDATION}/${response.data.data.id}`
            );
          setOpenSnackbar(true);
        }
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

      <ValidatorForm onSubmit={onSubmitForm} noValidate>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={12} sm={6}>
            <TextValidator
              className={classes.textValidator}
              label={NAME}
              variant={OUTLINED}
              required
              fullWidth
              onChange={handleName}
              value={name}
              autoFocus
              validators={[RULES_NAME_REQUIRED]}
              errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
              endadornment={
                <InputAdornment position="end">{GRAM}</InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator
              className={classes.textValidator}
              label={AVOID}
              fullWidth
              onChange={handleAvoid}
              value={avoid}
              multiline
              rows="4"
              variant={OUTLINED}
              validators={[RULES_NAME_REQUIRED]}
              errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
              endadornment={
                <InputAdornment position="end">{GRAM}</InputAdornment>
              }
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant={CONTAINED}
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
