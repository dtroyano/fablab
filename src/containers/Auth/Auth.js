import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        authForm: {
            user: '',
            password: ''
        },
        idToken: ''
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.authForm };
        let updatedElement = { ...updatedForm[inputId] };
        updatedElement = event.target.value;
        updatedForm[inputId] = updatedElement;
        this.setState({ authForm: updatedForm });
    }

    signIn = (event) => {
        event.preventDefault();
        this.connectToUsers(false);
    }

    connectToUsers = (isSignup) => {
        this.props.onAuth(this.state.authForm.user, this.state.authForm.password, isSignup);

    }

    render() {
        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to='/' />
        }
        return (
            <div>
                {authRedirect}
                <form>
                    <Input elementType='input' value={this.state.user} changed={(event) => this.inputChangedHandler(event, 'user')} />
                    <Input elementType='input' value={this.state.password} changed={(event) => this.inputChangedHandler(event, 'password')} />
                    <Button clicked={this.signIn}>SIGN IN</Button>
                    <Link to='/signup'>SIGN UP</Link>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        authRedirect: state.auth.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth, axios);