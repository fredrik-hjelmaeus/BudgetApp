import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

type ComponentProps = {
  component: React.ComponentType<any>;
};

const PrivateRoute = ({ component: Component, ...rest }: ComponentProps) => {
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

export default PrivateRoute;
