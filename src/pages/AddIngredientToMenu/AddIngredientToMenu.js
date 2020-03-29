import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import MenuBar from '../../components/MenuBar/MenuBar';
import StepperHorizontal from '../../components/StepperHorizontal/StepperHorizontal';
import IngredientToMenu from '../../components/IngredientToMenu/IngredientToMenu';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  submit: {
    marginTop: 9,
    marginLeft: '90%'
  },
  iconButton: {
    marginRight: '95%'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  ButtonGroup: {
    marginBottom: 10,
    marginLeft: '85%'
  },
  paper: {
    marginTop: 20,
    height: 55
  }
}));

export default function AddIngredientToMenu() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const step = 1; //const to specify in which stage we are ( in component StepperHorizontal)

  /**
   * arrow function to navigate the user to the addIngredient Component page
   */
  const handleArrowBack = () => {
    history.push('/menus/1');
  };

  const handleClickButton = () => {
    history.push('/menus/1');
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title="Ajouter des ingredients au menu" />
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
          {/* Component StepperHorizontal */}
          <StepperHorizontal
            creation="Crée une Recommendation"
            add="Ajouter des menus"
            stepProps={step}
          />
          {/* Component ListIngredients */}
          <IngredientToMenu />
          <Paper elevation={0} className={classes.paper}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClickButton}
            >
              Suivant
            </Button>
          </Paper>
        </Container>
      </main>
    </div>
  );
}
