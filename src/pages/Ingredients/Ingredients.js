import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import ListIngredients from '../../components/ListIngredients/ListIngredients';
import { useHistory } from 'react-router-dom';
import { PRIMARY_COLOR } from '../../shared/constants/constants';
import { ADD, INGREDIENTS } from '../../shared/strings/strings';
import { PATH_INGREDIENT } from '../../routes/path';
import { useStyles } from './styles';

export default function Ingredients() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  /**
   * arrow function to navigate the user to the addPatient page
   */
  const handleClickAjouter = () => {
    history.push(PATH_INGREDIENT);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title={INGREDIENTS} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Button
            className={classes.ButtonGroup}
            variant="contained"
            color={PRIMARY_COLOR}
            onClick={handleClickAjouter}
          >
            {ADD}
          </Button>
          {/* Component ListIngredients */}
          <ListIngredients />
        </Container>
      </main>
    </div>
  );
}
