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
import AuthLogic from './containers/Auth/AuthLogic';
import SignUp from './containers/Auth/SignUp';
import User from './containers/User/User';
import Staff from './containers/Staff/Staff';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    if (this.props.isAuth && !this.props.userLoaded) {
      this.props.onGetUserForState(localStorage.getItem('userId'))
    }
    //USE this.props.role TO CONTROL ROUTING 
    let routes = (
      <Switch>
        <Route path='/' component={Auth} />
      </Switch>
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
          <Route path='/signup' exact component={SignUp} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/staff' exact component={Staff} />
          <Route path='/:id' exact component={User} />
          <Route path='/' exact component={HomePage} />
        </Switch>
      );
    }
    return (
      <AuthLogic>
        <Layout role={this.props.role}>
          {routes}
        </Layout>
      </AuthLogic>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
    role: state.auth.user.role,
    userLoaded: state.auth.user.userLoaded
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onGetUserForState: (id) => dispatch(actions.getUserForState(id))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
