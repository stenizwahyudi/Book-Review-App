import {combineReducers} from 'redux'


function inFlight(state = false, action) {
    return action.type === 'REQUEST_INFLIGHT';
}

function books(state = [], action) {
    switch (action.type) {
        case 'CLEAR_BOOKS':
            return [];
        case 'RECEIVE_BOOKS':
            return action.books;
        default:
            return state;
    }
}

function loading(state = true, action) {
    switch (action.type) {
        case 'REQUEST_BOOKS':
            return false;
        default:
            return state;
    }

}


export default combineReducers({
    inFlight,
    books,
    loading,
});

