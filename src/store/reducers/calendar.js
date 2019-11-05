import * as actionTypes from '../actions/actionTypes';

const initialState = {
    events: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_EVENT:
            const evt = {
                title: action.event.title,
                start: action.event.start,
                end: action.event.end,
                allDay: action.event.allDay,
                key: action.key
            }
            return {
                ...state,
                events: state.events.concat(evt)
            };
        case actionTypes.REMOVE_EVENT:
            console.log(action.idx);
            const nextEvents = [...state.events];
            nextEvents.splice(action.idx, 1);
            console.log(nextEvents);
            return {
                events: nextEvents
            };

        case actionTypes.SET_CALENDAR:
            return {
                ...state,
                events: action.events
            };
        default:
            return state;
    }
}
export default reducer;