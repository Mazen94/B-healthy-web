import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import healthy from '../../api/healthy';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    height: 80,
    margin: 'auto',
    display: 'flex'
  },
  grid: {
    margin: 'auto',
    marginLeft: '2%'
  },
  submit: {
    margin: 'auto',
    marginRight: '2%'
  },
  paperChip: {
    height: 200,
    marginTop: 10
  },
  chip: {
    marginTop: 10
  }
}));

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
      const AuthStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
      const response = await healthy.get(`/ingredients?page=1`, {
        headers: { Authorization: AuthStr }
      });
      console.log(response.data.ingredients);
      setIngredients(response.data.ingredients.data); //add the received data to the state data
    };
    //call function
    loadIngredient();
  }, []);
  /**
   * arrow function to get the type de menu entered by the user
   * @param {event} e
   */
  const handleIngredientSelected = e => {
    setIngredientSelected(e.target.value);
  };
  /**
   *
   * @param {event} e
   */
  const handleAmountChange = e => {
    setAmount(e.target.value);
  };
  /**
   * arrow function to retrieve the final inputs
   * and call the funtion addPatient to send the data to the DB
   */
  const onSubmitForm = e => {
    e.preventDefault();
    const ingredient = {
      id: ingredientSelected.id,
      amount: amount
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
  const postIngredientToMenu = async ingredient => {
    try {
      const AuthStr = `Bearer ${localStorage.getItem('token')}`;
      const response = await healthy.post(
        '/mealStore/' + menuId + '/ingredients',
        ingredient,
        {
          headers: { Authorization: AuthStr }
        }
      );
      console.log('response', response.data);
    } catch (error) {
      console.log(error.response.data);
      console.log('Error', error.message);
    }
  };
  /**
   * arrow function to remove an ingredient from the list of ingredients
   */
  const handleDelete = async id => {
    setAddedIngredients(addedIngredients.filter(item => item.id !== id));
    if (addedIngredients.length === 1) {
      setFlag(false);
    }
    try {
      const AuthStr = `Bearer ${localStorage.getItem('token')}`;
      const response = await healthy.delete(
        `mealStore/${menuId}/ingredients/${id}`,
        {
          headers: { Authorization: AuthStr }
        }
      );
      //get the new data without the Ingredient deleted
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
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
              {ingredients.map(ingredient => (
                <MenuItem key={ingredient.id} value={ingredient}>
                  {ingredient.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} className={classes.grid}>
            <TextValidator
              label="Quantite"
              id="amount"
              required
              onChange={handleAmountChange}
              value={amount}
              validators={['required']}
              errorMessages={['Ce champ est requis']}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Gramme</InputAdornment>
                )
              }}
              variant="outlined"
            />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ajouter
          </Button>
        </Paper>
      </ValidatorForm>
      {flag && (
        <Paper elevation={0} className={classes.paperChip}>
          {addedIngredients.map(value => (
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
