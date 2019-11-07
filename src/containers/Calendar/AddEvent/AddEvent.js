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
                label: 'Title of Event',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Title of Event'
                },
                value: ''
            },
            start: {
                label: "Start Date",
                elementType: 'datetime',
                value: new Date()
            },
            end: {
                label: "End Date",
                elementType: 'datetime',
                value: new Date()
            },
            allDay: {
                label: "Event is All Day",
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: "false", displayValue: "No" },
                        { value: "true", displayValue: "Yes" }
                    ]
                },
                value: "false"
            },
            priority: {
                label: "Event Priority",
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

    componentDidUpdate() {
        //console.log(this.state.addForm);
    }

    dateTimeHandler = (event, inputId) => {
        const updatedForm = { ...this.state.addForm };
        const updatedElement = { ...updatedForm[inputId] };
        updatedElement.value = event;
        updatedForm[inputId] = updatedElement;
        this.setState({ addForm: updatedForm });
    }


    inputChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.addForm };
        const updatedElement = { ...updatedForm[inputId] };
        updatedElement.value = event.target.value;
        updatedForm[inputId] = updatedElement;
        this.setState({ addForm: updatedForm });
    }

    submitHandler = (evt) => {
        evt.preventDefault();
        let idList = this.props.events.map(a => a.id)
        let newId = Math.max(...idList) + 1
        let event = {
            id: newId,
            title: this.state.addForm.title.value,
            allDay: this.state.addForm.allDay.value === "true",
            start: this.state.addForm.start.value,
            end: this.state.addForm.end.value,
            priority: this.state.addForm.priority.value
        }
        this.props.onEventAdded(event);
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
            ))}
            <Button clicked={this.props.close}>CLOSE</Button>

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

const mapStateToProps = state => {
    return {
        events: state.calendar.events
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent, axios);