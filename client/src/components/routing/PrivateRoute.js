import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated } = authContext;

  if (!isAuthenticated) {
    return <Redirect to='/Landing' />;
  } else {
    return <Component {...rest} />;
  }
};

export default PrivateRoute;
