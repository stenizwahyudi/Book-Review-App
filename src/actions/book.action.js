import Axios from 'axios'

function loadingBooks() {
    return {
        type: "REQUEST_BOOKS"
    }
}

function receiveBookList(books) {
    return {
        type: "RECEIVE_BOOKS",
        books
    }
}

function inFlight() {
    return {
        type: "REQUEST_INFLIGHT"
    }
}

export function clearBooks() {
    return {
        type: "CLEAR_BOOKS"
    }
}

export function getBooks() {
    return function(dispatch) {
        dispatch(loadingBooks());
        return Axios.get('api/book')
            .then(response => dispatch(receiveBookList(response.data)),
                error => console.log('An error occured.', error)
            );
    }
}

export function getBooksById(id) {
    return function(dispatch) {
        dispatch(loadingBooks());
        return Axios.get('/api/book/id/' + id)
            .then(response => 
                dispatch(receiveBookList(response.data)),
                error => alert("No book is found :(")
            );
    }
}

export function getBooksByTitle(title) {
    return function(dispatch) {
        dispatch(loadingBooks());
        return Axios.get('api/book/title/' + title)
            .then(response => 
                dispatch(receiveBookList(response.data)),
                error => alert("No book is found :(")
            );
    }
}

export function addBook(book) {
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.post(`/api/book`, book)
            .then(
                response => alert("Book is successfully added to our database. Thank you! :)"),
                error => alert("Sorry, error found :(")
            )
    }
}

// export function deletePokemon(pokemonId) {
//     return function(dispatch) {
//         dispatch(inFlight());
//         return Axios.delete(`/api/pokemon/` + pokemonId)
//             .then(() => Axios.get(`/api/pokemon`),
//                 error => console.log('An error occurred.', error))
//             .then(
//                 response => dispatch(receivePokemonList(response.data)),
//                 error => console.log('An error occurred.', error)
//             )
//     }
// }