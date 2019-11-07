import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import axios from '../../../axios-orders';

import Aux from '../../../hoc/Auxiliary';
import BackDrop from '../../../components/UI/Backdrop/Backdrop';
import PopupBox from '../../../components/UI/PopupBox/PopupBox';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

class AddEvent extends Component {
    state = {
        popupOpen: true,
        addForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title of Event'
                },
                value: ''
            },
            start: {
                elementType: 'date',
                value: 0
            },
            end: {
                elementType: 'date',
                value: 0
            },
            allDay: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: false, displayValue: "No" },
                        { value: true, displayValue: "Yes" }
                    ]
                }
            },
            priority: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: '0', displayValue: 'Low' },
                        { value: '1', displayValue: 'High' }
                    ]
                },
                value: 0
            }
        }
    };

    inputChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.addForm };
        const updatedElement = { ...updatedForm[inputId] };
        updatedElement.value = event.target.value;
        //updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        //updatedFormElement.touched = true;
        updatedForm[inputId] = updatedElement;
        this.setState({ addForm: updatedForm });

    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.addForm);
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.addForm) {
            formElementArray.push({
                id: key,
                config: this.state.addForm[key]
            });
        }

        let form = (<form onSubmit={this.submitHandler}>
            {formElementArray.map(formElement => (
                <Input
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                //invalid={!formElement.config.valid}
                //shouldValidate={formElement.config.validation}
                //touched={formElement.config.touched} 
                />
            ))}
            <Button clicked={this.submitHandler}>ADD EVENT</Button>
        </form>);

        return (
            <Aux>
                <BackDrop show={this.state.popupOpen} />
                <PopupBox>
                    {form}
                </PopupBox>
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEventAdded: (event) => dispatch(actions.addEvent(event)),
        onRecurringAdded: (event) => dispatch(actions.recurringAdded(event))
    }
}

export default connect(null, mapDispatchToProps)(AddEvent, axios);