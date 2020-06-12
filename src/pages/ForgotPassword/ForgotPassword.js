import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import React, { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { axiosService } from '../../shared/services/services';
import { ENDPOINT_FORGOT_PASSWORD } from '../../shared/constants/endpoint';
import Alert from '@material-ui/lab/Alert';
import Copyright from '../../components/Copyright/Copyright';
import * as strings from '../../shared/strings/strings';
import * as constants from '../../shared/constants/constants';
import * as validations from '../../shared/constants/validation';
import { PATH_LOGIN } from '../../routes/path';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import { RESET_PASSWORD } from '../../shared/strings/strings';

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
      constants.POST,
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
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyRoundedIcon />
        </Avatar>
        <Typography variant="h5">{RESET_PASSWORD}</Typography>
        {/* Form */}
        {flag &&
          (success ? (
            <Alert severity="success" className={classes.alert}>
              {strings.EMAIL_SUCCESS}
            </Alert>
          ) : (
            <Alert severity="error" className={classes.alert}>
              {strings.EMAIL_FAILED}
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
                variant={constants.OUTLINED}
                required
                fullWidth
                label={strings.EMAIL}
                value={email}
                onChange={handleEmail}
                validators={[
                  validations.RULES_NAME_REQUIRED,
                  validations.RULES_NAME_IS_EMAIL,
                ]}
                errorMessages={[
                  validations.MESSAGE_VALIDATORS_REQUIRED,
                  validations.MESSAGE_VALIDATORS_EMAIL,
                ]}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={disabled}
            variant={constants.CONTAINED}
            color={constants.PRIMARY_COLOR}
            className={classes.submit}
          >
            {disabled && (
              <CircularProgress
                size={15}
                className={classes.circularProgress}
              />
            )}
            {strings.VALIDATE}
          </Button>
          <Grid container className={classes.gridContainer}>
            <Grid item>
              <Link href={PATH_LOGIN} variant={constants.VARAINT_BODY_TWO}>
                {strings.BACK_TO_LOGIN_INTERFACE}
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
