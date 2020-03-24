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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Components CheckConnection */}
        <CheckConnection exact path="/" component={SignIn} />
        <CheckConnection path="/register" component={SignUp} />
        {/* Components PrivateRoute */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        {/* Route Patient */}
        <PrivateRoute path="/patients/:page" component={Patients} />
        <PrivateRoute path="/patient/" component={AddPatient} />
        {/* Route Update Nutritionist */}
        <PrivateRoute path="/profil" component={Profil} />
        {/* Route Ingredient */}
        <PrivateRoute path="/ingredients/:page" component={Ingredients} />
        <PrivateRoute path="/ingredient" component={AddIngredient} />
        <PrivateRoute path="/editIngredient/:id" component={UpdateIngredient} />
        {/* Route Menu */}
        <PrivateRoute
          path="/menu/:menuId/ingredients"
          component={AddIngredientToMenu}
        />
        <PrivateRoute exact path="/menus/:page" component={Menus} />
        <PrivateRoute exact path="/menu" component={AddMenu} />
      </BrowserRouter>
    </div>
  );
}

export default App;
