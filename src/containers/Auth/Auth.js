import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

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
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxQL1nIOEJvGNZmwXe2Vb-dZ3Vt1GBse8'
        this.connectToUsers(url);
    }

    signUp = (event) => {
        event.preventDefault();
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxQL1nIOEJvGNZmwXe2Vb-dZ3Vt1GBse8';
        this.connectToUsers(url);
    }

    connectToUsers = (url) => {
        const authData = {
            email: this.state.authForm.user,
            password: this.state.authForm.password,
            returnSecureToken: true
        }
        axios.post(url, authData)
            .then(resp => {
                console.log(resp.data);

                this.setState({ idToken: resp.data.idToken });
            })
            .catch(err => {
                console.log(err);
            })
    }

    getUserData = (event) => {
        console.log(this.state.idToken)
        event.preventDefault();
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBxQL1nIOEJvGNZmwXe2Vb-dZ3Vt1GBse8', { idToken: this.state.idToken })
            .then(resp => {
                console.log(resp);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                AUTH
                <form>
                    <Input elementType='input' value={this.state.user} changed={(event) => this.inputChangedHandler(event, 'user')} />
                    <Input elementType='input' value={this.state.password} changed={(event) => this.inputChangedHandler(event, 'password')} />
                    <Button clicked={this.signIn}>SIGN IN</Button>
                    <Button clicked={this.signUp}>SIGN UP</Button>
                </form>
                <Button clicked={this.getUserData}>GET USER</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth, axios);