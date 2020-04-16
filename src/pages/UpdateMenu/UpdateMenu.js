import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useParams } from 'react-router-dom';
import MenuBar from '../../components/MenuBar/MenuBar';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import { axiosService } from '../../shared/services/services';
import { ENDPOINT_MEALS } from '../../shared/constants/endpoint';
import FormHelperText from '@material-ui/core/FormHelperText';
import {
  MENU_TYPE,
  EDIT,
  MIN_AGE,
  MAX_AGE,
  NAME,
  SELECT_TYPE_MENU,
  VALIDATE,
} from '../../shared/strings/strings';
import {
  GET,
  PUT,
  MESSAGE_VALIDATORS_REQUIRED,
  PRIMARY_COLOR,
} from '../../shared/constants/constants';
import { PATH_MENUS } from '../../routes/path';
import { useStyles } from './styles';
import ModifyIngredientMenu from '../../components/ModifyIngredientMenu/ModifyIngredientMenu';

export default function UpdateMenu() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const [maxAge, setMaxAge] = useState(''); // to retrieve the maximum age entered by the user (initial value empty string)
  const [minAge, setMinAge] = useState(''); // to retrieve the minimum age entered by the user (initial value empty string)
  const [typeMenu, setTypeMenu] = useState(''); // to retrieve the type menu entered by the user (initial value empty string)
  const [name, setName] = useState(''); // to retrieve the name entered by the user (initial value empty string)
  const [ingredients, setIngredients] = useState([]); // to get the ingredient related to menu
  const [flag, setFlag] = useState(false); //to open and close the CircularProgress
  const [openSkeleton, setOpenSkeleton] = useState(true); //to open and close the Skeleton
  const params = useParams(); //to get params URL

  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    axiosService(
      `${ENDPOINT_MEALS}${params.id}`,
      GET,
      true,
      null,
      (error, response) => {
        if (response) {
          if (mounted) {
            setName(response.data.data.name);
            setMaxAge(response.data.data.max_age);
            setMinAge(response.data.data.min_age);
            setIngredients(response.data.data.ingredients);
            setTypeMenu(response.data.data.type_menu);
            setOpenSkeleton(false);
          }
        } else console.log('error to get a mealStore', error);
      }
    );

    return () => {
      mounted = false;
    };
  }, [params.id]);
  /**
   * arrow function to get the name of menu entered by the user
   * @param {event} e
   */
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  /**
   * arrow function to get the maxage of menu entered by the user
   * @param {event} e
   */
  const handleChangeMaxAge = (e) => {
    setMaxAge(e.target.value);
  };
  /**
   * arrow function to get the minAge of menu entered by the user
   * @param {event} e
   */
  const handleChangeMinAge = (e) => {
    setMinAge(e.target.value);
  };

  /**
   * arrow function to get the type de menu entered by the user
   * @param {event} e
   */
  const handleTypeMenu = (e) => {
    setTypeMenu(e.target.value);
  };

  const onSubmitFrom = async () => {
    const menu = {
      name: name,
      max_age: maxAge,
      min_age: minAge,
      type_menu: typeMenu,
    };
    setFlag(true);
    axiosService(
      `${ENDPOINT_MEALS}${params.id}`,
      PUT,
      true,
      menu,
      (error, response) => {
        if (response) history.push(`${PATH_MENUS}/1`);
        else setFlag(false);
      }
    );
  };

  /**
   * Function to render
   */

  const renderFunction = () => {
    if (openSkeleton) {
      return (
        <div className={classes.skeleton}>
          {/* Loading when the data is empty */}
          <Skeleton variant="rect" width="100%" height="55vh" />
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
                    variant="outlined"
                    required
                    fullWidth
                    label={NAME}
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
                    value={typeMenu}
                    onChange={handleTypeMenu}
                    className={classes.select}
                  >
                    {SELECT_TYPE_MENU.map((row) => (
                      <MenuItem key={row} value={row}>
                        {row}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{MENU_TYPE}</FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextValidator
                    variant="outlined"
                    required
                    fullWidth
                    label={MIN_AGE}
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
                    variant="outlined"
                    required
                    fullWidth
                    label={MAX_AGE}
                    value={maxAge}
                    onChange={handleChangeMaxAge}
                    validators={['required']}
                    errorMessages={[MESSAGE_VALIDATORS_REQUIRED]}
                    endadornment={
                      <InputAdornment position="end">g</InputAdornment>
                    }
                  />
                </Grid>

                <ModifyIngredientMenu ingredients={ingredients} />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color={PRIMARY_COLOR}
                className={classes.submit}
              >
                {VALIDATE}
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
      <MenuBar title={EDIT} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* Function to render */}
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
