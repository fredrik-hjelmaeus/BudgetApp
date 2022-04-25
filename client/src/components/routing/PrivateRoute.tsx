import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Navigate } from "react-router-dom";

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
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  // if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
