import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { Fragment, useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import AlertComponent from '../AlertComponent/AlertComponent';
import { PATH_INGREDIENTS } from '../../routes/path';
import * as consants from '../../shared/constants/constants';
import * as validations from '../../shared/constants/validation';
import { axiosService, isInteger } from '../../shared/services/services';
import * as strings from '../../shared/strings/strings';
import { useStyles } from './styles';

export default function AddIngredientForm({
  changeFlag,
  data,
  method,
  endPoint,
  message,
}) {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [amount, setAmount] = useState(''); // to retrieve the amount entered by the user (initial value empty string)
  const [calorie, setCalorie] = useState(''); // to retrieve the calorie entered by the user (initial value empty string)
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };
  const handleCalorie = (e) => {
    setCalorie(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    //custom rules
    isInteger();
    if (data.length !== 0) {
      setName(data.name);
      setAmount(data.amount);
      setCalorie(data.calorie);
    }
  }, [data]);

  const onSubmitForm = (e) => {
    e.preventDefault();

    const ingredient = {
      name: name,
      amount: amount,
      calorie: calorie,
    };
    changeFlag(true);
    setOpenSnackbar(true);
    axiosService(endPoint, method, true, ingredient, (error, response) => {
      if (response) {
        history.push(`${PATH_INGREDIENTS}/1`);
      }
    });
  };

  return (
    <Fragment>
      <AlertComponent
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        message={message}
      />
      <ValidatorForm onSubmit={onSubmitForm} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextValidator
              required
              fullWidth
              variant={consants.OUTLINED}
              label={strings.NAME}
              autoFocus
              onChange={handleName}
              value={name}
              validators={[validations.RULES_NAME_REQUIRED]}
              errorMessages={[validations.MESSAGE_VALIDATORS_REQUIRED]}
              endadornment={<InputAdornment position="end">g</InputAdornment>}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator
              label={strings.AMOUNT}
              fullWidth
              required
              onChange={handleAmount}
              value={amount}
              validators={[
                validations.RULES_NAME_IS_INTEGER,
                validations.RULES_NAME_REQUIRED,
              ]}
              errorMessages={[
                validations.MESSAGE_VALIDATORS_INTEGER,
                validations.MESSAGE_VALIDATORS_REQUIRED,
              ]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{strings.GRAM}</InputAdornment>
                ),
              }}
              variant={consants.OUTLINED}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              label={strings.CALORIES}
              fullWidth
              required
              onChange={handleCalorie}
              value={calorie}
              validators={[
                validations.RULES_NAME_IS_INTEGER,
                validations.RULES_NAME_REQUIRED,
              ]}
              errorMessages={[
                validations.MESSAGE_VALIDATORS_INTEGER,
                validations.MESSAGE_VALIDATORS_REQUIRED,
              ]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{strings.KCLA}</InputAdornment>
                ),
              }}
              variant={consants.OUTLINED}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant={consants.CONTAINED}
          color={consants.PRIMARY_COLOR}
          className={classes.submit}
        >
          {strings.VALIDATE}
        </Button>
      </ValidatorForm>
    </Fragment>
  );
}
