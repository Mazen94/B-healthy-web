import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useParams } from 'react-router-dom';
import healthy from '../../api/healthy';
import MenuBar from '../../components/MenuBar/MenuBar';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  MENU_BAR_UPDATE_TITLE,
  MESSAGE_VALIDATORS_REQUIRED
} from '../../constants/constants';

/**
 * Hook API to generate and apply styles (its JSS object)
 */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '150vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    paddingTop: 35,
    overflow: 'auto',
    flexDirection: 'column',
    height: 350
  },
  select: {
    width: '100%'
  },
  handleIngredient: {
    marginTop: 20
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  skeleton: {
    margin: 'auto',
    marginTop: '10%',
    width: '90%'
  }
}));

export default function UpdateIngredient() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const [maxAge, setMaxAge] = useState(''); // to retrieve the maximum age entered by the user (initial value empty string)
  const [minAge, setMinAge] = useState(''); // to retrieve the minimum age entered by the user (initial value empty string)
  const [typeMenu, setTypeMenu] = useState(''); // to retrieve the type menu entered by the user (initial value empty string)
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [ingredients, setIngredients] = useState([]); // to get the ingredient related to menu
  const [valueOfIngredient, setValueOfIngredient] = useState(''); // to get the ingredient selected
  const [valueOfamount, setValueOfAmount] = useState(''); // to get the amount entered by the user
  const [isdisbaled, setIsDisabled] = useState(true); //Check the textField (amounts)
  const [flag, setFlag] = useState(false); //Check the textField (amounts)
  const params = useParams(); //to get params URL

  /**
   * hook useEffect there will be a get  the menu with ingredients by id ,
   */
  useEffect(() => {
    const getMealStore = async id => {
      try {
        const authStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
        const response = await healthy.get('/mealStore/' + params.id, {
          headers: { Authorization: authStr }
        });
        setName(response.data.StoreMenu.name);
        setMaxAge(response.data.StoreMenu.max_age);
        setMinAge(response.data.StoreMenu.min_age);
        setIngredients(response.data.StoreMenu.ingredients);
        setTypeMenu(response.data.StoreMenu.type_menu);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getMealStore(params.id);
  }, [params.id]);
  /**
   * arrow function to get the name of menu entered by the user
   * @param {event} e
   */
  const handleChangeName = e => {
    setName(e.target.value);
  };
  /**
   * arrow function to get the maxage of menu entered by the user
   * @param {event} e
   */
  const handleChangeMaxAge = e => {
    setMaxAge(e.target.value);
  };
  /**
   * arrow function to get the minAge of menu entered by the user
   * @param {event} e
   */
  const handleChangeMinAge = e => {
    setMinAge(e.target.value);
  };

  /**
   * arrow function to get the type de menu entered by the user
   * @param {event} e
   */
  const handleTypeMenu = e => {
    setTypeMenu(e.target.value);
  };
  /**
   * arrow function to get the ingredent entered by the user
   * @param {event} e
   */
  const handleIngredient = e => {
    setIsDisabled(false);
    setValueOfIngredient(e.target.value);
    setValueOfAmount(e.target.value.pivot.amount);
  };
  /**
   *
   * @param {event} e
   */
  const handleChangeAmount = e => {
    setValueOfAmount(e.target.value);
  };
  /**
   * Change the amount of ingredient related to menu
   * @param {event} e
   */
  const handleClickButton = async () => {
    //test before opening the backdrop component
    if (valueOfamount !== '') {
      setFlag(true);
    }
    const authStr = `Bearer ${localStorage.getItem('token')}`;
    console.log(valueOfIngredient.id);
    console.log(valueOfamount);
    try {
      const response = await healthy.put(
        `/mealStore/${params.id}/ingredients/${valueOfIngredient.id}`,
        { amount: valueOfamount },
        {
          headers: { Authorization: authStr }
        }
      );
      console.log(response.data);
      setFlag(false);
    } catch (e) {
      setFlag(false);
    }
  };
  /**
   * put the menu
   */
  const onSubmitFrom = async () => {
    const menu = {
      name: name,
      max_age: maxAge,
      min_age: minAge,
      type_menu: typeMenu
    };
    setFlag(true);
    try {
      const authStr = `Bearer ${localStorage.getItem('token')}`;
      const response = await healthy.put(`/mealStore/${params.id}`, menu, {
        headers: { Authorization: authStr }
      });
      console.log(response.data);
      history.push('/menus/1');
    } catch (error) {
      setFlag(false);
    }
  };
  /**
   * Function to render
   */
  const renderFunction = () => {
    if (name === '') {
      return (
        <div className={classes.skeleton}>
          {/* Loading when the data is empty */}
          <Skeleton />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
      );
    } else
      return (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <ValidatorForm onSubmit={onSubmitFrom} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    autoComplete="fname"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Nom"
                    value={name}
                    onChange={handleChangeName}
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
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={typeMenu}
                    onChange={handleTypeMenu}
                    className={classes.select}
                  >
                    <MenuItem value={'Petit-Déjeuner'}>Petit-Déjeuner</MenuItem>
                    <MenuItem value={'Collation 1'}>Collation 1</MenuItem>
                    <MenuItem value={'Déjeuner'}>Déjeuner</MenuItem>
                    <MenuItem value={'Collation 2'}>Collation 2</MenuItem>
                    <MenuItem value={'Dîner'}>Dîner</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    autoComplete="fname"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Min Age"
                    value={minAge}
                    onChange={handleChangeMinAge}
                    validators={['required']}
                    errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                    endadornment={
                      <InputAdornment position="end">g</InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    autoComplete="fname"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Max Age"
                    value={maxAge}
                    onChange={handleChangeMaxAge}
                    validators={['required']}
                    errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                    endadornment={
                      <InputAdornment position="end">g</InputAdornment>
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6} className={classes.handleIngredient}>
                  {/* Component UpdateAmountIngredient Related to Menu*/}
                  <Select
                    variant="outlined"
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className={classes.select}
                    value={valueOfIngredient}
                    onChange={handleIngredient}
                  >
                    }
                    {ingredients.map(row => (
                      <MenuItem key={row.id} value={row}>
                        {row.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Les ingredients de ce menu</FormHelperText>
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
                    endadornment={
                      <InputAdornment position="end">g</InputAdornment>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={1} className={classes.handleIngredient}>
                  <IconButton color="primary" onClick={handleClickButton}>
                    <DoneIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Valider
              </Button>
            </ValidatorForm>
          </Paper>
        </Grid>
      );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title={MENU_BAR_UPDATE_TITLE} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {renderFunction()}
          {/* Backdrop Component */}
          <Backdrop className={classes.backdrop} open={flag}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Container>
      </main>
    </div>
  );
}
