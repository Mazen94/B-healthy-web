import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DoneIcon from '@material-ui/icons/Done';
import React, { useState, Fragment } from 'react';
import { TextValidator } from 'react-material-ui-form-validator';
import { useParams } from 'react-router-dom';
import { axiosService } from '../../shared/services/services';
import {
  ENDPOINT_MEALS,
  ENDPOINT_INGREDIENTS,
} from '../../shared/constants/endpoint';
import { INGREDIENT_OF_MENU } from '../../shared/strings/strings';
import { PUT, PRIMARY_COLOR } from '../../shared/constants/constants';
import { useStyles } from './styles';

export default function ModifyIngredientMenu({ ingredients, ChangeFalg }) {
  const classes = useStyles(); //add styles to variable classes
  const [valueOfIngredient, setValueOfIngredient] = useState(''); // to get the ingredient selected
  const [valueOfamount, setValueOfAmount] = useState(''); // to get the amount entered by the user
  const [isdisbaled, setIsDisabled] = useState(true); //Check the textField (amounts)
  const params = useParams(); //to get params URL

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
    //test before opening the backdrop component
    if (valueOfamount !== '') {
      ChangeFalg(true);
    }
    axiosService(
      `${ENDPOINT_MEALS}${params.id}/${ENDPOINT_INGREDIENTS}${valueOfIngredient.id}`,
      PUT,
      true,
      { amount: valueOfamount },
      (error, response) => {
        if (response) console.log('changed amount', response);
        else console.log('error to change amount of ingredient', error);
      }
    );
    ChangeFalg(false);
  };

  return (
    <Fragment>
      <Grid item xs={12} sm={6} className={classes.handleIngredient}>
        {/* Component UpdateAmountIngredient Related to Menu*/}
        <Select
          variant="outlined"
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
          autoComplete="fname"
          name="name"
          variant="outlined"
          required
          fullWidth
          id="name"
          label="Amount"
          disabled={isdisbaled}
          value={valueOfamount}
          onChange={handleChangeAmount}
          endadornment={<InputAdornment position="end">g</InputAdornment>}
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
