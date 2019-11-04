import React, { Component } from 'react';
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
        this.state = { events: [] };
        // this.moveEvent = this.moveEvent.bind(this);
        this.newEvent = this.newEvent.bind(this);
    }
    componentDidMount() {
        axios.get('calendar.json')
            .then(res => {
                console.log(res.data);
                const events = [];
                for (let key in res.data) {
                    events.push({
                        ...res.data[key].hour
                    });
                }
                this.setState({ events: events });
                //this.setState({ events: events });
            });
    }

    // moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    //     const { events } = this.state;
    //     const idx = events.indexOf(event);
    //     let allDay = event.allDay;

    //     if (!event.allDay && droppedOnAllDaySlot) {
    //         allDay = true;
    //     } else if (event.allDay && !droppedOnAllDaySlot) {
    //         allDay = false;
    //     }

    //     const updatedEvent = { ...event, start, end, allDay };

    //     const nextEvents = [...events];
    //     nextEvents.splice(idx, 1, updatedEvent);

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

    newEvent(event) {
        let idList = this.state.events.map(a => a.id)
        let newId = Math.max(...idList) + 1
        let hour = {
            id: newId,
            title: 'New Event',
            allDay: event.slots.length === 1,
            start: event.start,
            end: event.end,
        }
        this.setState({
            events: this.state.events.concat([hour]),
        })
        axios.post('calendar.json', { hour })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }



    render() {
        const localizer = momentLocalizer(moment);

        return (
            <div>
                <DragAndDropCalendar
                    selectable
                    localizer={localizer}
                    events={this.state.events}
                    // onEventResize={this.resizeEvent}
                    // onEventDrop={this.moveEvent}
                    // onDragStart={console.log}
                    // resizable                    
                    onSelectSlot={this.newEvent}
                    style={{ height: 1000 }} />
            </div >

        );
    }
};

export default MyCalendar;