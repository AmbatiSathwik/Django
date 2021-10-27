import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {isAutenticated} from './index';

function PrivateRoutes({ children, ...rest }) {
    
    return (
      <Route
        {...rest}
        render={(props) =>
        isAutenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
}

export default PrivateRoutes;
