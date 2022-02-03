import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, loading } = authContext;
  console.log('privRoute:', isAuthenticated);

  if (!isAuthenticated && !loading) {
    return <Redirect to='/Landing' />;
  } else {
    return <Component {...rest} />;
  }
};

export default PrivateRoute;
