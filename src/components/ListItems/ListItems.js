import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {
  default as ListItemLink,
  default as ListItemText,
} from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import PeopleIcon from '@material-ui/icons/People';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import * as strings from '../../shared/strings/strings';
import * as paths from '../../routes/path';
/**
 * Component for showing the list of items in the MenuBar
 */
export default function ListItems({
  dashboardProps = false,
  patientProps = false,
  ingredientsProps = false,
  menusProps = false,
  profilProps = false,
}) {
  let history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  /**
   * arrow function to navigate to the patient page
   */
  const handleClickPatients = () => {
    history.push(`${paths.PATH_PATIENTS}/1`);
  };
  /**
   * arrow function to navigate to the dashboard page
   */
  const handleClickDashboard = () => {
    history.push(paths.PATH_DASHBOARD);
  };
  /**
   * arrow function to navigate to the profil page
   */
  const handleClickProfil = () => {
    history.push(paths.PATH_PROFIL);
  };
  /**
   * arrow function to navigate to the ingredient page
   */
  const handleClickIngredients = () => {
    history.push(`${paths.PATH_INGREDIENTS}/1`);
  };
  /**
   * arrow function to navigate to the menu page
   */
  const handleClickMenus = () => {
    history.push(`${paths.PATH_MENUS}/1`);
  };

  return (
    <Fragment>
      {/* Item Dashboard */}
      <ListItem selected={dashboardProps} button onClick={handleClickDashboard}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={strings.DASHBOARD} />
      </ListItem>
      {/* Item Patient */}
      <ListItem selected={patientProps} button onClick={handleClickPatients}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={strings.PATIENTS} />
      </ListItem>
      {/* Item Ingredients */}
      <ListItem
        selected={ingredientsProps}
        button
        onClick={handleClickIngredients}
      >
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemLink>
          <ListItemText primary={strings.INGREDIENTS} />
        </ListItemLink>
      </ListItem>
      {/* Item Menus */}
      <ListItem selected={menusProps} button onClick={handleClickMenus}>
        <ListItemIcon>
          <RestaurantMenuIcon />
        </ListItemIcon>
        <ListItemText primary={strings.MENUS} />
      </ListItem>
      {/* Item Profil */}
      <ListItem selected={profilProps} button onClick={handleClickProfil}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary={strings.PROFIL} />
      </ListItem>
    </Fragment>
  );
}
