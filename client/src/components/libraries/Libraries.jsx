import React from 'react';
import { Route } from 'react-router-dom';

const Libraries = ({ children }) => (
    <div>
      {children}
      Libraries Page
    </div>
  );

  const LibrariesRoute = ({component: Libraries}) => {
    return (
      <Route render={props => (
        <Libraries>
            <Component {...props} />
        </Libraries>
      )} />
    )
  };

export default LibrariesRoute;