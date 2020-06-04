import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import React, { useState, useEffect } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import { axiosService } from '../../shared/services/services';
import { ENDPOINT_FORGOT_PASSWORD } from '../../shared/constants/endpoint';
import Alert from '@material-ui/lab/Alert';
import Copyright from '../../components/Copyright/Copyright';
import {
  EMAIL_SUCCESS,
  BACK_TO_LOGIN_INTERFACE,
  EMAIL,
  VALIDATE,
  EMAIL_FAILED,
} from '../../shared/strings/strings';
import {
  POST,
  MESSAGE_VALIDATORS_REQUIRED,
  MESSAGE_VALIDATORS_EMAIL,
  PRIMARY_COLOR,
} from '../../shared/constants/constants';
import { PATH_LOGIN, PATH_DASHBOARD } from '../../routes/path';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import { RESET_PASSWORD } from '../../shared/strings/strings';
import { lenghOfPassword } from '../../shared/services/services';
import { Link, CircularProgress } from '@material-ui/core';

export default function SignUp() {
  const classes = useStyles(); //add styles to variable classes
  const [email, setEmail] = useState('');
  const [flag, setFlag] = useState(false);
  const [success, setSuccess] = useState(true);
  const [disabled, setDisabled] = useState(false);

  /**
   * arrow function to get the email entered by the user
   * @param {event} e
   */
  const handleEmail = (e) => {
    setFlag(false);
    setEmail(e.target.value);
  };

  /**
   * arrow function to retrieve the final inputs
   * and call the funtion postRegisterLogin to send the data to the DB
   */
  const onSubmitValidatorForm = (e) => {
    setDisabled(true);
    axiosService(
      ENDPOINT_FORGOT_PASSWORD,
      POST,
      false,
      { email },
      (error, response) => {
        if (response) {
          setDisabled(false);
          setFlag(true);
          setSuccess(true);
        } else {
          setDisabled(false);
          setFlag(true);
          setSuccess(false);
        }
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {RESET_PASSWORD}
        </Typography>
        {/* Form */}
        {flag &&
          (success ? (
            <Alert severity="success" className={classes.alert}>
              {EMAIL_SUCCESS}
            </Alert>
          ) : (
            <Alert severity="error" className={classes.alert}>
              {EMAIL_FAILED}
            </Alert>
          ))}
        <ValidatorForm
          onSubmit={onSubmitValidatorForm}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                label={EMAIL}
                value={email}
                onChange={handleEmail}
                validators={['required', 'isEmail']}
                errorMessages={[
                  MESSAGE_VALIDATORS_REQUIRED,
                  MESSAGE_VALIDATORS_EMAIL,
                ]}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={disabled}
            variant="contained"
            color={PRIMARY_COLOR}
            className={classes.submit}
          >
            {disabled && (
              <CircularProgress
                size={15}
                className={classes.circularProgress}
              />
            )}
            {VALIDATE}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href={PATH_LOGIN} variant="body2">
                {BACK_TO_LOGIN_INTERFACE}
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
