import Axios from 'axios'

function loginAttempt() {
    return {
        type: "LOGIN_ATTEMPT"
    }
}

function loginSuccess(username) {
    return {
        type: "LOGIN_SUCCESS",
        username
    }
}

function loginFailure(error) {
    return {
        type: "LOGIN_FAILURE",
        error
    }
}

function registerAttempt() {
    return {
        type: "REGISTER_ATTEMPT"
    }
}

function registerSuccess(username) {
    return {
        type: "REGISTER_SUCCESS",
        username
    }
}

function registerFailure(error) {
    return {
        type: "REGISTER_FAILURE",
        error
    }
}


export function selectUser(username) {
    return {
        type: "SELECT_USER",
        username
    }
}



export function validate(user) {
    return  {...user,
        type: 'VALIDATE_REGISTER_USER'}
}

export function clear() {
    return {
        type: "CLEAR"
    }
}

function logoutAttempt() {
    return {
        type: "LOGOUT_ATTEMPT"
    }
}

function logoutSuccess() {
    return {
        type: "LOGOUT_SUCCESS"
    }
}

function editAttempt() {
    return {
        type: "EDIT_ATTEMPT"
    }
}

function editSuccess() {
    return {
        type: "EDIT_SUCCESS"
    }
}

function getStatusAttempt() {
    return {
        type: "GET_STATUS_ATTEMPT"
    }
}

function getStatusSuccess(value) {
    return {
        type: "GET_STATUS_SUCCESS",
        value
    }
}



export function logout() {
    return function (dispatch) {
        dispatch(logoutAttempt());
        return Axios.delete('/api/user/authenticate')
            .then(response => dispatch(logoutSuccess()),
                error => console.log("Some error")
            );
    }
}

export function login(user) {
    return function (dispatch) {
        dispatch(loginAttempt());
        return Axios.post('/api/user/authenticate', user)
            .then(response => dispatch(loginSuccess(response.data.username)),
                error => dispatch(loginFailure("Invalid username and/or password. Please try again."))
            );
    }
}

export function register(username, password) {
    return function (dispatch) {
        dispatch(registerAttempt());
        return Axios.post('/api/user/', {username, password})
            .then(response => {
                alert("Success! Please login with your new credentials.")
                dispatch(registerSuccess(response.data.username))
                },
                error => alert("Username is not available!")
            );
    }
}

export function getUserStatus(username) {
    return function (dispatch) {
        dispatch(getStatusAttempt());
        return Axios.get('/api/user/info', username)
            .then(response => 
                // console.log(response.data),
                dispatch(getStatusSuccess(response.data)),
                error => console.log("Error")
            );
    }
}

export function editAccount(data) {
    return function (dispatch) {
        dispatch(logoutAttempt());
        return Axios.put('/api/user/username/' + data.currentUsername, data)
            .then(response => {
                alert("Your username has been updated. Please login with your new credentials!");
                dispatch(editSuccess());
                dispatch(logout());
                // dispatch(selectUser(data.newUsername));
                },
                error => alert("Sorry, username is not available. Please try again!")
            );
    }
}

export function deleteAccount(username) {
    return function (dispatch) {
        dispatch(logoutAttempt());
        return Axios.delete('/api/user/' + username)
            .then(response => {
                dispatch(logoutSuccess());
                alert("Your account has been deleted. Thank you for your trust! :)")
                },
                error => console.log("Error")
            );
    }
}