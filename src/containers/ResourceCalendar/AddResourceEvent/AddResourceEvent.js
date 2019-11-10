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
                value: 'USERNAME'
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
            resourceId: {
                label: "Resource",
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 1, displayValue: 'Laser Cutter' },
                        { value: 2, displayValue: 'CNC' },
                        { value: 3, displayValue: 'Vinyl Cutter' },
                        { value: 4, displayValue: '3D Printer' }
                    ]
                },
                value: this.props.resourceId
            }
        }
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.addForm };
        const updatedElement = { ...updatedForm[inputId] };
        updatedElement.value = event.target.value;
        updatedForm[inputId] = updatedElement;
        this.setState({ addForm: updatedForm });
    }

    dateTimeHandler = (event, inputId) => {
        const updatedForm = { ...this.state.addForm };
        const updatedElement = { ...updatedForm[inputId] };
        updatedElement.value = event;
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
            allDay: this.state.addForm.allDay.value === 'true',
            start: this.state.addForm.start.value,
            end: this.state.addForm.end.value,
            resourceId: this.state.addForm.resourceId.value,
            userId: 1

        }
        if (this.props.eventInfo) {
            this.props.onEventRemoved(this.props.eventInfo.key, this.props.eventInfo.idx)
        }
        this.props.onEventAdded(event);
        this.props.close();
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
        onEventAdded: (event) => dispatch(actions.addResourceEvent(event)),
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