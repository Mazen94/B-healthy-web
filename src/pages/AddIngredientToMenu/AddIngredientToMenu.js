import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';

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

export default function AddIngredientToMenu() {
  const classes = useStyles(); //add styles to variable classes

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title="Ajouter des ingredients au menu" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* Component ListIngredients */}
        </Container>
      </main>
    </div>
  );
}
