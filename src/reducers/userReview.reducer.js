import {combineReducers} from 'redux'

function inFlight(state = false, action) {
    return action.type === 'REQUEST_INFLIGHT';
}

function reviews(state = [], action) {
    switch (action.type) {
        case 'RECEIVE_REVIEWS':
            return action.reviews;
        default:
            return state;
    }
}

function review(state = null, action) {
    switch (action.type) {
        case 'SELECT_REVIEW':
            return action.data;
        default:
            return state;
    }
}

function loading(state = true, action) {
    switch (action.type) {
        case 'REQUEST_REVIEWS':
            return false;
        default:
            return state;
    }
}

function redirectPage(state = '', action) {
    if (action.type === 'POST_SUCCESS'  || action.type === 'POST_FAILURE') {
        return "/yourreviews";
    } else if (action.type === 'SELECT_REVIEW') {
        return "/editreview";
    } else if (action.type === 'CLEAR_REDIRECT') {
        return '';
    } else if (action.type === 'EDIT_SUCCESS') {
        return '/identified';
    }
    return '';
}

export default combineReducers({
    inFlight,
    reviews,
    loading,
    redirectPage,
    review,
});