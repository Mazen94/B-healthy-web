import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import MenuBar from '../../components/MenuBar/MenuBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { axiosService } from '../../shared/services/services';
import { ENDPOINT_PATIENTS } from '../../shared/constants/endpoint';
import { headers } from '../../shared/constants/env';
import {
  POST,
  MESSAGE_VALIDATORS_REQUIRED,
  MESSAGE_VALIDATORS_PASSWORD,
  MESSAGE_VALIDATORS_EMAIL,
  PRIMARY_COLOR,
} from '../../shared/constants/constants';
import {
  AGE,
  YEARS,
  ADD_PATIENT_TITLE,
  VALIDATE,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  PASSWORD,
  PHONE,
  PREFFESION,
  FEMALE,
  MALE,
} from '../../shared/strings/strings';
import { PATH_PATIENTS } from '../../routes/path';
import { useStyles } from './styles';

export default function AddPatient() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const [email, setEmail] = useState(''); //to retrieve the email entered by the user.
  const [gender, setGender] = useState('femme'); // to retrieve the gender entered by the user.
  const [flag, setFlag] = useState(false); //to display the loadings when the user validate the fields.
  const [erreurValidation, setErreurValidation] = useState(false); // when the user gives an email exists.
  const [proffesion, setProffesion] = useState(''); //to retrieve the proffesion entered by the user .
  const [firstName, setFirstName] = useState(''); //to retrieve the firstName entered by the user .
  const [numberPhone, setNumberPhone] = useState(''); //to retrieve the numberPhone entered by the user.
  const [lastName, setLastName] = useState(''); //to retrieve the lastName entered by the user.
  const [password, setPassword] = useState(''); //to retrieve the password entered by the user.
  const [age, setAge] = useState(''); //to retrieve the password entered by the user.
  /**
   * arrow function to return to the previous page
   */
  const handleArrowBack = () => {
    history.push(`${PATH_PATIENTS}/1`);
  };
  /**
   * arrow function to get the email entered by the user
   * @param {event} e
   */
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErreurValidation(false);
  };
  /**
   * arrow function to get the FirstName entered by the user
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
   * arrow function to get the NumberPhone entered by the user
   * @param {event} e
   */
  const handleNumberPhone = (e) => {
    setNumberPhone(e.target.value);
  };
  /**
   * arrow function to get the proffesion entered by the user
   * @param {event} e
   */
  const handleProffesion = (e) => {
    setProffesion(e.target.value);
  };
  /**
   * arrow function to get the age entered by the user
   * @param {event} e
   */
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  /**
   * arrow function to get the password entered by the user
   * @param {event} e
   */
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  /**
   * arrow function to get the gender entered by the user
   * @param {event} e
   */
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  /**
   * Validation : add custom rules (Password must contain at least 8 characters)
   */
  useEffect(() => {
    ValidatorForm.addValidationRule('lenghPassword', (value) => {
      if (value.length < 8) {
        return false;
      }
      return true;
    });
  }, []);
  /**
   * arrow function to retrieve the final inputs
   * and call the funtion addPatient to send the data to the DB
   */
  const onSubmitForm = (e) => {
    e.preventDefault();
    setFlag(true);
    const patient = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      numberPhone: numberPhone,
      password: password,
      profession: proffesion,
      age: age,
    };
    addPatient(patient);
  };
  /**
   * Function to send the data to DB (using axios and async await)
   * @param {Object} patient
   */
  const addPatient = async (patient) => {
    axiosService(
      ENDPOINT_PATIENTS,
      POST,
      headers,
      patient,
      (error, response) => {
        if (response) {
          console.log(response.data);
          setFlag(false);
          history.push(`${PATH_PATIENTS}/1`);
        } else {
          setFlag(false);
          setErreurValidation(true);
        }
      }
    );
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component MenuBar */}
      <MenuBar title={ADD_PATIENT_TITLE} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* Icon to go back */}
        <IconButton
          className={classes.iconButton}
          onClick={handleArrowBack}
          color={PRIMARY_COLOR}
        >
          <ArrowBackIcon />
        </IconButton>
        <Grid item md={10} component={Paper} className={classes.paper}>
          {/* Alert when the user gives email exist */}
          {erreurValidation && <Alert severity="error">Email existe</Alert>}
          {/* Form */}
          <ValidatorForm
            onSubmit={onSubmitForm}
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
                  onChange={handleFirstName}
                  value={firstName}
                  id="firstName"
                  label={FIRST_NAME}
                  autoFocus
                  validators={['required']}
                  errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleLastName}
                  value={lastName}
                  id="lastName"
                  label={LAST_NAME}
                  name="lastName"
                  autoComplete="lname"
                  validators={['required']}
                  errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  onChange={handleEmail}
                  value={email}
                  id="email"
                  label={EMAIL}
                  name="email"
                  autoComplete="email"
                  validators={['required', 'isEmail']}
                  errorMessages={[
                    MESSAGE_VALIDATORS_REQUIRED,
                    MESSAGE_VALIDATORS_EMAIL,
                  ]}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextValidator
                  autoComplete="nmbrePhone"
                  name="nmbrePhone"
                  variant="outlined"
                  fullWidth
                  onChange={handleNumberPhone}
                  value={numberPhone}
                  id="nmbrePhone"
                  label={PHONE}
                  validators={['required']}
                  errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  fullWidth
                  onChange={handleProffesion}
                  value={proffesion}
                  id="proffesion"
                  label={PREFFESION}
                  name="proffesion"
                  autoComplete="proffesion"
                  validators={['required']}
                  errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextValidator
                  variant="outlined"
                  fullWidth
                  onChange={handleAge}
                  value={age}
                  label={AGE}
                  name="age"
                  autoComplete="age"
                  validators={['required']}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">{YEARS}</InputAdornment>
                    ),
                  }}
                  errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label={PASSWORD}
                  type="password"
                  id="password"
                  onChange={handlePassword}
                  value={password}
                  autoComplete="current-password"
                  validators={['lenghPassword', 'required']}
                  errorMessages={[
                    MESSAGE_VALIDATORS_PASSWORD,
                    MESSAGE_VALIDATORS_REQUIRED,
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={gender}
                    onChange={handleGender}
                    className={classes.radioGroup}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio color={PRIMARY_COLOR} />}
                      label={FEMALE}
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio color={PRIMARY_COLOR} />}
                      label={MALE}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color={PRIMARY_COLOR}
              className={classes.submit}
            >
              {VALIDATE}
            </Button>
          </ValidatorForm>
          {/* Spinner (Loading) when the user clicks on the validate button */}
          {flag && <CircularProgress className={classes.spinner} />}
        </Grid>
      </main>
    </div>
  );
}
