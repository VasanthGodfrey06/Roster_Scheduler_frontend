import React from 'react';
import { Route } from 'react-router-dom';

export const Routes = ({ routes, layout = '' }) =>
  routes.map((route, index) => (
    <Route
      key={index}
      exact={route.exact}
      path={layout.length > 0 ? `/${layout}/${route.path}` : `/${route.path}\``}
      component={() => <route.component />}
    />
  ));
