import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import Aux from '../../../hoc/Auxiliary';
import BackDrop from '../../../components/UI/Backdrop/Backdrop';
import PopupBox from '../../../components/UI/PopupBox/PopupBox';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

class AddResourceEvent extends Component {
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
                label: "Start Time",
                elementType: 'datetime',
                elementConfig: {
                    disableClock: true
                },
                value: this.props.start
            },
            end: {
                label: "End Time",
                elementType: 'datetime',
                elementConfig: {
                    disableClock: true
                },
                value: this.props.end
            },
            allDay: {
                label: "Event is All Day",
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: false, displayValue: "No" },
                        { value: true, displayValue: "Yes" }
                    ]
                },
                value: this.props.allDay
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
            },
            recurring: {
                label: "Is the Event Recurring?",
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'true', displayValue: 'Yes' },
                        { value: 'false', displayValue: 'No' }
                    ]
                },
                value: 'false'
            }
        }
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.addForm) {
            formElementArray.push({
                id: key,
                config: this.state.addForm[key]
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
            <Aux>
                <BackDrop show={this.state.popupOpen} />
                <PopupBox>
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button clicked={this.props.close}>CLOSE</Button>
                        <Button clicked={this.submitHandler}>ADD EVENT</Button>
                    </form>
                </PopupBox>
            </Aux >
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onEventAdded: (event, userId) => dispatch(actions.addResourceEvent(event, userId)),
        onEventRemoved: (key, idx) => dispatch(actions.removeResourceEvent(key, idx)),
    }
}

const mapStateToProps = state => {
    return {
        events: state.resourceCalendar.events,
        resources: state.resourceCalendar.resources
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddResourceEvent, axios);