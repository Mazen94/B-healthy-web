import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import Chart from '../../components/Chart/Chart';
import BarComponent from '../../components/BarComponent/BarComponent';
import Copyright from '../../components/Copyright/Copyright';
import PatientStatistics from '../../components/PatientStatistics/PatientStatistics';
import healthy from '../../api/healthy'; //new instance of axios with a custom config
import {
  DASHBOARD_MENU_BAR_TITLE,
  DASHBOARD_INGREDIENT_BACKGROUNDCOLOR,
  DASHBOARD_INGREDIENT_NAME,
  DASHBOARD_MENU_BACKGROUNDCOLOR,
  DASHBOARD_MENU_NAME
} from '../../shared/constants/constants'; // Get constants from  constants  file
import Axios from 'axios';

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
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}));

/**
 * Component for showing dashboard Page
 */
export default function Dashboard() {
  const classes = useStyles(); //add styles to variable classes
  const [countIngredient, setCountIngredient] = useState(); //state to get the number of ingredient
  const [countMenus, setCountMenus] = useState(); //state to get the number of ingredient
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight); //clsx is a tiny utility for constructing className strings conditionally
  /**
   * Hook to get the number of menus and ingredients
   */
  useEffect(() => {
    //Prepare cancel request
    let mounted = true;
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();
    const MenusAndIngredients = async () => {
      const authStr = `Bearer ${localStorage.getItem('token')}`; //Prepare the authorization with the token
      // API :get the number of menus
      try {
        const response = await healthy.get(
          `statistics/menus`,
          {
            headers: { Authorization: authStr }
          },
          {
            cancelToken: source.token
          }
        );
        if (mounted) setCountMenus(response.data.countOfMenus);
      } catch (error) {
        console.log(error.response);
      }
      // API :get the number of ingredients
      try {
        const resultat = await healthy.get(
          `statistics/ingredients`,
          {
            headers: { Authorization: authStr }
          },
          {
            cancelToken: source.token
          }
        );
        // Associate the results
        if (mounted) setCountIngredient(resultat.data.countOfIngredient);
      } catch (error) {
        console.log(error.resultat);
      }
    };
    //Call the method
    MenusAndIngredients();
    return () => {
      //cancel the request
      mounted = false;
      source.cancel();
    };
  }, []);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBar title={DASHBOARD_MENU_BAR_TITLE} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={6}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* BarComponent Ingredient */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <BarComponent
                  name={DASHBOARD_INGREDIENT_NAME}
                  count={countIngredient}
                  backgroundColor={DASHBOARD_INGREDIENT_BACKGROUNDCOLOR}
                />
              </Paper>
            </Grid>
            {/* BarComponent Menus */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <BarComponent
                  name={DASHBOARD_MENU_NAME}
                  count={countMenus}
                  backgroundColor={DASHBOARD_MENU_BACKGROUNDCOLOR}
                />
              </Paper>
            </Grid>
            {/* PatientStatistics */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <PatientStatistics />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
