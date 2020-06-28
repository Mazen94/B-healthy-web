import React, { Fragment, useEffect, useState, useContext } from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { CheckConnection } from '../components/CheckConnection/CheckConnection';
import { PrivateRoute } from '../components/PrivateRoute/PrivateRoute'; //
import AddPatient from '../pages/AddPatient/AddPatient';
import Dashboard from '../pages/Dashboard/Dashboard';
import Patients from '../pages/Patients/Patients';
import Profil from '../pages/Profil/Profil';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SingIn/SignIn';
import SignInAdmin from '../pages/SignInAdmin/SignInAdmin';
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
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import NotFound from '../pages/NotFound/NotFound';
import Nutritionists from '../pages/Nutritionists/Nutritionists';
import { IsActivateContext } from '../shared/context/IsActivateContext';
import { IsAdminContext } from '../shared/context/IsAdminContext';

function Route() {
  const { isActivate, setIsActivate } = useContext(IsActivateContext);
  const { isAdmin, setIsAdmin } = useContext(IsAdminContext);

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
        <CheckConnection
          exact
          path={paths.PATH_ADMIN}
          component={SignInAdmin}
        />

        <PrivateRoute
          exact
          path={paths.PATH_DASHBOARD_ADMIN}
          component={() => (isAdmin ? <AdminDashboard /> : <NotFound />)}
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_NUTIRITONISTS}${paths.PAGE}`}
          component={() => (isAdmin ? <Nutritionists /> : <NotFound />)}
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_NOT_ACTIVATE}`}
          component={NotActivate}
        />
        <PrivateRoute
          exact
          path={paths.PATH_DASHBOARD}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <Dashboard />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        {/* Components PrivateRoute */}
        <PrivateRoute
          exact
          path={paths.PATH_MEETING}
          component={() =>
            !isAdmin ? isActivate ? <Meeting /> : <NotActivate /> : <NotFound />
          }
        />
        {/* Route Patient */}
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENTS}${paths.PAGE}`}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <Patients />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        <PrivateRoute
          exact
          path={paths.PATH_PATIENT}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <AddPatient />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_CONSULTATION}`}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <Consultation />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_STATISCALS}`}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <StatiscalsPatient />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_JOURNAL}`}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <FoodJournal />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        {/* Route get  all  recommendation */}
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_RECOMMENDATIONS}`}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <Recommendation />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_RECOMMENDATION}`}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <AddRecommendations />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_RECOMMENDATION}${paths.ID_RECOMMENDATION}`}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <AddMenuToRecommendations />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        {/* Route update recommendation */}

        <PrivateRoute
          exact
          path={`${paths.PATH_PATIENT}${paths.ID}${paths.PATH_RECOMMENDATIONS}${paths.ID_RECOMMENDATION}`}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <UpdateRecommendations />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        {/* Route Update Nutritionist */}
        <PrivateRoute
          exact
          path={paths.PATH_PROFIL}
          component={() =>
            !isAdmin ? isActivate ? <Profil /> : <NotActivate /> : <NotFound />
          }
        />

        {/* Route Ingredient */}
        <PrivateRoute
          exact
          path={`${paths.PATH_INGREDIENTS}${paths.PAGE}`}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <Ingredients />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        <PrivateRoute
          exact
          path={paths.PATH_INGREDIENT}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <AddIngredient />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_INGREDIENT}${paths.ID}`}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <UpdateIngredient />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_MENU}${paths.ID_MENU}${paths.PATH_INGREDIENTS}`}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <AddIngredientToMenu />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_MENUS}${paths.PAGE}`}
          component={() =>
            !isAdmin ? isActivate ? <Menus /> : <NotActivate /> : <NotFound />
          }
        />
        <PrivateRoute
          exact
          path={paths.PATH_MENU}
          component={() =>
            !isAdmin ? isActivate ? <AddMenu /> : <NotActivate /> : <NotFound />
          }
        />
        <PrivateRoute
          exact
          path={`${paths.PATH_MENU}${paths.ID}`}
          component={() =>
            !isAdmin ? (
              isActivate ? (
                <UpdateMenu />
              ) : (
                <NotActivate />
              )
            ) : (
              <NotFound />
            )
          }
        />
      </BrowserRouter>
    </Fragment>
  );
}

export default Route;
