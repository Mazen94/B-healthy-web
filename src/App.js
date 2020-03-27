import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { CheckConnection } from './components/CheckConnection/CheckConnection';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute'; //
import AddPatient from './pages/AddPatient/AddPatient';
import Dashboard from './pages/Dashboard/Dashboard';
import Patients from './pages/Patients/Patients';
import Profil from './pages/Profil/Profil';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SingIn/SignIn';
import Ingredients from './pages/Ingredients/Ingredients';
import AddIngredient from './pages/AddIngredient/AddIngredient';
import UpdateIngredient from './pages/UpdateIngredient/UpdateIngredient';
import Menus from './pages/Menus/Menus';
import AddMenu from './pages/AddMenu/AddMenu';
import AddIngredientToMenu from './pages/AddIngredientToMenu/AddIngredientToMenu';
import UpdateMenu from './pages/UpdateMenu/UpdateMenu';
import Consultation from './pages/Consultation/Consultation';
import Recommendation from './pages/Recommendation/Recommendation';
import AddRecommendations from './pages/AddRecommendations/AddRecommendations';
import AddMenuToRecommendations from './pages/AddMenuToRecommendations/AddMenuToRecommendations';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Components CheckConnection */}
        <CheckConnection exact path="/" component={SignIn} />
        <CheckConnection path="/register" component={SignUp} />
        {/* Components PrivateRoute */}
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        {/* Route Patient */}
        <PrivateRoute exact path="/patients/:page" component={Patients} />
        <PrivateRoute exact path="/patient/" component={AddPatient} />
        <PrivateRoute
          exact
          path="/patient/:id/consultation"
          component={Consultation}
        />
        <PrivateRoute
          exact
          path="/patient/:id/recommendations"
          component={Recommendation}
        />
        <PrivateRoute
          exact
          path="/patient/:id/recommendation"
          component={AddRecommendations}
        />
        <PrivateRoute
          exact
          path="/patient/:id/recommendation/:idRecommendation"
          component={AddMenuToRecommendations}
        />
        {/* Route Update Nutritionist */}
        <PrivateRoute exact path="/profil" component={Profil} />
        {/* Route Ingredient */}
        <PrivateRoute exact path="/ingredients/:page" component={Ingredients} />
        <PrivateRoute exact path="/ingredient" component={AddIngredient} />
        <PrivateRoute
          exact
          path="/ingredient/:id"
          component={UpdateIngredient}
        />
        {/* Route Menu */}
        {/* Route to add ingredient to a Menu */}
        <PrivateRoute
          exact
          path="/menu/:menuId/ingredients/"
          component={AddIngredientToMenu}
        />
        {/* Route to get all menus per page */}
        <PrivateRoute exact path="/menus/:page" component={Menus} />
        <PrivateRoute exact path="/menu" component={AddMenu} />
        <PrivateRoute exact path="/menu/:id" component={UpdateMenu} />
      </BrowserRouter>
    </div>
  );
}

export default App;
