import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import axios from '../../axios-orders';
import moment from 'moment';

import AddRescourceEvent from './AddResourceEvent/AddResourceEvent';

const DragAndDropCalendar = withDragAndDrop(Calendar);

class ResourceCalendar extends Component {
    state = {
        addEvent: false,
        updateEvent: false,
        addEventData: {
            eventStart: new Date(),
            eventEnd: new Date(),
            resourceId: 0,
            allDay: false
        }
    }

    componentDidMount() {
        this.props.onInitCalendar();
    }

    triggerAddEvent = (event) => {
        const newEventData = {
            eventStart: event.start,
            eventEnd: event.end,
            resourceId: event.resourceId,
            allDay: event.slots.length === 1
        };
        this.setState({ addEvent: true, addEventData: newEventData });
    }
    removeAddEvent = () => {
        this.setState({ addEvent: false, updateEvent: false });
    }

    render() {
        const localizer = momentLocalizer(moment);
        const resourceMap = [
            { resourceId: 1, resourceTitle: 'Laser Cutter' },
            { resourceId: 2, resourceTitle: 'CNC' },
            { resourceId: 3, resourceTitle: 'Vinyl Cutter' },
            { resourceId: 4, resourceTitle: '3D Printer' },
        ]
        let addEvent = null;
        if (this.state.addEvent) {
            addEvent = <AddRescourceEvent
                close={this.removeAddEvent}
                start={this.state.addEventData.eventStart}
                end={this.state.addEventData.eventEnd}
                allDay={this.state.addEventData.allDay} />;
        }
        return (
            <div>
                {addEvent}
                <DragAndDropCalendar
                    selectable
                    localizer={localizer}
                    defaultView={Views.WEEK}
                    events={this.props.events}
                    //onEventResize={this.resizeEvent}
                    //onEventDrop={this.moveEvent}
                    //onDragStart={console.log}
                    //resizable
                    onSelectSlot={this.triggerAddEvent}
                    //onSelectEvent={this.selectEvent}
                    resources={resourceMap}
                    resourceIdAccessor="resourceId"
                    resourceTitleAccessor="resourceTitle"

                    style={{ height: 1000 }}
                //onRangeChange={this.findRecurringEvents}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEventRemoved: (key, idx) => dispatch(actions.removeResourceEvent(key, idx)),
        onInitCalendar: () => dispatch(actions.initResourceCalendar())
    }
}

const mapStateToProps = state => {
    return {
        events: state.resourceCalendar.events,
        resources: state.resourceCalendar.resources
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResourceCalendar, axios);