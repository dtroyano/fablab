import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

import { Schedule } from '@rschedule/core/generators';
import '@rschedule/standard-date-adapter/setup';


export const addRecurring = (event) => {
    return dispatch => {
        let time = new Date();
        time = new Date(time.setHours(time.getHours() - 14));
        const rule = {
            frequency: "WEEKLY",
            byDayOfWeek: ["TU"],
            start: time
        };
        const details = {
            title: 'Recurring Event',
            allDay: false,
            length: 90,
            priority: 0
        };
        const event = {
            rule: rule,
            details: details
        };

        axios.post('recurring.json', { event })
            .then(res => {
                console.log(res);
                dispatch(recurringAdded(event));
            });
    }

}

export const recurringAdded = (event) => {
    return {
        type: actionTypes.ADD_RECURRING,
        event: event
    }
}

export const recurringRemoved = (event) => {
    return {
        type: actionTypes.REMOVE_RECURRING,
        event: event
    }
}

export const setRecurring = (events) => {
    return {
        type: actionTypes.SET_RECURRING,
        events: events
    }
}

export const recurringInit = (start, end) => {
    return dispatch => {
        axios.get('recurring.json')
            .then(res => {
                const events = [];

                for (let key in res.data) {
                    const rule = {
                        ...res.data[key].event.rule
                    };
                    if (rule.start) {
                        rule.start = new Date(rule.start);
                    }
                    if (rule.end) {
                        rule.end = new Date(rule.end);
                    }
                    const schedule = new Schedule({ rrules: [rule] });
                    const scheduleDates = schedule
                        .occurrences({ start: start, end: end })
                        .toArray()
                        .map(({ date }) => date);

                    scheduleDates.forEach(event => {
                        const start = new Date(event);
                        let end = new Date(event);
                        end.setMinutes(end.getMinutes() + res.data[key].event.details.length);
                        events.push({
                            'title': res.data[key].event.details.title,
                            'start': start,
                            'end': end,
                            'allDay': res.data[key].event.details.allDay,
                            'key': key,
                            'priority': res.data[key].event.details.priority
                        });
                    })
                }
                dispatch(setRecurring(events));
            })

    }

}