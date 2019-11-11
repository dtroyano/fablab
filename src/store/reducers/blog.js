import * as actionTypes from '../actions/actionTypes';

const initialState = {
    blog: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_BLOG:
            return {
                ...state, blog: action.entries
            };
        default:
            return state;
    }
}

export default reducer;