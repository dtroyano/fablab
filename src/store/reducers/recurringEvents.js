import * as actionTypes from '../actions/actionTypes';

const initialState = {
    events: [],
    updateEvent: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_RECURRING:
            return {
                ...state,
                events: action.events
            };
        case actionTypes.RECURRING_FETCHED:
            return {
                ...state,
                updateEvent: action.event
            }
        case actionTypes.ADD_RECURRING:
            return state;
        case actionTypes.REMOVE_RECURRING:
            return state;
        default:
            return state;
    }
}

export default reducer;