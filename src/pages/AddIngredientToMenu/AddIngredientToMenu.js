import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import MenuBar from '../../components/MenuBar/MenuBar';
import StepperHorizontal from '../../components/StepperHorizontal/StepperHorizontal';
import IngredientToMenu from '../../components/IngredientToMenu/IngredientToMenu';
import { PRIMARY_COLOR, CONTAINED } from '../../shared/constants/constants';
import {
  FOLLOWING,
  MENU_STEPPER_ADD,
  MENU_STEPPER_CREATION,
} from '../../shared/strings/strings';
import { PATH_MENUS } from '../../routes/path';
import { useStyles } from './styles';

export default function AddIngredientToMenu() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const step = 1; //const to specify in which stage we are ( in component StepperHorizontal)

  /**
   * arrow function to navigate the user to the addIngredient Component page
   */
  const handleArrowBack = () => {
    history.push(`${PATH_MENUS}/1`);
  };

  const handleClickButton = () => {
    history.push(`${PATH_MENUS}/1`);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title={MENU_STEPPER_ADD} />
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
          {/* Component ListIngredients */}
          <IngredientToMenu />
          <Paper elevation={0} className={classes.paper}>
            <Button
              type="submit"
              variant={CONTAINED}
              color={PRIMARY_COLOR}
              className={classes.submit}
              onClick={handleClickButton}
            >
              {FOLLOWING}
            </Button>
          </Paper>
        </Container>
      </main>
    </div>
  );
}
