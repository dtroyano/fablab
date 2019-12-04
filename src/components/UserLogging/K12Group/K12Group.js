import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
import Backdrop from '../../UI/Backdrop/Backdrop';
import PopupBox from '../../UI/PopupBox/PopupBox';
import Input from '../../UI/Input/Input';


class K12Group extends Component {
    state = {
        showForm: false,
        k12Form: {
            numStudents: {
                label: 'Number of Students',
                elementType: 'input',
                elementConfig: {
                    type: 'number'
                },
                value: '0'
            },
            numMale: {
                label: 'Number of Male Students',
                elementType: 'input',
                elementConfig: {
                    type: 'number'
                },
                value: '0'
            },
            numFemale: {
                label: 'Number of Female Students',
                elementType: 'input',
                elementConfig: {
                    type: 'number'
                },
                value: '0'
            },
            numOther: {
                label: 'Number of Other Students',
                elementType: 'input',
                elementConfig: {
                    type: 'number'
                },
                value: '0'
            },
            numTeachers: {
                label: 'Number of Teachers/Chaperones',
                elementType: 'input',
                elementConfig: {
                    type: 'number'
                },
                value: '0'
            },
            numUnderprivileged: {
                label: 'Number of Underprivileged Students',
                elementType: 'input',
                elementConfig: {
                    type: 'number'
                },
                value: '0'
            },
            returning: {
                label: "Has this class been before?",
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'returning', displayValue: 'Returning Class' },
                        { value: 'firstTime', displayValue: 'First Time Class' }
                    ]
                },
                value: 'firstTime'
            }
        }
    }

    toggleShowForm = () => {
        this.setState({ showForm: !this.state.showForm });
    }

    submitK12Class = (event) => {
        event.preventDefault();
        const groupData = {
            numStudents: this.state.k12Form.numStudents.value,
            numMale: this.state.k12Form.numMale.value,
            numFemale: this.state.k12Form.numFemale.value,
            numOther: this.state.k12Form.numOther.value,
            numTeachers: this.state.k12Form.numTeachers.value,
            numUnderprivileged: this.state.k12Form.numUnderprivileged.value,
            returning: this.state.k12Form.returning.value,
            date: new Date().toDateString()
        };
        this.props.onK12GroupCheckIn(groupData);
        this.toggleShowForm();
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.k12Form };
        const updatedElement = { ...updatedForm[inputId] };
        updatedElement.value = event.target.value;
        updatedForm[inputId] = updatedElement;
        this.setState({ k12Form: updatedForm });
    }

    render() {
        let form = null;
        if (this.state.showForm) {
            const formElementArray = [];
            for (let key in this.state.k12Form) {
                if (key !== 'reason') {
                    formElementArray.push({
                        id: key,
                        config: this.state.k12Form[key]
                    });
                }
            }
            form = (
                <Aux>
                    <Backdrop show={this.state.showForm} clicked={this.toggleShowForm} />
                    <PopupBox>
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
                        <Button clicked={this.submitK12Class}>Check In Class</Button>
                        <Button clicked={this.toggleShowForm}>Cancel</Button>
                    </PopupBox>
                </Aux>);
        }

        return (
            <Aux>
                {form}
                <Button clicked={this.toggleShowForm}>K12 Group</Button>
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onK12GroupCheckIn: (groupData) => dispatch(actions.checkInK12Group(groupData))
    }
}

export default connect(null, mapDispatchToProps)(K12Group);