import * as actionTypes from './actionTypes';
import axios from 'axios';
import databaseAxios from '../../axios-orders';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
}

export const auth = (email, password, isSignup, user = {}) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxQL1nIOEJvGNZmwXe2Vb-dZ3Vt1GBse8';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxQL1nIOEJvGNZmwXe2Vb-dZ3Vt1GBse8';
        }
        axios.post(url, authData)
            .then(resp => {
                console.log(resp);
                const expirationDate = new Date(new Date().getTime() + (resp.data.expiresIn * 1000));
                localStorage.setItem('token', resp.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', resp.data.localId);
                if (isSignup) {
                    dispatch(addUserToDatabase(user, resp.data.localId));
                }
                dispatch(authSuccess(resp.data.idToken, resp.data.localId));
                dispatch(checkAuthTimeout(resp.data.expiresIn))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const updateUserDatabase = (user, id) => {
    return dispatch => {
        databaseAxios.put(`users/${id}.json`, { ...user })
            .then(resp => {
                dispatch(updateUserState(user));
            })
    }
}

const addUserToDatabase = (user, id) => {
    return dispatch => {
        databaseAxios.put(`users/${id}.json`, { ...user })
            .then(resp => {
                dispatch(updateUserState(user));
            });
    }
}

export const getUserForState = (id) => {
    return dispatch => {
        databaseAxios.get(`users/${id}.json`)
            .then(resp => {
                dispatch(updateUserState(resp.data))
            })

    }
}

const updateUserState = (user) => {
    return {
        type: actionTypes.AUTH_UPDATE_USER,
        user: user
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token), userId);
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        }
    };
};

const usersGot = (users) => {
    return {
        type: actionTypes.GET_USERS,
        users: users
    }
}

export const getUsers = () => {
    return dispatch => {
        databaseAxios.get('users.json')
            .then(resp => {
                dispatch(usersGot(resp.data));
            })
    }
}