import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import './App.css';

//import Selectable from './containers/Calendar/CalendarSelectable';
//import DNDResource from './containers/Calendar/CalendarOutsideSource';

import MyCalendar from './containers/Calendar/Calendar';
import BookClass from './components/Class/Class';
import Equipment from './components/Equipment/Equipment';
import Contact from './components/Contact/Contact';
import HomePage from './components/HomePage/HomePage';
import Layout from './containers/Layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        {/*<Route path='/calendar3' exact component={Selectable} />
        <Route path='/calendar2' exact component={DNDResource} />*/}
        <Route path='/calendar' exact component={MyCalendar} />
        <Route path='/class' exact component={BookClass} />
        <Route path='/equipment' exact component={Equipment} />
        <Route path='/contact' exact component={Contact} />
        <Route path='/' exact component={HomePage} />
      </Switch>
    </Layout>
  );
}

export default withRouter(App);
