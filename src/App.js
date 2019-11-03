import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import './App.css';

import Contact from './components/Contact/Contact';
import HomePage from './components/HomePage/HomePage';
import Layout from './containers/Layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/contact' exact component={Contact} />
        <Route path='/' exact component={HomePage} />
      </Switch>
    </Layout>
  );
}

export default withRouter(App);
