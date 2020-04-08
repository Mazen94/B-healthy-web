import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useParams } from 'react-router-dom';
import { axiosService } from '../../shared/services/services';
import {
  ENDPOINT_ALL_INGREDIENTS,
  ENDPOINT_MEALS,
  ENDPOINT_INGREDIENTS,
} from '../../shared/constants/endpoint';
import {
  POST,
  GET,
  DELETE,
  PRIMARY_COLOR,
} from '../../shared/constants/constants';
import { AMOUNT } from '../../shared/strings/strings';
import { headers } from '../../shared/constants/env';
import { useStyles } from './styles';

export default function IngredientToMenu() {
  const classes = useStyles(); //add styles to variable classes
  const { menuId } = useParams(); //to get the menu id from url
  const [ingredients, setIngredients] = useState([]); //to get the ingredients in the DB
  const [addedIngredients, setAddedIngredients] = useState([]); //to get the ingredients added to menu
  const [ingredientSelected, setIngredientSelected] = useState(''); // to retrieve the ingredient selected by the user (initial value empty string)
  const [flag, setFlag] = useState(false); //to diplay the list of ingredients added ()
  const [amount, setAmount] = useState(''); // to retrieve the amount  by the user (initial value empty string)

  useEffect(() => {
    /**
     * Arrow function to get the data (ingredients) using Async await
     */
    const loadIngredient = async () => {
      axiosService(
        ENDPOINT_ALL_INGREDIENTS,
        GET,
        headers,
        null,
        (error, response) => {
          if (response) setIngredients(response.data.ingredients);
          else console.log('error to get an ingredient', error);
        }
      );
    };
    //call function
    loadIngredient();
  }, []);
  /**
   * arrow function to get the type de menu entered by the user
   * @param {event} e
   */
  const handleIngredientSelected = (e) => {
    setIngredientSelected(e.target.value);
  };
  /**
   *
   * @param {event} e
   */
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  /**
   * arrow function to retrieve the final inputs
   * and call the funtion addPatient to send the data to the DB
   */
  const onSubmitForm = (e) => {
    e.preventDefault();
    const ingredient = {
      id: ingredientSelected.id,
      amount: amount,
    };
    console.log(ingredient);
    setAddedIngredients([...addedIngredients, ingredientSelected]);
    setFlag(true);
    postIngredientToMenu(ingredient);
  };
  /**
   * Function to send the data to DB (using axios and async await)
   * @param {Object} ingredient
   */
  const postIngredientToMenu = async (ingredient) => {
    await axiosService(
      `${ENDPOINT_MEALS}${menuId}/${ENDPOINT_INGREDIENTS}`,
      POST,
      headers,
      ingredient,
      (error, response) => {
        if (response) console.log('added ingredient to a storeMenu', response);
        else console.log('error to add ingredient to a storeMenu', error);
      }
    );
  };
  /**
   * arrow function to remove an ingredient from the list of ingredients
   */
  const handleDelete = async (id) => {
    setAddedIngredients(addedIngredients.filter((item) => item.id !== id));
    if (addedIngredients.length === 1) {
      setFlag(false);
    }
    axiosService(
      `${ENDPOINT_MEALS}${menuId}/${ENDPOINT_INGREDIENTS}${id}`,
      DELETE,
      headers,
      null,
      (error, response) => {
        if (response) console.log('deleted ingredient', response);
        else console.log('error to delete a ingredient', error);
      }
    );
  };

  return (
    <div>
      <ValidatorForm
        onSubmit={onSubmitForm}
        className={classes.form}
        noValidate
      >
        <Paper elevation={0} className={classes.paper}>
          <Grid item xs={12} sm={6} className={classes.grid}>
            <Select
              fullWidth
              value={ingredientSelected}
              onChange={handleIngredientSelected}
              variant="outlined"
            >
              {ingredients.map((ingredient) => (
                <MenuItem key={ingredient.id} value={ingredient}>
                  {ingredient.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.grid}>
            <TextValidator
              label={AMOUNT}
              id="amount"
              required
              onChange={handleAmountChange}
              value={amount}
              validators={['required']}
              errorMessages={['Ce champ est requis']}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Gramme</InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color={PRIMARY_COLOR}
            className={classes.submit}
          >
            Ajouter
          </Button>
        </Paper>
      </ValidatorForm>
      {flag && (
        <Paper elevation={0} className={classes.paperChip}>
          {addedIngredients.map((value) => (
            <Chip
              key={value.id}
              label={value.name}
              onDelete={() => handleDelete(value.id)}
              variant="outlined"
              className={classes.chip}
            />
          ))}
        </Paper>
      )}
    </div>
  );
}
