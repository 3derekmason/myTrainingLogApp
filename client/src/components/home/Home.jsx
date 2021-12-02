import React from 'react';
import { Route } from 'react-router-dom';

const Home = ({ children }) => (
    <div>
      {children}
      Home Page
    </div>
  );

  const HomeRoute = ({component: Home}) => {
    return (
      <Route render={props => (
        <Home>
            <Component {...props} />
        </Home>
      )} />
    )
  };

export default HomeRoute;