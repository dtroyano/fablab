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
        },
        reccurringForm: {
            frequency: {
                label: 'Frequency',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'MONTHLY', displayValue: 'Monthly' },
                        { value: 'WEEKLY', displayValue: 'Weekly' }
                    ]
                },
                value: 'MONTHLY'
            },
            interval: {
                label: 'Interval',
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    min: 1,
                    max: 100
                },
                value: 1
            },
            monday: {
                label: 'Monday',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: -1, displayValue: 'No Event' },
                        { value: 0, displayValue: 'Every Monday' },
                        { value: 1, displayValue: 'Every 1st Monday' },
                        { value: 2, displayValue: 'Every 2nd Monday' },
                        { value: 3, displayValue: 'Every 3rd Monday' },
                        { value: 4, displayValue: 'Every 4th Monday' }
                    ]
                },
                dayOfWeek: true,
                value: -1
            },
            tuesday: {
                label: 'Tuesday',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: -1, displayValue: 'No Event' },
                        { value: 0, displayValue: 'Every Tuesday' },
                        { value: 1, displayValue: 'Every 1st Tuesday' },
                        { value: 2, displayValue: 'Every 2nd Tuesday' },
                        { value: 3, displayValue: 'Every 3rd Tuesday' },
                        { value: 4, displayValue: 'Every 4th Tuesday' }
                    ]
                },
                dayOfWeek: true,
                value: -1
            },
            wednesday: {
                label: 'Wednesday',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: -1, displayValue: 'No Event' },
                        { value: 0, displayValue: 'Every Wednesday' },
                        { value: 1, displayValue: 'Every 1st Wednesday' },
                        { value: 2, displayValue: 'Every 2nd Wednesday' },
                        { value: 3, displayValue: 'Every 3rd Wednesday' },
                        { value: 4, displayValue: 'Every 4th Wednesday' }
                    ]
                },
                dayOfWeek: true,
                value: -1
            },
            thursday: {
                label: 'Thursday',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: -1, displayValue: 'No Event' },
                        { value: 0, displayValue: 'Every Thursday' },
                        { value: 1, displayValue: 'Every 1st Thursday' },
                        { value: 2, displayValue: 'Every 2nd Thursday' },
                        { value: 3, displayValue: 'Every 3rd Thursday' },
                        { value: 4, displayValue: 'Every 4th Thursday' }
                    ]
                },
                dayOfWeek: true,
                value: -1
            },
            friday: {
                label: 'Friday',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: -1, displayValue: 'No Event' },
                        { value: 0, displayValue: 'Every Friday' },
                        { value: 1, displayValue: 'Every 1st Friday' },
                        { value: 2, displayValue: 'Every 2nd Friday' },
                        { value: 3, displayValue: 'Every 3rd Friday' },
                        { value: 4, displayValue: 'Every 4th Friday' }
                    ]
                },
                dayOfWeek: true,
                value: -1
            },
            saturday: {
                label: 'Saturday',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: -1, displayValue: 'No Event' },
                        { value: 0, displayValue: 'Every Saturday' },
                        { value: 1, displayValue: 'Every 1st Saturday' },
                        { value: 2, displayValue: 'Every 2nd Saturday' },
                        { value: 3, displayValue: 'Every 3rd Saturday' },
                        { value: 4, displayValue: 'Every 4th Saturday' }
                    ]
                },
                dayOfWeek: true,
                value: -1
            },
            sunday: {
                label: 'Sunday',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: -1, displayValue: 'No Event' },
                        { value: 0, displayValue: 'Every Sunday' },
                        { value: 1, displayValue: 'Every 1st Sunday' },
                        { value: 2, displayValue: 'Every 2nd Sunday' },
                        { value: 3, displayValue: 'Every 3rd Sunday' },
                        { value: 4, displayValue: 'Every 4th Sunday' }
                    ]
                },
                dayOfWeek: true,
                value: -1
            },
            continuesForever: {
                label: 'Continues Forever',
                elementType: 'input',
                elementConfig: {
                    type: 'checkbox',
                    onClick: this.inputRecurringChangedHandler,
                    defaultChecked: true
                },
                value: true
            },
            endDate: {
                label: "End Date",
                elementType: 'date',
                elementConfig: {
                    disabled: true
                },
                value: this.props.end
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

    recurringDateTimeHandler = (event, inputId) => {
        const updatedForm = { ...this.state.reccurringForm };
        const updatedElement = { ...updatedForm[inputId] };
        updatedElement.value = event;
        updatedForm[inputId] = updatedElement;
        this.setState({ reccurringForm: updatedForm });
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.addForm };
        const updatedElement = { ...updatedForm[inputId] };
        updatedElement.value = event.target.value;
        updatedForm[inputId] = updatedElement;
        this.setState({ addForm: updatedForm });
    }

    inputRecurringChangedHandler = (event, inputId) => {
        const updatedForm = { ...this.state.reccurringForm };
        const updatedElement = { ...updatedForm[inputId] };
        if (inputId === 'continuesForever') {
            let bool = event.target.value === 'true';
            updatedElement.value = !bool;
        } else {
            updatedElement.value = event.target.value;
        }
        updatedForm[inputId] = updatedElement;
        updatedForm.endDate.elementConfig.disabled = updatedForm.continuesForever.value;
        this.setState({ reccurringForm: updatedForm });
    }

    submitHandler = (evt) => {
        evt.preventDefault();
        if (this.state.addForm.recurring.value === 'true') {
            this.recurringEvent();
        } else {
            this.oneTimeEvent();
        }
    }

    dayofWeekHandler = (day) => {
        let dayName = '';
        switch (day.label) {
            case 'Monday': dayName = 'MO'; break;
            case 'Tuesday': dayName = 'TU'; break;
            case 'Wednesday': dayName = 'WE'; break;
            case 'Thursday': dayName = 'TH'; break;
            case 'Friday': dayName = 'FR'; break;
            case 'Saturday': dayName = 'SA'; break;
            case 'Sunday': dayName = 'SU'; break;
            default: dayName = 'error'; break;
        }
        let value = parseInt(day.value);
        if (value === 0) {
            return dayName;
        } else {
            return [dayName, value];
        }
    }

    recurringEvent = () => {
        console.log('made it recurring submit');
        let byDayofWeek = [];
        for (let key in this.state.reccurringForm) {
            if (this.state.reccurringForm[key].dayOfWeek) {
                if (this.state.reccurringForm[key].value >= 0) {
                    byDayofWeek.push(this.dayofWeekHandler(this.state.reccurringForm[key]));
                }
            }
        }
        console.log(byDayofWeek);
        // const rule = {
        //     frequency: this.state.reccurringForm.frequency.value,
        //     byDayOfWeek: ["TU"],
        //     start: time
        // };
        // const details = {
        //     title: 'Recurring Event',
        //     allDay: false,
        //     length: 90,
        //     priority: 0
        // };
        // const event = {
        //     rule: rule,
        //     details: details
        // };
        // let event = {
        //     title: this.state.addForm.title.value,
        //     allDay: this.state.addForm.allDay.value == 'true',
        //     start: this.state.addForm.start.value,
        //     end: this.state.addForm.end.value,
        //     priority: this.state.addForm.priority.value
        // }
        //this.props.onRecurringAdded(event);
    }

    oneTimeEvent = () => {
        let idList = this.props.events.map(a => a.id)
        let newId = Math.max(...idList) + 1
        let event = {
            id: newId,
            title: this.state.addForm.title.value,
            allDay: this.state.addForm.allDay.value == 'true',
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

        const reccuringFormArray = [];
        for (let key in this.state.reccurringForm) {
            reccuringFormArray.push({
                id: key,
                config: this.state.reccurringForm[key]
            });
        }
        let recurringForm = (<Aux>
            {
                reccuringFormArray.map(formElement => (
                    <Input
                        changed={(event) => this.inputRecurringChangedHandler(event, formElement.id)}
                        dateTimeChanged={(event) => this.recurringDateTimeHandler(event, formElement.id)}
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
                        {this.state.addForm.recurring.value === 'true'
                            ? recurringForm
                            : null}
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