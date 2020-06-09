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
import {
  LOGIN,
  FORGOT_PASSWORD,
  DONT_HAVE_ACCOUNT,
} from '../../shared/strings/strings';
import { POST } from '../../shared/constants/constants';
import {
  MESSAGE_VALIDATORS_REQUIRED,
  MESSAGE_VALIDATORS_EMAIL,
} from '../../shared/constants/validation';
import {
  PATH_REGISTER,
  PATH_DASHBOARD,
  PATH_RESET_PASSWORD,
} from '../../routes/path';
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
  /**
   * arrow function to get the email entered by the user
   * @param {event} e
   */
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setFlag(false);
  };
  /**
   * arrow function to get the password entered by the user
   * @param {event} e
   */
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
    axiosService(ENDPOINT_LOGIN, POST, false, user, (error, response) => {
      if (response) {
        setDisabled(false);
        localStorage.setItem('token', response.data.token);
        history.push(PATH_DASHBOARD);
      } else {
        setFlag(true);
        setDisabled(false);
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {LOGIN}
          </Typography>
          {/* Alert when the user gives false data  */}
          {flag && (
            <Alert severity="error">Email ou mot de passe invalide</Alert>
          )}
          {/* Form */}
          <ValidatorForm onSubmit={onSubmitForm} className={classes.form}>
            <TextValidator
              label="Adresse e-mail"
              name="email"
              autoFocus
              onChange={handleEmail}
              value={email}
              validators={['required', 'isEmail']}
              errorMessages={[
                MESSAGE_VALIDATORS_REQUIRED,
                MESSAGE_VALIDATORS_EMAIL,
              ]}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextValidator
              variant="outlined"
              margin="normal"
              name="password"
              label="Mot de passe"
              type="password"
              autoComplete="current-password"
              onChange={handlePassword}
              value={password}
              validators={['required']}
              errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
              fullWidth
            />

            <Button
              disabled={disabled}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {disabled && (
                <CircularProgress
                  size={15}
                  className={classes.circularProgress}
                />
              )}
              {LOGIN}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={PATH_RESET_PASSWORD} variant="body2">
                  {FORGOT_PASSWORD}
                </Link>
              </Grid>
              <Grid item>
                <Link href={PATH_REGISTER} variant="body2">
                  {DONT_HAVE_ACCOUNT}
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
