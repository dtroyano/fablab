import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const updateResources = (resources) => {
    return dispatch => {
        axios.put(`resourceCalendar/resources.json`, { resources })
            .then(_res => {
                dispatch(setResources(resources));
            })
    }
}

export const setResources = (resources) => {
    return {
        type: actionTypes.SET_RESOURCES,
        resources: resources
    };
};

export const initResources = () => {
    return dispatch => {
        axios.get('resourceCalendar/resources.json')
            .then(res => {
                const resources = res.data;
                dispatch(setResources(resources));
            });
    }
}