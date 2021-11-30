import React from "react";
import { Route, Redirect } from "react-router";

import browserRoute from "../../Routes/browserRoutes";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  isLoading,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        // isAuthenticated || token ? (
        true || true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: browserRoute.HOME,
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
