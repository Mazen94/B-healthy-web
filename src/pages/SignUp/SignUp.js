import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState, useEffect } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import { axiosService } from '../../shared/services/services';
import { ENDPOINT_REGISTER } from '../../shared/constants/endpoint';
import Alert from '@material-ui/lab/Alert';
import Copyright from '../../components/Copyright/Copyright';
import {
  EMAIL_EXISTS,
  REGISTER,
  HAVE_AN_ACCOUNT,
  EMAIL,
  LAST_NAME,
  FIRST_NAME,
} from '../../shared/strings/strings';
import {
  POST,
  MESSAGE_VALIDATORS_PASSWORD,
  MESSAGE_VALIDATORS_REQUIRED,
  MESSAGE_VALIDATORS_EMAIL,
  PRIMARY_COLOR,
} from '../../shared/constants/constants';
import { PATH_LOGIN, PATH_DASHBOARD } from '../../routes/path';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import { PASSWORD } from '../../shared/strings/strings';
import { lenghOfPassword } from '../../shared/services/services';

export default function SignUp() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    lenghOfPassword();
  });
  /**
   * arrow function to get the email entered by the user
   * @param {event} e
   */
  const handleEmail = (e) => {
    setFlag(false);
    setEmail(e.target.value);
  };
  /**
   * arrow function to get the firstName entered by the user
   * @param {event} e
   */
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  /**
   * arrow function to get the lastName entered by the user
   * @param {event} e
   */
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  /**
   * arrow function to get the password entered by the user
   * @param {event} e
   */
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  /**
   * arrow function to retrieve the final inputs
   * and call the funtion postRegisterLogin to send the data to the DB
   */
  const onSubmitValidatorForm = (e) => {
    e.preventDefault();
    const userRegister = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    axiosService(
      ENDPOINT_REGISTER,
      POST,
      false,
      userRegister,
      (error, response) => {
        if (response) {
          localStorage.setItem('token', response.data.token);
          history.push(PATH_DASHBOARD);
        } else setFlag(true);
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {REGISTER}
        </Typography>
        {/* Form */}
        {flag && <Alert severity="error">{EMAIL_EXISTS}</Alert>}
        <ValidatorForm
          onSubmit={onSubmitValidatorForm}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                label={FIRST_NAME}
                autoFocus
                value={firstName}
                onChange={handleFirstName}
                validators={['required']}
                errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                label={LAST_NAME}
                value={lastName}
                onChange={handleLastName}
                validators={['required']}
                errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
              />
            </Grid>
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
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                required
                fullWidth
                label={PASSWORD}
                value={password}
                type="password"
                onChange={handlePassword}
                validators={['lenghPassword', 'required']}
                errorMessages={[
                  MESSAGE_VALIDATORS_PASSWORD,
                  MESSAGE_VALIDATORS_REQUIRED,
                ]}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={PRIMARY_COLOR}
            className={classes.submit}
          >
            {REGISTER}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href={PATH_LOGIN} variant="body2">
                {HAVE_AN_ACCOUNT}
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
