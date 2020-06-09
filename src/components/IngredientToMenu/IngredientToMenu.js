import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useParams } from 'react-router-dom';
import * as constants from '../../shared/constants/constants';
import * as validations from '../../shared/constants/validation';
import * as endPoints from '../../shared/constants/endpoint';
import { axiosService } from '../../shared/services/services';
import { AMOUNT, ADD } from '../../shared/strings/strings';
import AddedIngredients from '../AddedIngredients/AddedIngredients';
import { useStyles } from './styles';
import AlertComponent from '../AlertComponent/AlertComponent';

export default function IngredientToMenu() {
  const classes = useStyles(); //add styles to variable classes
  const { menuId } = useParams(); //to get the menu id from url
  const [ingredients, setIngredients] = useState([]); //to get the ingredients in the DB
  const [addedIngredients, setAddedIngredients] = useState([]); //to get the ingredients added to menu
  const [ingredientSelected, setIngredientSelected] = useState(''); // to retrieve the ingredient selected by the user (initial value empty string)
  const [flag, setFlag] = useState(false); //to diplay the list of ingredients added ()
  const [amount, setAmount] = useState(''); // to retrieve the amount  by the user (initial value empty string)
  const [errorToAdd, setErrorToAdd] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    axiosService(
      `${endPoints.ENDPOINT_LIST_INGREDIENTS}1`,
      constants.GET,
      true,
      null,
      (error, response) => {
        if (response) setIngredients(response.data.data.data);
        else console.log('error to get an ingredient', error);
      }
    );
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

    axiosService(
      `${endPoints.ENDPOINT_MEALS}${menuId}/${endPoints.ENDPOINT_INGREDIENTS}`,
      constants.POST,
      true,
      ingredient,
      (error, response) => {
        if (response) {
          if (response.status === 201) {
            setFlag(true);
            setAddedIngredients([...addedIngredients, ingredientSelected]);
          } else {
            setErrorToAdd(response.data.data);
            setOpenSnackbar(true);
          }
        } else {
          console.log('error to add ');
        }
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
      `${endPoints.ENDPOINT_MEALS}${menuId}/${endPoints.ENDPOINT_INGREDIENTS}${id}`,
      constants.DELETE,
      true,
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
              variant={constants.OUTLINED}
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
              required
              onChange={handleAmountChange}
              value={amount}
              validators={['required']}
              errorMessages={[validations.MESSAGE_VALIDATORS_REQUIRED]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {constants.GRAM}
                  </InputAdornment>
                ),
              }}
              variant={constants.OUTLINED}
            />
          </Grid>
          <Button
            type="submit"
            variant={constants.CONTAINED}
            color={constants.PRIMARY_COLOR}
            className={classes.submit}
          >
            {ADD}
          </Button>
        </Paper>
      </ValidatorForm>
      {flag && (
        <AddedIngredients
          addedIngredients={addedIngredients}
          handleDelete={handleDelete}
        />
      )}
      {openSnackbar && (
        <AlertComponent
          message={errorToAdd}
          openSnackbar={openSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
        />
      )}
    </div>
  );
}
