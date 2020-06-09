import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { PATH_DASHBOARD } from '../../routes/path';
/**
 * Component to check if the user connects or not
 * if the token exists in the localstorage then the user cannot access the page
 * @param {component} param0
 */
export const CheckConnection = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('token') ? (
          <Redirect to={PATH_DASHBOARD} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
