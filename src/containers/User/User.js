import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';

import Aux from '../../hoc/Auxiliary';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class User extends Component {
    state = {
        correctUser: this.props.match.params.id === localStorage.getItem('userId'),
        userUpdated: false,
        userData: {
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
            phone: {
                label: 'Phone Number',
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Phone Number'
                },
                value: ''
            },
            group: {
                label: "Group",
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'community', displayValue: 'Community' },
                        { value: 'delgadoStaff', displayValue: 'Delgado Staff' },
                        { value: 'delgadoTeacher', displayValue: 'Delgado Teacher' },
                        { value: 'fabLabStaff', displayValue: 'FabLab Staff' },
                        { value: 'k12Mentor', displayValue: 'K-12 Mentor' },
                        { value: 'k12Teacher', displayValue: 'K-12 Teacher' },
                        { value: 'delgadoStudent', displayValue: 'Delgado Student' }
                    ]
                },
                value: 'commmunity'
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
            gender: {
                label: "Gender",
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'female', displayValue: 'Female' },
                        { value: 'male', displayValue: 'Male' },
                        { value: 'other', displayValue: 'Other' }
                    ]
                },
                value: 'female'
            }
        }
    }

    updateUserWithProps = () => {
        const updatedForm = { ...this.state.userData };
        const updatedName = { ...updatedForm.name };
        updatedName.value = this.props.user.name
        updatedForm.name = updatedName;
        const updatedEmail = { ...updatedForm.email };
        updatedEmail.value = this.props.user.email
        updatedForm.email = updatedEmail;
        const updatedOrganization = { ...updatedForm.organization };
        updatedOrganization.value = this.props.user.organization
        updatedForm.organization = updatedOrganization;
        const updatedGroup = { ...updatedForm.group };
        updatedGroup.value = this.props.user.group
        updatedForm.group = updatedGroup;
        const updatedPhone = { ...updatedForm.phone };
        updatedPhone.value = this.props.user.phone
        updatedForm.phone = updatedPhone;
        const updatedGender = { ...updatedForm.gender };
        updatedGender.value = this.props.user.gender
        updatedForm.gender = updatedGender;

        this.setState({ userData: updatedForm, userUpdated: true });
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.userData };
        const updatedElement = { ...updatedForm[inputId] };
        updatedElement.value = event.target.value;
        updatedForm[inputId] = updatedElement;
        this.setState({ userData: updatedForm });
    }

    componentDidUpdate() {
        if (!this.state.userUpdated) {
            this.updateUserWithProps()
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        const user = {
            name: this.state.userData.name.value,
            email: this.state.userData.email.value,
            phone: this.state.userData.phone.value,
            group: this.state.userData.group.value,
            organization: this.state.userData.organization.value,
            gender: this.state.userData.gender.value,
            role: this.props.user.role,
            permissions: this.props.user.permissions,
            lastLogin: new Date()
        }
        this.props.onUpdateUser(user, localStorage.getItem('userId'));
    }

    render() {
        let user = <Redirect to='/' />;
        if (this.state.correctUser) {
            const formElementArray = [];
            for (let key in this.state.userData) {
                formElementArray.push({
                    id: key,
                    config: this.state.userData[key]
                });
            }
            user = (
                <Aux>
                    {
                        formElementArray.map(formElement => (
                            <Input
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
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
        }
        return (
            <div>
                {user}
                <Button clicked={this.submitHandler}>UPDATE USER</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateUser: (user, id) => dispatch(actions.updateUserDatabase(user, id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User);
