import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import { axiosService } from '../../shared/services/services';
import { ENDPOINT_REGISTER } from '../../shared/constants/endpoint';
import Copyright from '../../components/Copyright/Copyright';
import { REGISTER, HAVE_AN_ACCOUNT } from '../../shared/strings/strings';
import {
  POST,
  MESSAGE_VALIDATORS_REQUIRED,
  MESSAGE_VALIDATORS_EMAIL,
} from '../../shared/constants/constants';
import { PATH_LOGIN, PATH_DASHBOARD } from '../../routes/path';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

export default function SignUp() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  /**
   * The states used in this component
   * email : to retrieve the email entered by the user (initial value empty string)
   * password : to retrieve the password entered by the user (initial value empty string)
   * firstName : to retrieve the firstName entered by the user (initial value empty string)
   * lastName : to retrieve the lastName entered by the user (initial value empty string)
   */
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  /**
   * arrow function to get the email entered by the user
   * @param {event} e
   */
  const handleEmail = (e) => {
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
      null,
      userRegister,
      (error, response) => {
        if (response) {
          localStorage.setItem('token', response.data.token);
          history.push(PATH_DASHBOARD);
        } else console.log(error.response.data);
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
        <ValidatorForm
          onSubmit={onSubmitValidatorForm}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextValidator
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Prénom"
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
                id="lastName"
                label="Nom de famille"
                name="lastName"
                autoComplete="lname"
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
                id="email"
                label="Adresse e-mail"
                name="email"
                autoComplete="email"
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
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
                validators={['required']}
                errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
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
