import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CheckConnection } from '../components/CheckConnection/CheckConnection';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute'; //
import AddPatient from '../pages/AddPatient/AddPatient';
import Dashboard from '../pages/Dashboard/Dashboard';
import Patients from '../pages/Patients/Patients';
import Profil from '../pages/Profil/Profil';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SingIn/SignIn';
import Ingredients from '../pages/Ingredients/Ingredients';
import AddIngredient from '../pages/AddIngredient/AddIngredient';
import UpdateIngredient from '../pages/UpdateIngredient/UpdateIngredient';
import Menus from '../pages/Menus/Menus';
import AddMenu from '../pages/AddMenu/AddMenu';
import AddIngredientToMenu from '../pages/AddIngredientToMenu/AddIngredientToMenu';
import UpdateMenu from '../pages/UpdateMenu/UpdateMenu';
import Consultation from '../pages/Consultation/Consultation';
import Recommendation from '../pages/Recommendation/Recommendation';
import AddRecommendations from '../pages/AddRecommendations/AddRecommendations';
import AddMenuToRecommendations from '../pages/AddMenuToRecommendations/AddMenuToRecommendations';
import UpdateRecommendations from '../pages/UpdateRecommendations/UpdateRecommendations';
import StatiscalsPatient from '../pages/StatiscalsPatient/StatiscalsPatient';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import FoodJournal from '../pages/FoodJournal/FoodJournal';
import * as paths from './path';

function Route() {
  return (
    <Fragment>
      <BrowserRouter>
        {/* Components CheckConnection */}
        <CheckConnection exact path={paths.PATH_LOGIN} component={SignIn} />
        <CheckConnection path={paths.PATH_REGISTER} component={SignUp} />
        <CheckConnection
          exact
          path={paths.PATH_RESET_PASSWORD}
          component={ForgotPassword}
        />
        {/* Components PrivateRoute */}
        <PrivateRoute exact path={paths.PATH_DASHBOARD} component={Dashboard} />
        {/* Route Patient */}
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENTS}${paths.PAGE}`}
          component={Patients}
        />
        <PrivateRoute exact path={paths.PATH_PATIENT} component={AddPatient} />
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_CONSULTATION}`}
          component={Consultation}
        />
        <PrivateRoute
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_STATISCALS}`}
          component={StatiscalsPatient}
        />
        <PrivateRoute
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_JOURNAL}`}
          component={FoodJournal}
        />
        {/* Route get  all  recommendation */}
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_RECOMMENDATIONS}`}
          component={Recommendation}
        />
        {/* Route add new  recommendation */}
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_RECOMMENDATION}`}
          component={AddRecommendations}
        />
        {/* Route add menu to a recommendation */}
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_RECOMMENDATION}${paths.ID_RECOMMENDATION}`}
          component={AddMenuToRecommendations}
        />
        {/* Route update recommendation */}
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_RECOMMENDATIONS}${paths.ID_RECOMMENDATION}`}
          component={UpdateRecommendations}
        />
        {/* Route Update Nutritionist */}
        <PrivateRoute exact path={paths.PATH_PROFIL} component={Profil} />
        {/* Route Ingredient */}
        <PrivateRoute
          exact
          path={`${paths.PATH_INGREDIENTS}${paths.PAGE}`}
          component={Ingredients}
        />
        <PrivateRoute
          exact
          path={paths.PATH_INGREDIENT}
          component={AddIngredient}
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_INGREDIENT}${paths.ID}`}
          component={UpdateIngredient}
        />
        {/* Route Menu */}
        {/* Route to add ingredient to a Menu */}
        <PrivateRoute
          exact
          path={`${paths.PATH_MENU}${paths.ID_MENU}${paths.PATH_INGREDIENTS}`}
          component={AddIngredientToMenu}
        />
        {/* Route to get all menus per page */}
        <PrivateRoute
          exact
          path={`${paths.PATH_MENUS}${paths.PAGE}`}
          component={Menus}
        />
        <PrivateRoute exact path={paths.PATH_MENU} component={AddMenu} />
        <PrivateRoute
          exact
          path={`${paths.PATH_MENU}${paths.ID}`}
          component={UpdateMenu}
        />
      </BrowserRouter>
    </Fragment>
  );
}

export default Route;
