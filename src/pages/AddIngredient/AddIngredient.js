import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import MenuBar from '../../components/MenuBar/MenuBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { axiosService } from '../../shared/services/services';
import { ENDPOINT_INGREDIENTS } from '../../shared/constants/endpoint';
import {
  POST,
  MESSAGE_VALIDATORS_REQUIRED,
  MESSAGE_VALIDATORS_INTEGER,
  PRIMARY_COLOR,
} from '../../shared/constants/constants';
import {
  ADD_INGREDIENT_TITLE,
  NAME,
  AMOUNT,
  CALORIES,
  GRAM,
  VALIDATE,
} from '../../shared/strings/strings';
import { PATH_INGREDIENTS } from '../../routes/path';
import { headers } from '../../shared/constants/env';

/**
 * Hook API to generate and apply styles (its JSS object) using Material ui
 */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',

    overflow: 'hidden',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 300,
  },

  submit: {
    marginTop: 30,
  },
  iconButton: {
    marginRight: '100%',
  },
  spinner: {
    margin: 'auto   ',
    marginTop: 20,
  },
}));

export default function AddIngredient() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [amount, setAmount] = useState(''); // to retrieve the amount entered by the user (initial value empty string)
  const [calorie, setCalorie] = useState(''); // to retrieve the calorie entered by the user (initial value empty string)
  const [flag, setFlag] = useState(false); //to display the loadings when the user validate the fields
  /**
   * arrow function to navigate the user to the addIngredient Component page
   */
  const handleArrowBack = () => {
    history.push(`${PATH_INGREDIENTS}/1`);
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
  /**
   * Validation : add custom rules (amout and calorie must be number)
   */
  useEffect(() => {
    ValidatorForm.addValidationRule('isInteger', (value) => {
      if (isNaN(value)) {
        return false;
      }
      return true;
    });
  }, []);
  /**
   * arrow function to retrieve the final inputs
   * and call the funtion addPatient to send the data to the DB
   */
  const onSubmitForm = (e) => {
    e.preventDefault();

    const ingredient = {
      name: name,
      amount: amount,
      calorie: calorie,
    };
    setFlag(true);
    addIngredient(ingredient);
  };
  /**
   * Function to send the data to DB (using axios and async await)
   * @param {Object} ingredient
   */
  const addIngredient = async (ingredient) => {
    axiosService(
      ENDPOINT_INGREDIENTS,
      POST,
      headers,
      ingredient,
      (error, response) => {
        if (response) history.push(`${PATH_INGREDIENTS}/1`);
        else console.log('error to add ingredient', error);
      }
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title={ADD_INGREDIENT_TITLE} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* Icon to go back */}
        <IconButton
          className={classes.iconButton}
          onClick={handleArrowBack}
          color={PRIMARY_COLOR}
        >
          <ArrowBackIcon />
        </IconButton>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            {/* Component Ingredient */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <ValidatorForm
                  onSubmit={onSubmitForm}
                  className={classes.form}
                  noValidate
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextValidator
                        autoComplete="fname"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label={NAME}
                        autoFocus
                        onChange={handleName}
                        value={name}
                        validators={['required']}
                        errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                        endadornment={
                          <InputAdornment position="end">g</InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextValidator
                        label={AMOUNT}
                        id="amount"
                        fullWidth
                        required
                        className={clsx(classes.margin, classes.textField)}
                        onChange={handleAmount}
                        value={amount}
                        validators={['isInteger', 'required']}
                        errorMessages={[
                          MESSAGE_VALIDATORS_INTEGER,
                          MESSAGE_VALIDATORS_REQUIRED,
                        ]}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {GRAM}
                            </InputAdornment>
                          ),
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator
                        label={CALORIES}
                        id="calorie"
                        fullWidth
                        required
                        className={clsx(classes.margin, classes.textField)}
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
                {/* Spinner (Loading) when the user clicks on the validate button */}
                {flag && <CircularProgress className={classes.spinner} />}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
