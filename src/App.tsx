import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { sessionRoutes } from './routing';

import './App.scss';
import { useHideLoader } from './hooks/useHideLoader';
import AuthProvieder from './Context/AuthContext';
import { Routes } from './Routes';
import ProtectedRoute from './ProtectedRoute';

const SessionRoutes = () => <Routes routes={sessionRoutes} layout='public' />;

const App = () => {
  useHideLoader();

  return (
    <AuthProvieder>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/public/sign-in' />
        </Route>
        <Route path='/public'>
          <SessionRoutes />
        </Route>
        <ProtectedRoute />
      </Switch>
    </AuthProvieder>
  );
};

export default App;
