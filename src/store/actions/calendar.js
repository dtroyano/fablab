import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const eventAdded = (event) => {
    return {
        type: actionTypes.ADD_EVENT,
        event: event
    };
};

export const addEvent = (event) => {
    return dispatch => {
        axios.post('calendar.json', { event })
            .then(res => {
                dispatch(eventAdded(event));
            });
    }
}

export const eventRemoved = (idx) => {
    return {
        type: actionTypes.REMOVE_EVENT,
        idx: idx
    };
}

export const removeEvent = (key, idx) => {
    return dispatch => {
        axios.delete(`calendar/${key}.json`)
            .then(res => {
                dispatch(eventRemoved(idx));
            })
    }
};

export const setCalendar = (events) => {
    return {
        type: actionTypes.SET_CALENDAR,
        events: events
    };
};

export const initCalendar = () => {
    return dispatch => {
        axios.get('calendar.json')
            .then(res => {
                const events = [];
                for (let key in res.data) {
                    events.push({
                        'title': res.data[key].event.title,
                        'start': new Date(res.data[key].event.start),
                        'end': new Date(res.data[key].event.end),
                        'allDay': res.data[key].event.allDay,
                        'key': key
                    });
                }
                dispatch(setCalendar(events));
            });
    }
}