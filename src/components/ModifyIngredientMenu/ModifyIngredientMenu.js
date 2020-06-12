import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DoneIcon from '@material-ui/icons/Done';
import React, { Fragment, useState } from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import { useParams } from 'react-router-dom';
import {
  PRIMARY_COLOR,
  PUT,
  OUTLINED,
  GRAM,
} from '../../shared/constants/constants';
import {
  ENDPOINT_INGREDIENTS,
  ENDPOINT_MEALS,
} from '../../shared/constants/endpoint';
import { axiosService } from '../../shared/services/services';
import { INGREDIENT_OF_MENU, AMOUNT } from '../../shared/strings/strings';
import AlertComponent from '../AlertComponent/AlertComponent';
import { useStyles } from './styles';
import { MODIFICATION_MADE } from '../../shared/strings/strings';

export default function ModifyIngredientMenu({ ingredients }) {
  const classes = useStyles(); //add styles to variable classes
  const [valueOfIngredient, setValueOfIngredient] = useState(''); // to get the ingredient selected
  const [valueOfamount, setValueOfAmount] = useState(''); // to get the amount entered by the user
  const [isdisbaled, setIsDisabled] = useState(true); //Check the textField (amounts)
  const params = useParams(); //to get params URL
  const [openSnackbar, setOpenSnackbar] = useState(false); //state used to open and close the alert

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };
  /**
   * arrow function to get the ingredent entered by the user
   * @param {event} e
   */
  const handleIngredient = (e) => {
    setIsDisabled(false);
    setValueOfIngredient(e.target.value);
    setValueOfAmount(e.target.value.pivot.amount);
  };
  /**
   *
   * @param {event} e
   */
  const handleChangeAmount = (e) => {
    setValueOfAmount(e.target.value);
  };
  /**
   * Change the amount of ingredient related to menu
   * @param {event} e
   */
  const handleClickButton = () => {
    axiosService(
      `${ENDPOINT_MEALS}${params.id}/${ENDPOINT_INGREDIENTS}${valueOfIngredient.id}`,
      PUT,
      true,
      { amount: valueOfamount },
      (error, response) => {
        if (response) setOpenSnackbar(true);
      }
    );
  };

  return (
    <Fragment>
      <AlertComponent
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        message={MODIFICATION_MADE}
      />
      <Grid item xs={12} sm={6} className={classes.handleIngredient}>
        {/* Component UpdateAmountIngredient Related to Menu*/}
        <Select
          variant={OUTLINED}
          className={classes.select}
          value={valueOfIngredient}
          onChange={handleIngredient}
        >
          }
          {ingredients.map((row) => (
            <MenuItem key={row.id} value={row}>
              {row.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{INGREDIENT_OF_MENU}</FormHelperText>
      </Grid>
      <Grid item xs={12} sm={5} className={classes.handleIngredient}>
        <TextValidator
          variant={OUTLINED}
          required
          fullWidth
          label={AMOUNT}
          disabled={isdisbaled}
          value={valueOfamount}
          onChange={handleChangeAmount}
          endadornment={<InputAdornment position="end">{GRAM}</InputAdornment>}
        />
      </Grid>
      <Grid item xs={12} sm={1} className={classes.handleIngredient}>
        <IconButton color={PRIMARY_COLOR} onClick={handleClickButton}>
          <DoneIcon />
        </IconButton>
      </Grid>
    </Fragment>
  );
}
