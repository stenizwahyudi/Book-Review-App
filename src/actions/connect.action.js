import Axios from 'axios'

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

function inFLight() {
    return {
        type: "REQUEST_INFLIGHT",
    }
}

export function getReviews(id) {
    return function (dispatch) {
        dispatch(loadingReviews());
        return Axios.get('/api/review/id/' + id)
            .then(response =>
                dispatch(receiveReviewList(response.data)),
                error => alert("Sorry, an error occured :(", error)
            );
    }
}
