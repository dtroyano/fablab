import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const updateResources = (resources) => {
    return dispatch => {
        axios.delete('resourceCalendar/resources.json')
            .then(res => {
                axios.post('resourceCalendar/resources.json', { resources })
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
                let resources = [];
                for (let key in res.data) {
                    resources = res.data[key].resources;
                }
                dispatch(setResources(resources));
            });
    }
}