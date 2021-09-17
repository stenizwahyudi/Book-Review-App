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

function loading(state = true, action) {
    switch (action.type) {
        case 'REQUEST_REVIEWS':
            return false;
        default:
            return state;
    }
}

export default combineReducers({
    inFlight,
    reviews,
    loading,
});

