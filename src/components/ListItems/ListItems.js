import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {
  default as ListItemLink,
  default as ListItemText
} from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import PeopleIcon from '@material-ui/icons/People';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MENUS,
  INGREDIENTS,
  PATIENTS,
  DASHBOARD,
  PROFIL
} from '../../shared/strings/strings';
/**
 * Component for showing the list of items in the MenuBar
 */
export default function ListItems() {
  let history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  /**
   * arrow function to navigate to the patient page
   */
  const handleClickPatients = () => {
    history.push('/patients/1');
  };
  /**
   * arrow function to navigate to the dashboard page
   */
  const handleClickDashboard = () => {
    history.push('/dashboard');
  };
  /**
   * arrow function to navigate to the profil page
   */
  const handleClickProfil = () => {
    history.push('/profil');
  };
  /**
   * arrow function to navigate to the ingredient page
   */
  const handleClickIngredients = () => {
    history.push('/ingredients/1');
  };
  /**
   * arrow function to navigate to the menu page
   */
  const handleClickMenus = () => {
    history.push('/menus/1');
  };

  return (
    <Fragment>
      {/* Item Dashboard */}
      <ListItem button onClick={handleClickDashboard}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={DASHBOARD} />
      </ListItem>
      {/* Item Patient */}
      <ListItem button onClick={handleClickPatients}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={PATIENTS} path="/typography" />
      </ListItem>
      {/* Item Ingredients */}
      <ListItem button onClick={handleClickIngredients}>
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemLink>
          <ListItemText primary={INGREDIENTS} />
        </ListItemLink>
      </ListItem>
      {/* Item Menus */}
      <ListItem button onClick={handleClickMenus}>
        <ListItemIcon>
          <RestaurantMenuIcon />
        </ListItemIcon>
        <ListItemText primary={MENUS} />
      </ListItem>
      {/* Item Profil */}
      <ListItem button onClick={handleClickProfil}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary={PROFIL} />
      </ListItem>
    </Fragment>
  );
}
