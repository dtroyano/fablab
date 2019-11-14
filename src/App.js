import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import './App.css';

import MyCalendar from './containers/Calendar/Calendar';
import BookClass from './components/Class/Class';
import Equipment from './components/Equipment/Equipment';
import Contact from './components/Contact/Contact';
import HomePage from './components/HomePage/HomePage';
import Layout from './containers/Layout/Layout';
import ResourceCalendar from './containers/ResourceCalendar/RescourceCalendar';
import BlogHomePage from './containers/Blog/Read/Index';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Route path='/' component={Auth} />
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path={['/blog/:id', '/blog']} component={BlogHomePage} />
          <Route path='/auth' exact component={Auth} />
          <Route path='/reserveEquipment' exact component={ResourceCalendar} />
          <Route path='/calendar' exact component={MyCalendar} />
          <Route path='/class' exact component={BookClass} />
          <Route path='/equipment' exact component={Equipment} />
          <Route path='/contact' exact component={Contact} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/' exact component={HomePage} />
        </Switch>
      );
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
