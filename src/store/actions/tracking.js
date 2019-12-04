import * as actionTypes from './actionTypes';
import databaseAxios from '../../axios-orders';

export const findUserByEmail = (email) => {
    return dispatch => {
        databaseAxios.get('users.json')
            .then(resp => {
                let found = false;
                for (const key in resp.data) {
                    if (resp.data[key].email === email) {
                        found = true;
                        dispatch(userFound(resp.data[key]));
                    }
                }
                if (!found) {
                    dispatch(userNotFound());
                }
            })
    }
}

const checkedOut = () => {
    return {
        type: actionTypes.CHECKED_OUT
    }
}

export const checkOutUser = (email) => {
    const key = email.split('.').join('');
    return dispatch => {
        databaseAxios.get(`tracking/checkedIn/${key}.json`)
            .then(resp => {
                const userData = { ...resp.data, checkOut: new Date() };
                databaseAxios.post('tracking/data.json', userData)
                    .then(_resp => {
                        databaseAxios.delete(`tracking/checkedIn/${key}.json`)
                            .then(_response => {
                                dispatch(checkedOut())
                            })
                    })
            })
    }
}

const checkedIn = () => {
    return {
        type: actionTypes.CHECKED_IN
    }
}

export const checkInUser = (userData, email) => {
    const key = email.split('.').join('');
    return dispatch => {
        databaseAxios.put(`tracking/checkedIn/${key}.json`, { ...userData })
            .then(resp => {
                dispatch(checkedIn())
            })
    }
}

export const findUserById = (id) => {
    return dispatch => {
        dispatch(userFound())
    }
}

const userNotFound = () => {
    return {
        type: actionTypes.USER_NOT_FOUND
    }
}

const userFound = (user) => {
    return {
        type: actionTypes.FOUND_USER,
        user: user
    }
}

const CSVDataLoaded = (data) => {
    return {
        type: actionTypes.DATA_LOADED_FOR_CSV,
        data: data
    }
}

const unloadCSV = () => {
    return {
        type: actionTypes.UNLOAD_CSV
    }
}

export const loadCSVData = () => {
    return dispatch => {
        databaseAxios.get('tracking/data.json')
            .then(resp => {
                dispatch(CSVDataLoaded(resp.data));
                setTimeout(() => {
                    dispatch(unloadCSV());
                }, 3000);
            })
    }
}

const CSVDataDeleted = () => {
    return {
        type: actionTypes.CSV_DATA_DELETED
    }
}

export const deleteCSVData = () => {
    return dispatch => {
        databaseAxios.delete('tracking/data.json')
            .then(resp => {
                dispatch(CSVDataDeleted())
            })
    }
}

const k12GroupCheckedIn = () => {
    return {
        type: actionTypes.K12GROUP_CHECKED_IN
    }
}

export const checkInK12Group = (groupData) => {
    return dispatch => {
        databaseAxios.post('tracking/k12Group.json', { ...groupData })
            .then(resp => {
                dispatch(k12GroupCheckedIn())
            })
    }
}