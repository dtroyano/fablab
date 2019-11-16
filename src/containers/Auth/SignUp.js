import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions/index';

import Aux from '../../hoc/Auxiliary';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class SignUp extends Component {
    state = {
        newUser: {
            name: {
                label: 'Full Name',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Full Name'
                },
                value: ''
            },
            email: {
                label: 'Email',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            password: {
                label: 'Password',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Password'
                },
                value: ''
            },
            phone: {
                label: 'Phone Number',
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Phone Number'
                },
                value: ''
            },
            community: {
                label: "Community",
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'delgadoStaff', displayValue: 'Delgado Staff' },
                        { value: 'delgadoTeacher', displayValue: 'Delgado Teacher' },
                        { value: 'fabLabStaff', displayValue: 'FabLab Staff' },
                        { value: 'k12Mentor', displayValue: 'K-12 Mentor' },
                        { value: 'k12Teacher', displayValue: 'K-12 Teacher' },
                        { value: 'delgadoStudent', displayValue: 'Delgado Student' }
                    ]
                },
                value: 'delgadoStaff'
            },
            organization: {
                label: 'Organization',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Organization'
                },
                value: ''
            },
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.state.newUser.email.value;
        const password = this.state.newUser.password.value;
        const user = {
            name: this.state.newUser.name.value,
            email: this.state.newUser.email.value,
            phone: this.state.newUser.phone.value,
            community: this.state.newUser.community.value,
            organization: this.state.newUser.organization.value,
            role: 'user',
            permissions: [],
            lastLogin: new Date()
        }
        this.props.onSignUp(email, password, true, user);
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.newUser };
        const updatedElement = { ...updatedForm[inputId] };
        updatedElement.value = event.target.value;
        updatedForm[inputId] = updatedElement;
        this.setState({ newUser: updatedForm });
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.newUser) {
            formElementArray.push({
                id: key,
                config: this.state.newUser[key]
            });
        }

        let form = (<Aux>
            {
                formElementArray.map(formElement => (
                    <Input
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        dateTimeChanged={(event) => this.dateTimeHandler(event, formElement.id)}
                        key={formElement.id}
                        elementId={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        label={formElement.config.label}
                    //invalid={!formElement.config.valid}
                    //shouldValidate={formElement.config.validation}
                    //touched={formElement.config.touched} 
                    />
                ))
            }
        </Aux>);

        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button clicked={this.submitHandler}>SIGN IN</Button>
                </form>
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
        onSignUp: (email, password, isSignup, user) => dispatch(actions.auth(email, password, isSignup, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp, axios);