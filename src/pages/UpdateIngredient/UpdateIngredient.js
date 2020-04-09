import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
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
  PUT,
  GET,
  MESSAGE_VALIDATORS_REQUIRED,
  MESSAGE_VALIDATORS_INTEGER,
} from '../../shared/constants/constants';
import {
  EDIT,
  NAME,
  AMOUNT,
  CALORIES,
  GRAM,
  VALIDATE,
  KCLA,
} from '../../shared/strings/strings';
import { PATH_INGREDIENTS } from '../../routes/path';
import { useStyles } from './styles';
import { isInteger } from '../../shared/services/services';

export default function UpdateIngredient(props) {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [amount, setAmount] = useState(''); // to retrieve the amount entered by the user (initial value empty string)
  const [calorie, setCalorie] = useState(''); // to retrieve the calorie entered by the user (initial value empty string)
  const [flagValidate, setFlagValidate] = useState(false); //to display the loadings when the user validate the fields
  const [openSkeleton, setOpenSkeleton] = useState(true); //to open and close the Skeleton
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
    isInteger();
  }, []);
  /**
   * UseEffect to get the Ingredient by id
   */
  useEffect(() => {
    let mounted = true;

    axiosService(
      `${ENDPOINT_INGREDIENTS}${props.match.params.id}`,
      GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) {
            setName(response.data.ingredient.name);
            setAmount(response.data.ingredient.amount);
            setCalorie(response.data.ingredient.calorie);
            setOpenSkeleton(false);
          }
        } else console.log('error to get only one ingredient', error);
      }
    );

    return () => {
      mounted = false;
    };
  }, [props.match.params.id]);

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
    setFlagValidate(true);
    axiosService(
      `${ENDPOINT_INGREDIENTS}${props.match.params.id}`,
      PUT,
      true,
      ingredient,
      (error, response) => {
        if (response) history.push(`${PATH_INGREDIENTS}/1`);
        else console.log('error to update ingredient', error);
      }
    );
  };
  /**
   * Function to render
   */
  const renderFunction = () => {
    //Loading when the data is empty
    if (openSkeleton) {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    } else
      return (
        //Form
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ValidatorForm onSubmit={onSubmitForm} noValidate>
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
                      id="calorie"
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
                          <InputAdornment position="end">{KCLA}</InputAdornment>
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
                  color="primary"
                  className={classes.submit}
                >
                  {VALIDATE}
                </Button>
              </ValidatorForm>
              {/* Spinner (Loading) when the user clicks on the validate button */}
              {flagValidate && <CircularProgress className={classes.spinner} />}
            </Paper>
          </Grid>
        </Grid>
      );
  };
  /**
   * render method
   */
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title={EDIT} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* Icon to go back */}
        <IconButton
          className={classes.iconButton}
          onClick={handleArrowBack}
          color="primary"
        >
          <ArrowBackIcon />
        </IconButton>
        <Container maxWidth="lg" className={classes.container}>
          {/* Function to render */}
          {renderFunction()}
        </Container>
      </main>
    </div>
  );
}
