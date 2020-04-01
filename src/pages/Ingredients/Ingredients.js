import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import ListIngredients from '../../components/ListIngredients/ListIngredients';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
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
  }
}));

export default function Ingredients() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  /**
   * arrow function to navigate the user to the addPatient page
   */
  const handleClickAjouter = () => {
    history.push('/ingredient');
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title="Ingredients" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Button
            className={classes.ButtonGroup}
            variant="contained"
            color="primary"
            onClick={handleClickAjouter}
          >
            Ajouter
          </Button>
          {/* Component ListIngredients */}
          <ListIngredients />
        </Container>
      </main>
    </div>
  );
}
