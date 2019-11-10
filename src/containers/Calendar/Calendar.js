import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import axios from '../../axios-orders';
import moment from 'moment';

import CalendarPopUp from '../../components/UI/CalendarPopUp/CalendarPopUp';
import AddEvent from './AddEvent/AddEvent';

const DragAndDropCalendar = withDragAndDrop(Calendar);

class MyCalendar extends Component {
    constructor(props) {
        super(props);
        this.moveEvent = this.moveEvent.bind(this);
    }
    state = {
        addEvent: false,
        updateEvent: false,
        eventStart: new Date(),
        eventEnd: new Date(),
        allDay: false,
        currentView: {
            start: new Date(),
            end: new Date()
        },
        showEvent: false,
        popUp: {
            title: '',
            time: '',
            key: '',
            recurring: '',
            idx: 0,
            location: {
                x: 0,
                y: 0
            }
        },
        mouseLocation: {
            x: 0,
            y: 0
        }
    }

    componentDidMount() {
        this.props.onInitCalendar();
        let start = new Date();
        let end = new Date();
        start = new Date(start.setDate(start.getDate() - 7))
        end = new Date(end.setDate(end.getDate() + 7));
        this.findRecurringEvents([start, end]);
    }

    moveEvent({ event: evt, start, end, isAllDay: droppedOnAllDaySlot }) {
        this.setState({ showEvent: false });
        if (!evt.recurring) {
            const { events } = this.props;
            const idx = events.indexOf(evt);
            let allDay = evt.allDay;

            if (!evt.allDay && droppedOnAllDaySlot) {
                allDay = true;
            } else if (evt.allDay && !droppedOnAllDaySlot) {
                allDay = false;
            }
            const event = {
                title: evt.title,
                priority: evt.priority,
                start,
                end,
                allDay
            };
            this.props.onEventAdded(event);
            this.props.onEventRemoved(evt.key, idx);
        }
    }

    resizeEvent = ({ event: evt, start, end }) => {
        this.setState({ showEvent: false });
        if (!evt.recurring) {
            const { events } = this.props;
            const idx = events.indexOf(evt);
            const event = {
                title: evt.title,
                allDay: evt.allDay,
                priority: evt.priority,
                start,
                end
            };
            this.props.onEventAdded(event);
            this.props.onEventRemoved(evt.key, idx);
        }
    }

    findRecurringEvents = (range) => {
        this.setState({ showEvent: false });
        let start = new Date();
        let end = new Date();
        if (Array.isArray(range)) {
            start = range[0];
            end = range[range.length - 1];
            end.setHours(23, 59, 59);
        } else {
            start = range.start;
            end = range.end;
        }
        this.setState({ currentView: { start: start, end: end } });
        this.props.onInitRecurring(start, end);
    }

    triggerAddEvent = (evt) => {
        this.setState({ addEvent: true, eventStart: evt.start, eventEnd: evt.end, allDay: evt.slots.length === 1 });
    }

    removeAddEvent = () => {
        this.setState({ addEvent: false, updateEvent: false });
    }

    closePopUp = () => {
        this.setState({ showEvent: false });
    }

    selectEvent = (event) => {
        const newLocation = {
            x: this.state.mouseLocation.x - 100,
            y: this.state.mouseLocation.y - 125
        }
        const startTime = moment(event.start);
        let time = '';
        if (event.allDay) {
            time = startTime.format('dddd, MMMM Do YYYY');
        } else {
            const endTime = moment(event.end);
            if (event.start.getDate() === event.end.getDate()) {
                time = `${startTime.format('dddd, MMMM Do YYYY, h:mm a')} - ${endTime.format('h:mm a')}`;
            } else {
                time = `${startTime.format('dddd, MMMM Do YYYY, h:mm a')} - ${endTime.format('dddd, MMMM Do YYYY, h:mm a')}`;
            }
        }
        const { events } = this.props;
        const idx = events.indexOf(event);
        this.setState({
            showEvent: true,
            popUp: {
                title: event.title,
                time: time,
                location: newLocation,
                idx: idx,
                key: event.key,
                recurring: event.recurring
            }
        });
        if (event.recurring) {
            this.props.fetchRecurringEvent(event.key);
        }
    }

    _OnMouseMove(e) {
        this.setState({ mouseLocation: { x: e.pageX, y: e.pageY } });
    }

