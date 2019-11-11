import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const setBlog = (entries) => {
    return {
        type: actionTypes.INIT_BLOG,
        entries: entries
    }
}

export const initBlog = () => {
    return dispatch => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(resp => {
                dispatch(setBlog(resp.data));
            })
    }
}