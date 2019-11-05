import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/calendar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import axios from '../../axios-orders';
import moment from 'moment';

//import events from './events';

const DragAndDropCalendar = withDragAndDrop(Calendar);

class MyCalendar extends Component {
    constructor(props) {
        super(props);
        //this.moveEvent = this.moveEvent.bind(this);
        this.newEvent = this.newEvent.bind(this);
    }

    componentDidMount() {
        this.props.onInitCalendar();
    }

    // moveEvent({ event: evt, start, end, isAllDay: droppedOnAllDaySlot }) {

    //     const { events } = this.state;
    //     const idx = events.indexOf(evt);
    //     let allDay = evt.allDay;

    //     if (!evt.allDay && droppedOnAllDaySlot) {
    //         allDay = true;
    //     } else if (evt.allDay && !droppedOnAllDaySlot) {
    //         allDay = false;
    //     }
    //     console.log(this.state.events[idx].key);
    //     const event = { ...evt, start, end, allDay };
    //     axios.post('calendar.json', { event })
    //         .then(res => {
    //             console.log(evt.key);
    //             axios.delete(`calendar/${this.state.events[idx].key}`)
    //                 .then(res => {
    //                     console.log('YAY');
    //                 })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })

    //     const nextEvents = [...events];
    //     nextEvents.splice(idx, 1, event);

    //     this.setState({ events: nextEvents });
    // }

    // resizeEvent = ({ event, start, end }) => {
    //     const { events } = this.state;

    //     const nextEvents = events.map(existingEvent => {
    //         return existingEvent.id === event.id
    //             ? { ...existingEvent, start, end }
    //             : existingEvent;
    //     })

    //     this.setState({ events: nextEvents });
    // }

    newEvent(evt) {
        let idList = this.props.events.map(a => a.id)
        let newId = Math.max(...idList) + 1
        let event = {
            id: newId,
            title: 'New Event',
            allDay: evt.slots.length === 1,
            start: evt.start,
            end: evt.end,
        }
        this.props.onEventAdded(event);
    }



    render() {
        const localizer = momentLocalizer(moment);

        return (
            <div>
                <DragAndDropCalendar
                    selectable
                    localizer={localizer}
                    events={this.props.events}
                    // onEventResize={this.resizeEvent}
                    //onEventDrop={this.moveEvent}
                    //onDragStart={console.log}
                    // resizable                    
                    onSelectSlot={this.newEvent}
                    style={{ height: 1000 }} />
            </div >

        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onEventAdded: (event) => dispatch(actions.addEvent(event)),
        onEventRemoved: (key) => dispatch(actions.removeEvent(key)),
        onInitCalendar: () => dispatch(actions.initCalendar())
    }
}

const mapStateToProps = state => {
    return {
        events: state.events
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCalendar, axios);