import React from 'react';
import { Route } from 'react-router-dom';

const Profile = ({ children }) => (
    <div>
      {children}
      Profile Page
    </div>
  );

  const ProfileRoute = ({component: Profile}) => {
    return (
      <Route render={props => (
        <Profile>
            <Component {...props} />
        </Profile>
      )} />
    )
  };

export default ProfileRoute;