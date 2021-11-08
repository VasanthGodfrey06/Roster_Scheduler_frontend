import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import VerticalLayout from './layout/vertical/Vertical';
import { defaultRoutes } from './routing';
import { Routes } from './Routes';

function ProtectedRoute() {
  const DefaultRoutes = ({ layout }) => <Routes routes={defaultRoutes} layout={layout} />;
  return (
    <>
      <Route
        render={(props) => {
          if (localStorage.getItem('token')) {
            console.log('token');

            return (
              <VerticalLayout {...props}>
                <DefaultRoutes layout='vertical' />
              </VerticalLayout>
            );
          } else {
            console.log('no tok');

            return <Redirect to='/public' />;
          }
        }}
      />
    </>
  );
}

export default ProtectedRoute;