    removeEvent = () => {
        this.setState({ showEvent: false });
        if (this.state.popUp.recurring) {
            this.props.onRecurringRemoved(this.state.popUp.key, this.state.currentView.start, this.state.currentView.end);
        } else {
            this.props.onEventRemoved(this.state.popUp.key, this.state.popUp.idx);
        }
    }

    updateEvent = () => {
        this.setState({ showEvent: false, updateEvent: true });

    }

    render() {
        const localizer = momentLocalizer(moment);
        let addEvent = null;
        if (this.state.addEvent) {
            addEvent = <AddEvent
                close={this.removeAddEvent}
                start={this.state.eventStart}
                end={this.state.eventEnd}
                allDay={this.state.allDay}
                viewStart={this.state.currentView.start}
                viewEnd={this.state.currentView.end} />;
        }

        if (this.state.updateEvent) {
            const idx = this.state.popUp.idx;
            let eventInfo = {};
            let recurringInfo = {};
            if (this.state.popUp.recurring) {
                if (this.props.recurringInformation.rule) {
                    let end = new Date(this.props.recurringInformation.rule.start);
                    end.setMinutes(end.getMinutes() + this.props.recurringInformation.details.length);
                    eventInfo = {
                        title: this.props.recurringInformation.details.title,
                        priority: this.props.recurringInformation.details.priority,
                        recurring: 'true',
                        start: new Date(this.props.recurringInformation.rule.start),
                        end: end,
                        allDay: this.props.recurringInformation.details.allDay,
                        key: this.state.popUp.key
                    };
                    recurringInfo = {
                        frequency: this.props.recurringInformation.rule.frequency,
                        interval: this.props.recurringInformation.rule.interval,
                        dayOfWeek: this.props.recurringInformation.rule.byDayOfWeek
                    };
                    if (this.props.recurringInformation.rule.end) {
                        recurringInfo.end = this.props.recurringInformation.rule.end;
                    }
                }
            } else {
                eventInfo = {
                    title: this.props.events[idx].title,
                    priority: this.props.events[idx].priority,
                    recurring: 'false',
                    start: this.props.events[idx].start,
                    end: this.props.events[idx].end,
                    allDay: this.props.events[idx].allDay,
                    key: this.state.popUp.key,
                    idx: idx
                }
            }
            if (eventInfo.title) {
                addEvent = <AddEvent
                    close={this.removeAddEvent}
                    start={eventInfo.start}
                    end={eventInfo.end}
                    allDay={eventInfo.allDay}
                    viewStart={this.state.currentView.start}
                    viewEnd={this.state.currentView.end}
                    eventInfo={eventInfo}
                    recurringInfo={recurringInfo} />;
            }
        }

        return (
            <div onMouseMove={this._OnMouseMove.bind(this)} >
                {addEvent}
                <CalendarPopUp
                    popUpInformation={this.state.popUp}
                    showEvent={this.state.showEvent}
                    close={this.closePopUp}
                    removeEvent={this.removeEvent}
                    updateEvent={this.updateEvent} />
                <DragAndDropCalendar
                    selectable
                    localizer={localizer}
                    defaultView={Views.WEEK}
                    events={this.props.events.concat(this.props.recurringEvents)}
                    onEventResize={this.resizeEvent}
                    onEventDrop={this.moveEvent}
                    onDragStart={console.log}
                    resizable
                    onSelectSlot={this.triggerAddEvent}
                    onSelectEvent={this.selectEvent}
                    style={{ height: 1000 }}
                    onRangeChange={this.findRecurringEvents}
                    eventPropGetter={event => ({
                        style: {
                            backgroundColor: event.priority === 0
                                ? "#ad4ca4"
                                : "#3174ad"
                        }
                    })} />
            </div >

        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onEventAdded: (event) => dispatch(actions.addEvent(event)),
        onEventRemoved: (key, idx) => dispatch(actions.removeEvent(key, idx)),
        onInitCalendar: () => dispatch(actions.initCalendar()),
        onInitRecurring: (start, end) => dispatch(actions.recurringInit(start, end)),
        onRecurringRemoved: (key, start, end) => dispatch(actions.removeRecurring(key, start, end)),
        fetchRecurringEvent: (key) => dispatch(actions.fetchRecurring(key))
    }
}

const mapStateToProps = state => {
    return {
        events: state.calendar.events,
        recurringEvents: state.recurring.events,
        recurringInformation: state.recurring.updateEvent
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCalendar, axios);