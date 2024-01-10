import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProtectedRoute.module.scss';
import { Navigate } from 'react-router-dom';
import AppRoutes from '../../helpers/routes';

const ProtectedRoute = ({ children, redirectOnToken = false }) => {
  const getJWT = () => {
    if (localStorage.getItem("token") !== null) {
      return true;
    }
    return false;
  }
  const hasToken = getJWT();
  return (
    <>
      {
        redirectOnToken === true ?
          (hasToken === false ? children : <Navigate to={AppRoutes.Dashboard} />)
          :
          (hasToken === true ? children : <Navigate to={AppRoutes.Login} />)
      }
    </>
  );
}

ProtectedRoute.propTypes = {};

ProtectedRoute.defaultProps = {};

export default ProtectedRoute;
