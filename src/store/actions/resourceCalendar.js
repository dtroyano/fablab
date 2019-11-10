import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const resourceEventAdded = (event, key, userId) => {
    return {
        type: actionTypes.ADD_RESOURCE_EVENT,
        event: event,
        key: key,
        userId: userId
    };
};

export const addResourceEvent = (event, userId) => {
    return dispatch => {
        axios.post('resourceCalendar/events.json', { event })
            .then(res => {
                dispatch(resourceEventAdded(event, res.data.name, userId));
            });
    }
}

export const resourceEventRemoved = (idx) => {
    return {
        type: actionTypes.REMOVE_RESOURCE_EVENT,
        idx: idx
    };
}

export const removeResourceEvent = (key, idx) => {
    return dispatch => {
        axios.delete(`resourceCalendar/events/${key}.json`)
            .then(res => {
                dispatch(resourceEventRemoved(idx));
            })
            .catch(err => {
                console.log('fucked up removing')
            })
    }
};

export const setResourceCalendar = (events) => {
    return {
        type: actionTypes.SET_RESOURCE_CALENDAR,
        events: events
    };
};

export const initResourceCalendar = () => {
    return dispatch => {
        axios.get('resourceCalendar/events.json')
            .then(res => {
                const events = [];
                for (let key in res.data) {
                    events.push({
                        'title': res.data[key].event.title,
                        'resourceId': res.data[key].event.resourceId,
                        'start': new Date(res.data[key].event.start),
                        'end': new Date(res.data[key].event.end),
                        'allDay': res.data[key].event.allDay,
                        'key': key,
                        'userId': res.data[key].event.userId
                    });
                }
                dispatch(setResourceCalendar(events));
            });
    }
}