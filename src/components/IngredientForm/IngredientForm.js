import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, { Fragment, useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import AlertComponent from '../AlertComponent/AlertComponent';
import { PATH_INGREDIENTS } from '../../routes/path';
import {
  MESSAGE_VALIDATORS_INTEGER,
  MESSAGE_VALIDATORS_REQUIRED,
  PRIMARY_COLOR,
} from '../../shared/constants/constants';
import { axiosService, isInteger } from '../../shared/services/services';
import {
  AMOUNT,
  CALORIES,
  GRAM,
  NAME,
  VALIDATE,
} from '../../shared/strings/strings';
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
  /**
   * arrow function to get the calories entered by the user
   * @param {event} e
   */
  const handleCalorie = (e) => {
    setCalorie(e.target.value);
  };
  /**
   * arrow function to get the name entered by the user
   * @param {event} e
   */
  const handleName = (e) => {
    setName(e.target.value);
  };
  /**
   * arrow function to get the amount entered by the user
   * @param {event} e
   */
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
      } else console.log('error to add ingredient', error);
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
              variant="outlined"
              label={NAME}
              autoFocus
              onChange={handleName}
              value={name}
              validators={['required']}
              errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
              endadornment={<InputAdornment position="end">g</InputAdornment>}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator
              label={AMOUNT}
              fullWidth
              required
              onChange={handleAmount}
              value={amount}
              validators={['isInteger', 'required']}
              errorMessages={[
                MESSAGE_VALIDATORS_INTEGER,
                MESSAGE_VALIDATORS_REQUIRED,
              ]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{GRAM}</InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              label={CALORIES}
              fullWidth
              required
              onChange={handleCalorie}
              value={calorie}
              validators={['isInteger', 'required']}
              errorMessages={[
                MESSAGE_VALIDATORS_INTEGER,
                MESSAGE_VALIDATORS_REQUIRED,
              ]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Kcal</InputAdornment>
                ),
              }}
              variant="outlined"
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
          {VALIDATE}
        </Button>
      </ValidatorForm>
    </Fragment>
  );
}
