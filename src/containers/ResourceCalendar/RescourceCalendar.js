import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import axios from '../../axios-orders';
import moment from 'moment';

import Button from '../../components/UI/Button/Button';
import ChangeResources from './ChangeResources/ChangeResources';
import AddRescourceEvent from './AddResourceEvent/AddResourceEvent';
import CalendarPopUp from '../../components/UI/CalendarPopUp/CalendarPopUp';
import classes from './ResourceCalendar.module.css';

const DragAndDropCalendar = withDragAndDrop(Calendar);

class ResourceCalendar extends Component {
    state = {
        addEvent: false,
        updateEvent: false,
        changeResources: false,
        addEventData: {
            eventStart: new Date(),
            eventEnd: new Date(),
            resourceId: 0,
            //allDay: false
        },
        showEvent: false,
        popUp: {
            title: '',
            time: '',
            key: '',
            resourceId: 1,
            resource: '',
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
        this.props.onInitResources();
    }

    resizeEvent = ({ event: evt, start, end }) => {
        this.setState({ showEvent: false });
        if (!evt.recurring) {
            const { events } = this.props;
            const idx = events.indexOf(evt);
            const event = {
                title: evt.title,
                //allDay: evt.allDay,
                resourceId: evt.resourceId,
                userId: 1,
                start,
                end
            };
            this.props.onEventAdded(event);
            this.props.onEventRemoved(evt.key, idx);
        }
    }

    removeEvent = () => {
        this.setState({ showEvent: false });
        this.props.onEventRemoved(this.state.popUp.key, this.state.popUp.idx);
    }

    updateEvent = () => {
        this.setState({ showEvent: false, updateEvent: true });
    }

    triggerAddEvent = (event) => {
        const newEventData = {
            eventStart: event.start,
            eventEnd: event.end,
            resourceId: event.resourceId
            //allDay: event.slots.length === 1
        };
        this.setState({ addEvent: true, addEventData: newEventData });
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
        console.log(event);
        this.setState({
            showEvent: true,
            popUp: {
                title: event.title,
                time: time,
                location: newLocation,
                idx: idx,
                key: event.key,
                resource: this.findResourceName(event.resourceId),
                resourceId: event.resourceId
            }
        });
    }

    findResourceName = (id) => {
        let name = "";
        for (let i = 0; i < this.props.resources.length; i++) {
            if (this.props.resources[i].id === id) {
                name = this.props.resources[i].name;
                break;
            }
        }
        return name;
    }

    changeResourcesShow = () => {
        this.setState({ changeResources: !this.state.changeResources });
    }

    _OnMouseMove(e) {
        this.setState({ mouseLocation: { x: e.pageX, y: e.pageY } });
    }

    render() {
        const localizer = momentLocalizer(moment);
        let changeResources = null;

        if (this.state.changeResources) {
            changeResources = <ChangeResources
                close={this.changeResourcesShow}
                resources={this.props.resources} />
        }
        let addEvent = null;
        if (this.state.addEvent) {
            addEvent = <AddRescourceEvent
                close={this.removeAddEvent}
                start={this.state.addEventData.eventStart}
                end={this.state.addEventData.eventEnd}
                //allDay={this.state.addEventData.allDay}
                resourceId={this.state.addEventData.resourceId} />;
        }
        if (this.state.updateEvent) {
            const idx = this.state.popUp.idx;
            let eventInfo = {};
            eventInfo = {
                title: this.props.events[idx].title,
                resource: this.props.events[idx].resourceId,
                start: this.props.events[idx].start,
                end: this.props.events[idx].end,
                //allDay: this.props.events[idx].allDay,
                key: this.state.popUp.key,
                idx: idx
            };

            if (eventInfo.title) {
                addEvent = <AddRescourceEvent
                    close={this.removeAddEvent}
                    start={eventInfo.start}
                    end={eventInfo.end}
                    //allDay={eventInfo.allDay}
                    resourceId={eventInfo.resourceId}
                    eventInfo={eventInfo} />;
            }
        }
        return (
            <div onMouseMove={this._OnMouseMove.bind(this)} >
                {changeResources}
                {addEvent}
                <Button clicked={this.changeResourcesShow}>CHANGE RESOURCES</Button>
                <CalendarPopUp
                    popUpInformation={this.state.popUp}
                    showEvent={this.state.showEvent}
                    close={this.closePopUp}
                    removeEvent={this.removeEvent}
                    updateEvent={this.updateEvent} />
                <DragAndDropCalendar
                    className={classes.ResourceCalendar}
                    selectable
                    localizer={localizer}
                    defaultView={Views.WEEK}
                    events={this.props.events}
                    onEventResize={this.resizeEvent}
                    slotPropGetter={date => ({
                        className: date <= new Date()
                            ? classes.old
                            : null
                    })}
                    step={30}
                    min={new Date('Nov 17, 2019 09:0:0')}
                    max={new Date('Nov 17, 2019 22:0:0')}
                    //onEventDrop={this.moveEvent}
                    //onDragStart={console.log}
                    resizable
                    onSelectSlot={this.triggerAddEvent}
                    onSelectEvent={this.selectEvent}
                    resources={this.props.resources}
                    resourceIdAccessor="id"
                    resourceTitleAccessor="name"

                    style={{ height: 1000 }} />
            </div >
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEventAdded: (event) => dispatch(actions.addResourceEvent(event)),
        onEventRemoved: (key, idx) => dispatch(actions.removeResourceEvent(key, idx)),
        onInitCalendar: () => dispatch(actions.initResourceCalendar()),
        onInitResources: () => dispatch(actions.initResources())
    }
}

const mapStateToProps = state => {
    return {
        events: state.resourceCalendar.events,
        resources: state.resources.resources
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResourceCalendar, axios);