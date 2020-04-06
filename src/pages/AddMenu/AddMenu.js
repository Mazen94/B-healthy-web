import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import { axiosService } from '../../shared/services/services';
import { ENDPOINT_MEALS } from '../../shared/constants/endpoint';
import MenuBar from '../../components/MenuBar/MenuBar';
import StepperHorizontal from '../../components/StepperHorizontal/StepperHorizontal';
import {
  FOLLOWING,
  MIN_AGE,
  MAX_AGE,
  NAME,
  FIRST_SNAKE,
  SECOND_SNAKE,
  BREAKFAST,
  LUNCH,
  DINNER,
  ADD_MENU_TITLE,
  MENU_STEPPER_ADD,
  MENU_STEPPER_CREATION,
} from '../../shared/strings/strings';
import {
  POST,
  PRIMARY_COLOR,
  MESSAGE_VALIDATORS_REQUIRED,
  MESSAGE_VALIDATORS_INTEGER,
} from '../../shared/constants/constants';
import { PATH_MENU, PATH_MENUS, PATH_INGREDIENTS } from '../../routes/path';
import { headers } from '../../shared/constants/env';

/**
 * Hook API to generate and apply styles (its JSS object)
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
    position: 'relative',
    left: '45%',
  },
  iconButton: {
    marginRight: '100%',
  },
  select: {
    width: '100%',
  },
  spinner: {
    margin: 'auto   ',
  },
}));

export default function AddIngredient() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [maxAge, setMaxAge] = useState(''); // to retrieve the maximum age entered by the user (initial value empty string)
  const [minAge, setMinAge] = useState(''); // to retrieve the minimum age entered by the user (initial value empty string)
  const [typeMenu, setTypeMenu] = useState(''); // to retrieve the minimum age entered by the user (initial value empty string)
  const [flag, setFlag] = useState(false); //to display the loadings when the user validate the fields
  const step = 0; //const to specify in which stage we are ( in component StepperHorizontal)
  /**
   * arrow function to navigate the user to the addIngredient Component page
   */
  const handleArrowBack = () => {
    history.push(`${PATH_MENUS}/1`);
  };
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
  /**
   * Validation : add custom rules (amout and MinAge must be number)
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
    console.log(menu);
    setFlag(true); //to diplay the loading component
    addMenu(menu);
  };

  /**
   * Function to send the data to DB (using axios and async await)
   * @param {Object} menu
   */
  const addMenu = async (menu) => {
    axiosService(ENDPOINT_MEALS, POST, headers, menu, (error, response) => {
      if (response) {
        history.push(
          `${PATH_MENU}/${response.data.MealStore.id}${PATH_INGREDIENTS}`
        );
      }
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title={ADD_MENU_TITLE} />
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
          {/* Component StepperHorizontal */}
          <StepperHorizontal
            creation={MENU_STEPPER_CREATION}
            add={MENU_STEPPER_ADD}
            stepProps={step}
          />
          <Grid container spacing={1}>
            {/* Component Menu */}
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
                      <Select
                        variant="outlined"
                        value={typeMenu}
                        className={classes.select}
                        onChange={handleTypeMenu}
                      >
                        <MenuItem value={BREAKFAST}>{BREAKFAST}</MenuItem>
                        <MenuItem value={FIRST_SNAKE}>{FIRST_SNAKE}</MenuItem>
                        <MenuItem value={LUNCH}>{LUNCH}</MenuItem>
                        <MenuItem value={SECOND_SNAKE}>{SECOND_SNAKE}</MenuItem>
                        <MenuItem value={DINNER}>{DINNER}</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextValidator
                        label={MAX_AGE}
                        id="MaxAge"
                        fullWidth
                        required
                        onChange={handleMaxAge}
                        value={maxAge}
                        validators={['isInteger', 'required']}
                        errorMessages={[
                          MESSAGE_VALIDATORS_INTEGER,
                          MESSAGE_VALIDATORS_REQUIRED,
                        ]}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">Ans</InputAdornment>
                          ),
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextValidator
                        label={MIN_AGE}
                        id="MinAge"
                        fullWidth
                        required
                        onChange={handleMinAge}
                        value={minAge}
                        validators={['isInteger', 'required']}
                        errorMessages={[
                          MESSAGE_VALIDATORS_INTEGER,
                          MESSAGE_VALIDATORS_REQUIRED,
                        ]}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">Ans</InputAdornment>
                          ),
                        }}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color={PRIMARY_COLOR}
                    className={classes.submit}
                  >
                    {FOLLOWING}
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
