import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index';

import classes from './Scanner.module.css';

import K12Group from '../../../components/UserLogging/K12Group/K12Group';
import Manual from '../../../components/UserLogging/Manual/Manual';
import Reason from '../../../components/UserLogging/Reason/Reason';
import CheckOut from '../../../components/UserLogging/CheckOut/CheckOut';
import ScannerModule from '../../../components/UserLogging/Scanner/Scanner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Aux from '../../../hoc/Auxiliary';
import Error from '../../../components/UI/Error/Error';

class Scanner extends Component {
    state = {
        scanner: true,
        checkIn: false,
        checkOut: false,
        fillUser: false,
        userData: {
            email: {
                label: 'Email',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
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
            },
            reason: {
                label: "Reason For Visiting",
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'communityClass', displayValue: 'Community Class' },
                        { value: 'delgadoClass', displayValue: 'Delgado Class' },
                        { value: 'smallBuisness', displayValue: 'Small Business' },
                        { value: 'personalProject', displayValue: 'Personal Project' },
                        { value: 'other', displayValue: 'Other' }
                    ]
                },
                value: 'commmunityClass'
            }
        }
    }

    lookupEmail = (event) => {
        event.preventDefault();
        this.setState({ fillUser: true });
        this.props.onFindUserByEmail(this.state.userData.email.value);
    }

    checkInToggle = () => {
        this.setState({ checkIn: !this.state.checkIn });
    }

    checkOutToggle = () => {
        this.setState({ checkOut: !this.state.checkOut })
    }

    checkInUser = (event) => {
        event.preventDefault();
        const userToCheckIn = {
            group: this.state.userData.group.value,
            organization: this.state.userData.organization.value,
            gender: this.state.userData.gender.value,
            reason: this.state.userData.reason.value,
            checkIn: new Date()
        }
        this.props.onCheckInUser(userToCheckIn, this.state.userData.email.value);
        const emptyForm = this.clearForm();
        this.setState({ checkIn: false, userData: emptyForm });
    }

    checkOutUser = (event) => {
        event.preventDefault();
        this.props.onCheckOutUser(this.state.userData.email.value);
        const emptyForm = this.clearForm();
        this.setState({ checkOut: false, userData: emptyForm })
    }

    clearForm = () => {
        const updatedForm = { ...this.state.userData };
        const updatedEmail = { ...updatedForm.email };
        updatedEmail.value = '';
        updatedForm.email = updatedEmail;
        const updatedGroup = { ...updatedForm.group };
        updatedGroup.value = 'community';
        updatedForm.group = updatedGroup;
        const updatedOrganization = { ...updatedForm.organization };
        updatedOrganization.value = '';
        updatedForm.organization = updatedOrganization;
        const updatedGender = { ...updatedForm.gender };
        updatedGender.value = 'female'
        updatedForm.gender = updatedGender;
        return updatedForm;
    }

    componentDidUpdate() {
        //Find a better hook to update the state
        if (this.state.fillUser && this.props.found) {
            const updatedForm = { ...this.state.userData };
            const updatedGroup = { ...updatedForm.group };
            updatedGroup.value = this.props.user.group
            updatedForm.group = updatedGroup;
            const updatedOrganization = { ...updatedForm.organization };
            updatedOrganization.value = this.props.user.organization
            updatedForm.organization = updatedOrganization;
            const updatedGender = { ...updatedForm.gender };
            updatedGender.value = this.props.user.gender
            updatedForm.gender = updatedGender;
            this.setState({ fillUser: false, userData: updatedForm });
        }
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.userData };
        const updatedElement = { ...updatedForm[inputId] };
        updatedElement.value = event.target.value;
        updatedForm[inputId] = updatedElement;
        this.setState({ userData: updatedForm });
    }

    swapModule = (event) => {
        event.preventDefault();
        this.setState({ scanner: !this.state.scanner });
    }

    render() {
        let module = <ScannerModule />
        let moduleName = 'Manual Entry';
        if (!this.state.scanner) {
            module = <Manual />
            moduleName = 'Scanner Entry'
        }
        const formElementArray = [];
        for (let key in this.state.userData) {
            if (key !== 'reason') {
                formElementArray.push({
                    id: key,
                    config: this.state.userData[key]
                });
            }
        }
        const user = (
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
        let error = null;
        if (this.props.notFound) {
            error = (<Error>User not Found</Error>)
        }
        let checkIn = null;
        if (this.state.checkIn) {
            checkIn = <Reason
                show={this.state.checkIn}
                modalClicked={this.checkInToggle}
                checkInUser={this.checkInUser}
                form={this.state.userData.reason}
                inputChangedHandler={this.inputChangedHandler} />
        } else if (this.state.checkOut) {
            checkIn = <CheckOut
                show={this.state.checkOut}
                modalClicked={this.checkOutToggle}
                checkOutUser={this.checkOutUser}
                form={this.state.userData.email}
                inputChangedHandler={this.inputChangedHandler} />
        }

        return (
            <div>
                {checkIn}
                <div className={classes.Scanner}>
                    {module}
                    <div className={classes.User}>
                        <Button clicked={this.lookupEmail}>Lookup By Email</Button>
                        {error}
                        {user}
                        <Button clicked={this.checkInToggle}>Check In</Button>
                        <Button clicked={this.checkOutToggle}>Check Out</Button>
                    </div>
                </div>
                {/*/<Button clicked={this.swapModule}>Swap to {moduleName}</Button>*/}
                <K12Group />
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        user: state.tracking.user,
        notFound: state.tracking.notFound,
        found: state.tracking.found
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFindUserByEmail: (email) => dispatch(actions.findUserByEmail(email)),
        onCheckInUser: (userData, email) => dispatch(actions.checkInUser(userData, email)),
        onCheckOutUser: (email) => dispatch(actions.checkOutUser(email))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Scanner);