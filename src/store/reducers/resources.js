import * as actionTypes from '../actions/actionTypes';

const initialState = {
    resources: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_RESOURCES:
            return {
                ...state,
                resources: action.resources
            };
        default:
            return state;
    }
}
export default reducer;