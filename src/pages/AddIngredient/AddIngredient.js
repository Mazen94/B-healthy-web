import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import IngredientForm from '../../components/IngredientForm/IngredientForm';
import MenuBar from '../../components/MenuBar/MenuBar';
import { PATH_INGREDIENTS } from '../../routes/path';
import { POST, PRIMARY_COLOR } from '../../shared/constants/constants';
import { ENDPOINT_INGREDIENTS } from '../../shared/constants/endpoint';
import {
  ADD_INGREDIENT_TITLE,
  ADD_INGREDIENT,
} from '../../shared/strings/strings';
import { useStyles } from './styles';

export default function AddIngredient() {
  const classes = useStyles(); //add styles to variable classes
  const history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [flag, setFlag] = useState(false); //to display the loadings when the user validate the fields
  /**
   * arrow function to navigate the user to the addIngredient Component page
   */
  const handleArrowBack = () => {
    history.push(`${PATH_INGREDIENTS}/1`);
  };
  const changeFlag = (change) => {
    setFlag(change);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* Component AppBarre */}
      <MenuBar title={ADD_INGREDIENT_TITLE} />
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
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                {/* AddIngredientForm component */}
                <IngredientForm
                  changeFlag={changeFlag}
                  data={[]}
                  method={POST}
                  endPoint={ENDPOINT_INGREDIENTS}
                  message={ADD_INGREDIENT}
                />
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
