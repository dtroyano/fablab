import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import axios from '../../axios-orders';
import moment from 'moment';

import AddEvent from './AddEvent/AddEvent';

const DragAndDropCalendar = withDragAndDrop(Calendar);

class MyCalendar extends Component {
    constructor(props) {
        super(props);
        this.moveEvent = this.moveEvent.bind(this);
        this.newEvent = this.newEvent.bind(this);
    }
    state = {
        addEvent: false
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

    newEvent(evt) {
        let idList = this.props.events.map(a => a.id)
        let newId = Math.max(...idList) + 1
        let event = {
            id: newId,
            title: 'New Event',
            allDay: evt.slots.length === 1,
            start: evt.start,
            end: evt.end,
            priority: 0
        }
        this.props.onEventAdded(event);
    }

    findRecurringEvents = (range) => {
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
        this.props.onInitRecurring(start, end);
    }

    triggerAddEvent = () => {
        this.setState({ addEvent: true });
    }

    render() {
        const localizer = momentLocalizer(moment);
        let addEvent = null;
        if (this.state.addEvent) {
            addEvent = <AddEvent />;
        }

        return (
            <div>
                {addEvent}
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
                    onSelectEvent={event => alert(event.title)}
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
        onInitRecurring: (start, end) => dispatch(actions.recurringInit(start, end))
    }
}

const mapStateToProps = state => {
    return {
        events: state.calendar.events,
        recurringEvents: state.recurring.events
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCalendar, axios);