import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Navigate } from "react-router-dom";
import Spinner from "../layout/Spinner";

type ComponentProps = {
  component: React.ComponentType<any>;
};

/* const PrivateRoute = ({ component: Component, ...rest }: ComponentProps) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? <Redirect to="/Landing" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute; */

//import React from 'react';

const PrivateRoute = ({ component: Component }: ComponentProps) => {
  //  console.log("privateroutecomponent here");
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  console.log("isAuthenticated: ", isAuthenticated);
  //  console.log("loading: ", loading);
  if (loading) return <Spinner />;
  if (isAuthenticated && !loading) return <Component />;
  return <Navigate to="/Landing" />;
};

export default PrivateRoute;
// alt way: return isAuthenticated ? <Component /> : <Navigate to="/Landing" />;
