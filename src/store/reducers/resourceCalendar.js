import * as actionTypes from '../actions/actionTypes';

const initialState = {
    events: [],
    resources: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_RESOURCE_EVENT:
            const evt = {
                title: action.event.title,
                resourceId: action.event.resourceId,
                start: action.event.start,
                end: action.event.end,
                allDay: action.event.allDay,
                key: action.key,
                userId: action.userId
            }
            return {
                ...state,
                events: state.events.concat(evt)
            };
        case actionTypes.REMOVE_RESOURCE_EVENT:
            console.log(action.idx);
            const nextEvents = [...state.events];
            nextEvents.splice(action.idx, 1);
            console.log(nextEvents);
            return {
                events: nextEvents
            };

        case actionTypes.SET_RESOURCE_CALENDAR:
            return {
                ...state,
                events: action.events
            };
        default:
            return state;
    }
}
export default reducer;