import Axios from 'axios'

export function clearReview() {
    return {
        type: "CLEAR_REVIEW"
    }
}

function loadingReviews() {
    return {
        type: "REQUEST_REVIEWS"
    }
}

function receiveReviewList(reviews) {
    return {
        type: "RECEIVE_REVIEWS",
        reviews
    }
}

function inFlight() {
    return {
        type: "REQUEST_INFLIGHT",
    }
}

function postSuccess() {
    return {
        type: "POST_SUCCESS",
    }
}

function editSuccess() {
    return {
        type: "EDIT_SUCCESS",
    }
}

function postFailure() {
    return {
        type: "POST_FAILURE",
    }
}

export function getMyReviews(userId) {
    return function(dispatch) {
        dispatch(loadingReviews());
        return Axios.get('/api/review/user/' + userId)
            .then(response =>
                // console.log(response.data),
                dispatch(receiveReviewList(response.data)),
                error => alert("Sorry, an error occured :(", error)
            );
    }
}

export function addReview(review) {
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.post(`/api/review/`, review)
            .then(response => {
                // console.log(response);
                dispatch(postSuccess());
                alert("Your review has been posted. Thank you! :)")
                },
                error => {
                    dispatch(postFailure());
                    alert("Some error occured (please check whether or not you have reviewed the book)")
                // error => console.log(error)
                }
            );
    }
}

export function selectReview(data) {
    return {
        type: "SELECT_REVIEW",
        data
    }
}

export function clearRedirect() {
    return {
        type: "CLEAR_REDIRECT",
    }
}

export function deleteReview(objectId) {
    return function (dispatch) {
        dispatch(inFlight());
        return Axios.delete('/api/review/' + objectId)
            .then(response => {
                // console.log(response);
                alert("Your review has been deleted.");
                dispatch(postSuccess());
                },
                error => {
                    dispatch(postFailure());
                    alert("Error, please retry :(")
                // error => console.log(error)
                }
            );
    }
}

export function editReview(data) {
    return function (dispatch) {
        dispatch(inFlight());
        return Axios.put('/api/review/', data)
            .then(response => {
                alert("Your review has been updated!");
                dispatch(postSuccess());
                },
                error => {
                    dispatch(postFailure());
                    alert("Error, please retry :(")
                // error => console.log(error)
                }
            );
    }
}


