import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: {},
    notFound: false,
    found: false,
    data: {},
    dataLoaded: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FOUND_USER:
            return {
                ...state, user: action.user, notFound: false, found: true
            };
        case actionTypes.USER_NOT_FOUND:
            return {
                ...state, notFound: true, found: false
            }
        case actionTypes.CHECKED_IN: return state;
        case actionTypes.CHECKED_OUT: return state;
        case actionTypes.DATA_LOADED_FOR_CSV:
            return {
                ...state, data: action.data, dataLoaded: true
            }
        case actionTypes.UNLOAD_CSV: return {
            ...state, dataLoaded: false
        }
        case actionTypes.CSV_DATA_DELETED: return state;
        case actionTypes.K12GROUP_CHECKED_IN: return state;
        default: return state;
    }
}

export default reducer;