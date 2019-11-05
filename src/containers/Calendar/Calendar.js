import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/calendar';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import axios from '../../axios-orders';
import moment from 'moment';
import { RRule } from 'rrule';

const DragAndDropCalendar = withDragAndDrop(Calendar);

class MyCalendar extends Component {
    state = {
        recurringEvents: []
    }
    constructor(props) {
        super(props);
        this.moveEvent = this.moveEvent.bind(this);
        this.newEvent = this.newEvent.bind(this);
    }

    componentDidMount() {
        this.props.onInitCalendar();
    }

    moveEvent({ event: evt, start, end, isAllDay: droppedOnAllDaySlot }) {

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

    resizeEvent = ({ event: evt, start, end }) => {
        const { events } = this.props;
        const idx = events.indexOf(evt);
        console.log(evt);
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
        this.setState({ recurringEvents: [] });
        const rule = new RRule({
            freq: RRule.WEEKLY,
            count: 10,
            interval: 1,
            byweekday: RRule.TH,
            bymonth: [9, 10, 11]
        });
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
        console.log(rule.between(start, end));
        const events = rule.between(start, end);
        const recurringEvents = [];
        events.map(event => {
            recurringEvents.push({
                title: 'Recurring Event',
                allDay: true,
                start: event,
                end: event,
                priority: 1
            })
        });
        console.log(recurringEvents);
        this.setState({ recurringEvents: recurringEvents });
    }


    render() {
        const localizer = momentLocalizer(moment);

        return (
            <div>
                <DragAndDropCalendar
                    selectable
                    localizer={localizer}
                    defaultView={Views.WEEK}
                    events={this.props.events.concat(this.state.recurringEvents)}
                    onEventResize={this.resizeEvent}
                    onEventDrop={this.moveEvent}
                    onDragStart={console.log}
                    resizable
                    onSelectSlot={this.newEvent}
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
        onInitCalendar: () => dispatch(actions.initCalendar())
    }
}

const mapStateToProps = state => {
    return {
        events: state.events
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCalendar, axios);