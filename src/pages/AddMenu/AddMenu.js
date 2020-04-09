import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MenuBar from '../../components/MenuBar/MenuBar';
import AddMenuForm from '../../components/AddMenuForm/AddMenuForm';
import StepperHorizontal from '../../components/StepperHorizontal/StepperHorizontal';
import { PATH_MENUS } from '../../routes/path';
import { PRIMARY_COLOR } from '../../shared/constants/constants';
import {
  ADD_MENU_TITLE,
  MENU_STEPPER_ADD,
  MENU_STEPPER_CREATION,
} from '../../shared/strings/strings';
import { useStyles } from './styles';

export default function AddIngredient() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const [flag, setFlag] = useState(false); //to display the loadings when the user validate the fields
  const step = 0; //const to specify in which stage we are ( in component StepperHorizontal)
  /**
   * arrow function to navigate the user to the addIngredient Component page
   */
  const handleArrowBack = () => {
    history.push(`${PATH_MENUS}/1`);
  };
  const changeFlag = (change) => {
    setFlag(change);
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
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* AddMenuForm  Component  */}
                <AddMenuForm changeFlag={changeFlag} />
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
