import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import Chart from '../../components/Chart/Chart';
import BarComponent from '../../components/BarComponent/BarComponent';
import Copyright from '../../components/Copyright/Copyright';
import PatientStatistics from '../../components/PatientStatistics/PatientStatistics';
import { axiosService } from '../../shared/services/services';
import {
  STATISTICS_MENUS,
  STATISTICS_INGREDIENTS,
} from '../../shared/constants/endpoint';
import {
  GET,
  DASHBOARD_INGREDIENT_BACKGROUNDCOLOR,
  DASHBOARD_MENU_BACKGROUNDCOLOR,
} from '../../shared/constants/constants'; // Get constants from  constants  file
import { MENUS, DASHBOARD, INGREDIENTS } from '../../shared/strings/strings';
import { useStyles } from './styles';

/**
 * Component for showing dashboard Page
 */
export default function Dashboard() {
  const classes = useStyles(); //add styles to variable classes
  const [countIngredient, setCountIngredient] = useState(-1); //state to get the number of ingredient
  const [countMenus, setCountMenus] = useState(-1); //state to get the number of ingredient
  /**
   * Hook to get the number of menus and ingredients
   */
  useEffect(() => {
    let mounted = true;
    const MenusAndIngredients = () => {
      // get the number of menus
      axiosService(STATISTICS_MENUS, GET, true, null, (error, response) => {
        if (response) {
          if (mounted) setCountMenus(response.data.data);
        } else console.log(error);
      });

      // get the number of ingredients
      axiosService(
        STATISTICS_INGREDIENTS,
        GET,
        true,
        null,
        (error, response) => {
          if (response) {
            if (mounted) setCountIngredient(response.data.data);
          } else console.log(error);
        }
      );
    };
    //Call the method
    MenusAndIngredients();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBar title={DASHBOARD} dashboardProps={true} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={6}>
              <Chart />
            </Grid>
            {/* BarComponent Ingredient */}
            <Grid item xs={12} md={4} lg={3}>
              <BarComponent
                name={INGREDIENTS}
                count={countIngredient}
                backgroundColor={DASHBOARD_INGREDIENT_BACKGROUNDCOLOR}
              />
            </Grid>
            {/* BarComponent Menus */}
            <Grid item xs={12} md={4} lg={3}>
              <BarComponent
                name={MENUS}
                count={countMenus}
                backgroundColor={DASHBOARD_MENU_BACKGROUNDCOLOR}
              />
            </Grid>
            {/* PatientStatistics */}
            <Grid item xs={12}>
              <PatientStatistics />
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
