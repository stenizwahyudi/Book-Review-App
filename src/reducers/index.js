import bookReducers from "./book.reducer";
import userReducer from "./user.reducer";
import connectReducer from "./connect.reducer";
import userReviewReducer from './userReview.reducer';
import {combineReducers} from 'redux'


export default combineReducers({
    book: bookReducers,
    user: userReducer,
    connection: connectReducer,
    userReview: userReviewReducer,
})