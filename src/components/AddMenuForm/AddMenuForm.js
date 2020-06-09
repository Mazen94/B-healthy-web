import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import { PATH_INGREDIENTS, PATH_MENU } from '../../routes/path';
import * as contants from '../../shared/constants/constants';
import * as validations from '../../shared/constants/validation';
import { ENDPOINT_MEALS } from '../../shared/constants/endpoint';
import * as services from '../../shared/services/services';
import * as strings from '../../shared/strings/strings';
import { useStyles } from './styles';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function MenuForm({ changeFlag }) {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [maxAge, setMaxAge] = useState(''); // to retrieve the maximum age entered by the user (initial value empty string)
  const [minAge, setMinAge] = useState(''); // to retrieve the minimum age entered by the user (initial value empty string)
  const [typeMenu, setTypeMenu] = useState(''); // to retrieve the minimum age entered by the user (initial value empty string)

  /**
   * arrow function to get the MinAges entered by the user
   * @param {event} e
   */
  const handleMinAge = (e) => {
    setMinAge(e.target.value);
  };
  /**
   * arrow function to get the name entered by the user
   * @param {event} e
   */
  const handleName = (e) => {
    setName(e.target.value);
  };
  /**
   * arrow function to get the type de menu entered by the user
   * @param {event} e
   */
  const handleTypeMenu = (e) => {
    setTypeMenu(e.target.value);
  };

  /**
   * arrow function to get the MaxAge entered by the user
   * @param {event} e
   */
  const handleMaxAge = (e) => {
    setMaxAge(e.target.value);
  };

  useEffect(() => {
    services.isInteger();
    services.validationAge();
  }, []);
  /**
   * arrow function to retrieve the final inputs
   * and call the funtion addMenu to send the data to the DB
   */
  const onSubmitForm = (e) => {
    e.preventDefault();
    const menu = {
      name: name,
      max_age: maxAge,
      min_age: minAge,
      type_menu: typeMenu,
    };
    changeFlag(true); //to diplay the loading component
    services.axiosService(
      ENDPOINT_MEALS,
      contants.POST,
      true,
      menu,
      (error, response) => {
        if (response) {
          history.push(
            `${PATH_MENU}/${response.data.data.id}${PATH_INGREDIENTS}`
          );
        }
      }
    );
  };

  return (
    <ValidatorForm onSubmit={onSubmitForm} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextValidator
            variant={contants.OUTLINED}
            required
            fullWidth
            label={strings.NAME}
            autoFocus
            onChange={handleName}
            value={name}
            validators={['required']}
            errorMessages={[validations.MESSAGE_VALIDATORS_REQUIRED]}
            endadornment={
              <InputAdornment position="end">{strings.GRAM}</InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            variant={contants.OUTLINED}
            value={typeMenu}
            className={classes.select}
            onChange={handleTypeMenu}
          >
            <MenuItem value={contants.VALUE_TYPE_MENU[0]}>
              {strings.BREAKFAST}
            </MenuItem>
            <MenuItem value={contants.VALUE_TYPE_MENU[1]}>
              {strings.FIRST_SNAKE}
            </MenuItem>
            <MenuItem value={contants.VALUE_TYPE_MENU[2]}>
              {strings.LUNCH}
            </MenuItem>
            <MenuItem value={contants.VALUE_TYPE_MENU[3]}>
              {strings.SECOND_SNAKE}
            </MenuItem>
            <MenuItem value={contants.VALUE_TYPE_MENU[4]}>
              {strings.DINNER}
            </MenuItem>
          </Select>
          <FormHelperText>{strings.MENU_TYPE}</FormHelperText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextValidator
            label={strings.MIN_AGE}
            fullWidth
            required
            onChange={handleMinAge}
            value={minAge}
            validators={['isInteger', 'validationAge', 'required']}
            errorMessages={[
              validations.MESSAGE_VALIDATORS_INTEGER,
              validations.MESSAGE_VALIDATORS_AGE,
              validations.MESSAGE_VALIDATORS_REQUIRED,
            ]}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{strings.YEARS}</InputAdornment>
              ),
            }}
            variant={contants.OUTLINED}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextValidator
            label={strings.MAX_AGE}
            fullWidth
            required
            onChange={handleMaxAge}
            value={maxAge}
            validators={['isInteger', 'validationAge', 'required']}
            errorMessages={[
              validations.MESSAGE_VALIDATORS_INTEGER,
              validations.MESSAGE_VALIDATORS_AGE,
              validations.MESSAGE_VALIDATORS_REQUIRED,
            ]}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{strings.YEARS}</InputAdornment>
              ),
            }}
            variant={contants.OUTLINED}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant={contants.CONTAINED}
        color={contants.PRIMARY_COLOR}
        className={classes.submit}
      >
        {strings.FOLLOWING}
      </Button>
    </ValidatorForm>
  );
}
