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
import FoodJournal from '../pages/FoodJournal/FoodJournal';
import {
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_DASHBOARD,
  PATH_PATIENTS,
  PATH_PATIENT,
  PATH_CONSULTATION,
  PATH_RECOMMENDATIONS,
  PATH_RECOMMENDATION,
  PATH_PROFIL,
  PATH_INGREDIENTS,
  PATH_INGREDIENT,
  PATH_MENUS,
  PATH_MENU,
  PATH_JOURNAL,
  ID,
  PAGE,
  ID_MENU,
  ID_RECOMMENDATION
} from './path';

function Route() {
  return (
    <Fragment>
      <BrowserRouter>
        {/* Components CheckConnection */}
        <CheckConnection exact path={PATH_LOGIN} component={SignIn} />
        <CheckConnection path={PATH_REGISTER} component={SignUp} />
        {/* Components PrivateRoute */}
        <PrivateRoute exact path={PATH_DASHBOARD} component={Dashboard} />
        {/* Route Patient */}
        <PrivateRoute
          exact
          path={`${PATH_PATIENTS}${PAGE}`}
          component={Patients}
        />
        <PrivateRoute exact path={PATH_PATIENT} component={AddPatient} />
        <PrivateRoute
          exact
          path={`${PATH_PATIENT}${ID}${PATH_CONSULTATION}`}
          component={Consultation}
        />
        <PrivateRoute
          path={`${PATH_PATIENT}${ID}${PATH_JOURNAL}`}
          component={FoodJournal}
        />
        {/* Route get  all  recommendation */}
        <PrivateRoute
          exact
          path={`${PATH_PATIENT}${ID}${PATH_RECOMMENDATIONS}`}
          component={Recommendation}
        />
        {/* Route add new  recommendation */}
        <PrivateRoute
          exact
          path={`${PATH_PATIENT}${ID}${PATH_RECOMMENDATION}`}
          component={AddRecommendations}
        />
        {/* Route add menu to a recommendation */}
        <PrivateRoute
          exact
          path={`${PATH_PATIENT}${ID}${PATH_RECOMMENDATION}${ID_RECOMMENDATION}`}
          component={AddMenuToRecommendations}
        />
        {/* Route update recommendation */}
        <PrivateRoute
          exact
          path={`${PATH_PATIENT}${ID}${PATH_RECOMMENDATIONS}${ID_RECOMMENDATION}`}
          component={UpdateRecommendations}
        />
        {/* Route Update Nutritionist */}
        <PrivateRoute exact path={PATH_PROFIL} component={Profil} />
        {/* Route Ingredient */}
        <PrivateRoute
          exact
          path={`${PATH_INGREDIENTS}${PAGE}`}
          component={Ingredients}
        />
        <PrivateRoute exact path={PATH_INGREDIENT} component={AddIngredient} />
        <PrivateRoute
          exact
          path={`${PATH_INGREDIENT}${ID}`}
          component={UpdateIngredient}
        />
        {/* Route Menu */}
        {/* Route to add ingredient to a Menu */}
        <PrivateRoute
          exact
          path={`${PATH_MENU}${ID_MENU}${PATH_INGREDIENTS}`}
          component={AddIngredientToMenu}
        />
        {/* Route to get all menus per page */}
        <PrivateRoute exact path={`${PATH_MENUS}${PAGE}`} component={Menus} />
        <PrivateRoute exact path={PATH_MENU} component={AddMenu} />
        <PrivateRoute exact path={`${PATH_MENU}${ID}`} component={UpdateMenu} />
      </BrowserRouter>
    </Fragment>
  );
}

export default Route;
