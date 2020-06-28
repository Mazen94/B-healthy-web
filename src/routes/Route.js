import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';
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
import Meeting from '../pages/Meeting/Meeting';
import NotActivate from '../pages/NotActivate/NotActivate';

function Route() {
  const isActivate = localStorage.getItem('status') === '1';
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
        <PrivateRoute
          exact
          path={`${paths.PATH_NOT_ACTIVATE}`}
          component={NotActivate}
        />
        <PrivateRoute
          exact
          path={paths.PATH_DASHBOARD}
          component={() => (isActivate ? <Dashboard /> : <NotActivate />)}
        />
        {/* Components PrivateRoute */}
        <PrivateRoute
          exact
          path={paths.PATH_MEETING}
          component={() => (isActivate ? <Meeting /> : <NotActivate />)}
        />
        {/* Route Patient */}
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENTS}${paths.PAGE}`}
          component={() => (isActivate ? <Patients /> : <NotActivate />)}
        />
        <PrivateRoute
          exact
          path={paths.PATH_PATIENT}
          component={() => (isActivate ? <AddPatient /> : <NotActivate />)}
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_CONSULTATION}`}
          component={() => (isActivate ? <Consultation /> : <NotActivate />)}
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_STATISCALS}`}
          component={() =>
            isActivate ? <StatiscalsPatient /> : <NotActivate />
          }
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_JOURNAL}`}
          component={() => (isActivate ? <FoodJournal /> : <NotActivate />)}
        />
        {/* Route get  all  recommendation */}
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_RECOMMENDATIONS}`}
          component={() => (isActivate ? <Recommendation /> : <NotActivate />)}
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_RECOMMENDATION}`}
          component={() =>
            isActivate ? <AddRecommendations /> : <NotActivate />
          }
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_RECOMMENDATION}${paths.ID_RECOMMENDATION}`}
          component={() =>
            isActivate ? <AddMenuToRecommendations /> : <NotActivate />
          }
        />
        {/* Route update recommendation */}

        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_RECOMMENDATIONS}${paths.ID_RECOMMENDATION}`}
          component={() =>
            isActivate ? <UpdateRecommendations /> : <NotActivate />
          }
        />
        {/* Route Update Nutritionist */}
        <PrivateRoute
          exact
          path={paths.PATH_PROFIL}
          component={() => (isActivate ? <Profil /> : <NotActivate />)}
        />

        {/* Route Ingredient */}
        <PrivateRoute
          exact
          path={`${paths.PATH_INGREDIENTS}${paths.PAGE}`}
          component={() => (isActivate ? <Ingredients /> : <NotActivate />)}
        />
        <PrivateRoute
          exact
          path={paths.PATH_INGREDIENT}
          component={() => (isActivate ? <AddIngredient /> : <NotActivate />)}
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_INGREDIENT}${paths.ID}`}
          component={() =>
            isActivate ? <UpdateIngredient /> : <NotActivate />
          }
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_MENU}${paths.ID_MENU}${paths.PATH_INGREDIENTS}`}
          component={() =>
            isActivate ? <AddIngredientToMenu /> : <NotActivate />
          }
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_MENUS}${paths.PAGE}`}
          component={() => (isActivate ? <Menus /> : <NotActivate />)}
        />
        <PrivateRoute
          exact
          path={paths.PATH_MENU}
          component={() => (isActivate ? <AddMenu /> : <NotActivate />)}
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_MENU}${paths.ID}`}
          component={() => (isActivate ? <UpdateMenu /> : <NotActivate />)}
        />
      </BrowserRouter>
    </Fragment>
  );
}

export default Route;
