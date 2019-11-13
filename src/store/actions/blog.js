import * as actionTypes from './actionTypes';
import axios from 'axios';

const setBlog = (entries) => {
    return {
        type: actionTypes.INIT_BLOG,
        entries: entries
    }
}

export const initBlog = () => {
    return dispatch => {
        axios.get('https://dtgreviews.com/wp-json/wp/v2/posts')
            .then(resp => {
                dispatch(setBlog(resp.data));
            })
    }
}

const blogGot = (entry) => {
    return {
        type: actionTypes.GET_BLOG,
        entry: entry
    }
}

export const getBlog = (id) => {
    return dispatch => {
        axios.get('https://dtgreviews.com/wp-json/wp/v2/posts/' + id)
            .then(resp => {
                dispatch(blogGot(resp.data));
            })
    }
}