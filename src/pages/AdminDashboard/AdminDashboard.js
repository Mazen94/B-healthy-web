import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
import Chart from '../../components/Chart/Chart';
import BarComponent from '../../components/BarComponent/BarComponent';
import Copyright from '../../components/Copyright/Copyright';
import { axiosService } from '../../shared/services/services';
import { ENDPOINT_ADMIN_STATS } from '../../shared/constants/endpoint';
import {
  GET,
  DASHBOARD_INGREDIENT_BACKGROUNDCOLOR,
  DASHBOARD_MENU_BACKGROUNDCOLOR,
  DASHBOARD_MENU2_BACKGROUNDCOLOR,
} from '../../shared/constants/constants'; // Get constants from  constants  file
import {
  MENUS,
  COUNT_NUTRITIONSIT,
  COUNT_NUTRITIONSIT_WAITING,
  COUNT_PATIENT,
  DASHBOARD,
  INGREDIENTS,
} from '../../shared/strings/strings';
import { useStyles } from './styles';
import { useHistory } from 'react-router-dom';
import {
  PATH_INGREDIENTS,
  PATH_MENUS,
  PATH_INGREDIENT,
  PATH_MENU,
} from '../../routes/path';
import MenuBarAdmin from '../../components/MenuBarAdmin/MenuBarAdmin';

/**
 * Component for showing dashboard Page
 */
export default function AdminDashboard() {
  const classes = useStyles(); //add styles to variable classes
  const [countAllNutri, setCountAllNutri] = useState(-1); //state to get the number of ingredient
  const [countWaitingNutri, setCountWaitingNutri] = useState(-1); //state to get the number of ingredient
  const [countPatients, setCountPatients] = useState(-1); //state to get the number of ingredient
  const history = useHistory();
  useEffect(() => {
    let mounted = true;
    const getStatistis = () => {
      // get the number of menus
      axiosService(ENDPOINT_ADMIN_STATS, GET, true, null, (error, response) => {
        if (response) {
          if (mounted) {
            setCountAllNutri(response.data.data.nutritionists);
            setCountWaitingNutri(response.data.data.waitingNutritionists);
            setCountPatients(response.data.data.patients);
          }
        } else console.log(error);
      });
    };
    //Call the method
    getStatistis();
    return () => {
      mounted = false;
    };
  }, []);
  const handleNavigationIngredient = () => {
    history.push(PATH_INGREDIENT);
  };
  const handleNavigationMenu = () => {
    history.push(PATH_MENU);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuBarAdmin title={DASHBOARD} dashboardProps={true} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} style={{ marginTop: '5%' }}>
            {/* Chart */}

            {/* BarComponent Ingredient */}
            <Grid item xs={12} md={10} lg={4}>
              <BarComponent
                name={COUNT_NUTRITIONSIT}
                count={countAllNutri}
                backgroundColor={DASHBOARD_INGREDIENT_BACKGROUNDCOLOR}
                handleButton={handleNavigationIngredient}
              />
            </Grid>
            {/* BarComponent Menus */}
            <Grid item xs={12} md={10} lg={4}>
              <BarComponent
                name={COUNT_NUTRITIONSIT_WAITING}
                count={countWaitingNutri}
                backgroundColor={DASHBOARD_MENU_BACKGROUNDCOLOR}
                handleButton={handleNavigationMenu}
              />
            </Grid>
            <Grid item xs={12} md={10} lg={4}>
              <BarComponent
                name={COUNT_PATIENT}
                count={countPatients}
                backgroundColor={DASHBOARD_MENU2_BACKGROUNDCOLOR}
                handleButton={handleNavigationMenu}
              />
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
