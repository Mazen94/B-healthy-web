import { Route, Redirect } from 'react-router-dom';
import React from 'react';
/**
 * Component to check if the user connects or not
 * if the token exists in the localstorage then the user can access the page
 * @param {component} param0
 */
export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
