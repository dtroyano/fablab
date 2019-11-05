import * as actionTypes from '../actions/actionTypes';

const initialState = {
    events: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_EVENT:
            return {
                ...state,
                events: state.events.concat(action.event)
            };
        case actionTypes.REMOVE_EVENT:
            return state;

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