import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import './App.css';

import HomePage from './components/HomePage/HomePage';
import Layout from './containers/Layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={HomePage} />
      </Switch>
    </Layout>
  );
}

export default withRouter(App);
