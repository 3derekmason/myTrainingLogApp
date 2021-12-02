import React from 'react';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/home/Home.jsx';
import Profile from './components/profile/Profile.jsx';
import Libraries from './components/libraries/Libraries.jsx';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Layout>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Layout>
      </div>
    </Router>
  );
}

export default App;