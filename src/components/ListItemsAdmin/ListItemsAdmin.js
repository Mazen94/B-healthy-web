import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { default as ListItemText } from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import * as paths from '../../routes/path';
import * as strings from '../../shared/strings/strings';
/**
 * Component for showing the list of items in the MenuBar
 */
export default function ListItemsAdmin({
  dashboardProps = false,
  nutritonistProps = false,
}) {
  let history = useHistory(); //useHistory hook gives you access to the history instance that you may use to navigate.
  /**
   * arrow function to navigate to the patient page
   */
  const handleClickPatients = () => {
    history.push(`${paths.PATH_NUTIRITONISTS}/1`);
  };
  /**
   * arrow function to navigate to the dashboard page
   */
  const handleClickDashboard = () => {
    history.push(paths.PATH_DASHBOARD_ADMIN);
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
      <ListItem
        selected={nutritonistProps}
        button
        onClick={handleClickPatients}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={strings.NUTRITIONISTS} />
      </ListItem>
    </Fragment>
  );
}
