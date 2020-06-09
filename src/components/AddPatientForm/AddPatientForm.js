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
import { PATH_PATIENT, PATH_CONSULTATION } from '../../routes/path';
import * as constants from '../../shared/constants/constants';
import * as validations from '../../shared/constants/validation';
import { ENDPOINT_PATIENTS } from '../../shared/constants/endpoint';
import * as services from '../../shared/services/services';
import * as strings from '../../shared/strings/strings';
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
  //when the user types the Gender
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  useEffect(() => {
    //custom rules
    services.lenghOfPassword();
    services.isInteger();
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const valueOfGender = gender === strings.RADIOGROUP_PATIENT[0] ? 1 : 0;
    changeFlag(true);
    const patient = {
      email,
      firstName,
      lastName,
      gender: valueOfGender,
      numberPhone,
      profession: proffesion,
      age,
    };
    services.axiosService(
      ENDPOINT_PATIENTS,
      constants.POST,
      true,
      patient,
      (error, response) => {
        if (response) {
          console.log();
          changeFlag(false);
          history.push(
            `${PATH_PATIENT}/${response.data.data.id}${PATH_CONSULTATION}`
          );
        } else {
          changeFlag(false);
          changeErreurValidation(true);
        }
      }
    );
  };

  return (
    <ValidatorForm onSubmit={onSubmitForm} className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextValidator
            variant={constants.OUTLINED}
            required
            fullWidth
            onChange={handleFirstName}
            value={firstName}
            label={strings.FIRST_NAME}
            autoFocus
            validators={[validations.RULES_NAME_REQUIRED]}
            errorMessages={[validations.MESSAGE_VALIDATORS_REQUIRED]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextValidator
            variant={constants.OUTLINED}
            required
            fullWidth
            onChange={handleLastName}
            value={lastName}
            label={strings.LAST_NAME}
            validators={[validations.RULES_NAME_REQUIRED]}
            errorMessages={[validations.MESSAGE_VALIDATORS_REQUIRED]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextValidator
            variant={constants.OUTLINED}
            required
            fullWidth
            onChange={handleEmail}
            value={email}
            label={strings.EMAIL}
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

        <Grid item xs={12} sm={6}>
          <TextValidator
            variant={constants.OUTLINED}
            fullWidth
            onChange={handleNumberPhone}
            value={numberPhone}
            label={strings.PHONE}
            validators={[
              validations.RULES_NAME_REQUIRED,
              validations.RULES_NAME_IS_INTEGER,
            ]}
            errorMessages={[
              validations.MESSAGE_VALIDATORS_REQUIRED,
              validations.MESSAGE_VALIDATORS_INTEGER,
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextValidator
            variant={constants.OUTLINED}
            fullWidth
            onChange={handleProffesion}
            value={proffesion}
            label={strings.PREFFESION}
            validators={[validations.RULES_NAME_REQUIRED]}
            errorMessages={[validations.MESSAGE_VALIDATORS_REQUIRED]}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextValidator
            variant={constants.OUTLINED}
            fullWidth
            onChange={handleAge}
            value={age}
            label={strings.AGE}
            validators={[
              validations.RULES_NAME_REQUIRED,
              validations.RULES_NAME_IS_INTEGER,
            ]}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{strings.YEARS}</InputAdornment>
              ),
            }}
            errorMessages={[
              validations.MESSAGE_VALIDATORS_REQUIRED,
              validations.MESSAGE_VALIDATORS_INTEGER,
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <RadioGroup
              value={gender}
              onChange={handleGender}
              className={classes.radioGroup}
            >
              {strings.RADIOGROUP_PATIENT.map((row, index) => (
                <FormControlLabel
                  value={row}
                  key={index}
                  control={<Radio color={constants.PRIMARY_COLOR} />}
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
        variant={constants.CONTAINED}
        color={constants.PRIMARY_COLOR}
        className={classes.submit}
      >
        {strings.VALIDATE}
      </Button>
    </ValidatorForm>
  );
}
