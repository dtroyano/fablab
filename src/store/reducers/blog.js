import * as actionTypes from '../actions/actionTypes';

const initialState = {
    blog: {},
    entry: {},
    loaded: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_BLOG:
            return {
                ...state, blog: action.entries
            };
        case actionTypes.GET_BLOG:
            return {
                ...state, entry: action.entry, loaded: true
            }
        default:
            return state;
    }
}

export default reducer;