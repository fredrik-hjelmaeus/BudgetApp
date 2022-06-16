import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Navigate } from "react-router-dom";
import Spinner from "../layout/Spinner";

type ComponentProps = {
  component: React.ComponentType<any>;
};

const PrivateRoute = ({ component: Component }: ComponentProps) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  console.log(isAuthenticated, loading);
  if (loading) return <Spinner />;
  if (isAuthenticated && !loading) return <Component />;
  return <Navigate to="/Landing" />;
};

export default PrivateRoute;
