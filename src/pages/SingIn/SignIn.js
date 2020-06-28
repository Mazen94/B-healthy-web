import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import Copyright from '../../components/Copyright/Copyright';
import { axiosService } from '../../shared/services/services';
import { ENDPOINT_LOGIN } from '../../shared/constants/endpoint';
import * as strings from '../../shared/strings/strings';
import * as constants from '../../shared/constants/constants';
import * as validations from '../../shared/constants/validation';
import * as paths from '../../routes/path';
import { useStyles } from './styles';
import { CircularProgress } from '@material-ui/core';

export default function SignIn() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  /**
   * The states used in this component
   * email : to retrieve the email entered by the user (initial value empty string)
   * password : to retrieve the password entered by the user (initial value empty string)
   * flag : state to generate an alert in case of invalid email or password (initial value false)
   */
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [flag, setFlag] = useState(false);
  const [password, setPassword] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setFlag(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setFlag(false);
  };

  /**
   * arrow function to retrieve the final inputs
   * and call the funtion postLogin to send the data to the DB
   */
  const onSubmitForm = (e) => {
    setDisabled(true);
    e.preventDefault();
    const user = { email: email, password: password };
    axiosService(
      ENDPOINT_LOGIN,
      constants.POST,
      false,
      user,
      (error, response) => {
        if (response) {
          setDisabled(false);
          console.log(response.data.data);
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('status', response.data.data.status);
          if (response.data.data.status === 0)
            history.push(paths.PATH_NOT_ACTIVATE);
          else history.push(paths.PATH_DASHBOARD);

          //
          //history.push(paths.PATH_DASHBOARD);
        } else {
          setFlag(true);
          setDisabled(false);
        }
      }
    );
  };

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">{strings.LOGIN}</Typography>
          {/* Alert when the user gives false data  */}
          {flag && (
            <Alert severity="error">{strings.EMAIL_PASSWORD_FAILED}</Alert>
          )}
          {/* Form */}
          <ValidatorForm onSubmit={onSubmitForm} className={classes.form}>
            <TextValidator
              label={strings.EMAIL}
              autoFocus
              autoComplete="email"
              onChange={handleEmail}
              value={email}
              validators={[
                validations.RULES_NAME_REQUIRED,
                validations.RULES_NAME_IS_EMAIL,
              ]}
              errorMessages={[
                validations.MESSAGE_VALIDATORS_REQUIRED,
                validations.MESSAGE_VALIDATORS_EMAIL,
              ]}
              fullWidth
              variant={constants.OUTLINED}
              margin="normal"
            />
            <TextValidator
              variant={constants.OUTLINED}
              label={strings.PASSWORD}
              type="password"
              onChange={handlePassword}
              value={password}
              validators={[validations.RULES_NAME_REQUIRED]}
              errorMessages={[validations.MESSAGE_VALIDATORS_REQUIRED]}
              fullWidth
            />

            <Button
              disabled={disabled}
              type="submit"
              fullWidth
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
              {strings.LOGIN}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href={paths.PATH_RESET_PASSWORD}
                  variant={constants.VARAINT_BODY_TWO}
                >
                  {strings.FORGOT_PASSWORD}
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href={paths.PATH_REGISTER}
                  variant={constants.VARAINT_BODY_TWO}
                >
                  {strings.DONT_HAVE_ACCOUNT}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </ValidatorForm>
        </div>
      </Grid>
    </Grid>
  );
}
