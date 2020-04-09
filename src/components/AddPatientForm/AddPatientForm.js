import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import { PATH_PATIENTS } from '../../routes/path';
import {
  MESSAGE_VALIDATORS_EMAIL,
  MESSAGE_VALIDATORS_INTEGER,
  MESSAGE_VALIDATORS_PASSWORD,
  MESSAGE_VALIDATORS_REQUIRED,
  POST,
  PRIMARY_COLOR,
} from '../../shared/constants/constants';
import { ENDPOINT_PATIENTS } from '../../shared/constants/endpoint';
import {
  axiosService,
  isInteger,
  lenghOfPassword,
} from '../../shared/services/services';
import {
  AGE,
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  RADIOGROUP_PATIENT,
  PASSWORD,
  PHONE,
  PREFFESION,
  VALIDATE,
  YEARS,
} from '../../shared/strings/strings';
import { useStyles } from './styles';

export default function AddPatientForm({ changeFlag, changeErreurValidation }) {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const [email, setEmail] = useState(''); //to retrieve the email entered by the user.
  const [gender, setGender] = useState('femme'); // to retrieve the gender entered by the user.
  const [proffesion, setProffesion] = useState(''); //to retrieve the proffesion entered by the user .
  const [firstName, setFirstName] = useState(''); //to retrieve the firstName entered by the user .
  const [numberPhone, setNumberPhone] = useState(''); //to retrieve the numberPhone entered by the user.
  const [lastName, setLastName] = useState(''); //to retrieve the lastName entered by the user.
  const [password, setPassword] = useState(''); //to retrieve the password entered by the user.
  const [age, setAge] = useState(''); //to retrieve the password entered by the user.

  //when the user types the email
  const handleEmail = (e) => {
    setEmail(e.target.value);
    changeErreurValidation(false);
  };
  //when the user types the FirstName
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  //when the user types the LastName
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleNumberPhone = (e) => {
    setNumberPhone(e.target.value);
  };
  //when the user types the Proffesion
  const handleProffesion = (e) => {
    setProffesion(e.target.value);
  };
  //when the user types the Age
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  //when the user types the Password
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  //when the user types the Gender
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  useEffect(() => {
    //custom rules
    lenghOfPassword();
    isInteger();
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();
    changeFlag(true);
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
    axiosService(ENDPOINT_PATIENTS, POST, true, patient, (error, response) => {
      if (response) {
        console.log(response.data);
        changeFlag(false);
        history.push(`${PATH_PATIENTS}/1`);
      } else {
        changeFlag(false);
        changeErreurValidation(true);
      }
    });
  };

  return (
    <ValidatorForm onSubmit={onSubmitForm} className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextValidator
            variant="outlined"
            required
            fullWidth
            onChange={handleFirstName}
            value={firstName}
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
            label={LAST_NAME}
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
            label={EMAIL}
            validators={['required', 'isEmail']}
            errorMessages={[
              MESSAGE_VALIDATORS_REQUIRED,
              MESSAGE_VALIDATORS_EMAIL,
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextValidator
            variant="outlined"
            fullWidth
            onChange={handleNumberPhone}
            value={numberPhone}
            label={PHONE}
            validators={['required', 'isInteger']}
            errorMessages={[
              MESSAGE_VALIDATORS_REQUIRED,
              MESSAGE_VALIDATORS_INTEGER,
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextValidator
            variant="outlined"
            fullWidth
            onChange={handleProffesion}
            value={proffesion}
            label={PREFFESION}
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
            validators={['required', 'isInteger']}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{YEARS}</InputAdornment>
              ),
            }}
            errorMessages={[
              MESSAGE_VALIDATORS_REQUIRED,
              MESSAGE_VALIDATORS_INTEGER,
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            variant="outlined"
            required
            fullWidth
            label={PASSWORD}
            type="password"
            onChange={handlePassword}
            value={password}
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
              value={gender}
              onChange={handleGender}
              className={classes.radioGroup}
            >
              {RADIOGROUP_PATIENT.map((row, index) => (
                <FormControlLabel
                  value={row}
                  key={index}
                  control={<Radio color={PRIMARY_COLOR} />}
                  label={row}
                />
              ))}
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
  );
}
