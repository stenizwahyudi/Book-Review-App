import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect, Link
} from "react-router-dom";
import UserLogin from "./containers/login.container";
import Register from "./containers/register.container";
import Identified from "./containers/identified.container";
import Anonymous from "./containers/anonymous.container";
import WriteReview from "./containers/writeReview.container";
import EditReview from "./containers/editReview.container";
import Reviews from "./containers/reviews.container";
import Logout from "./containers/logout.container";
import Connect from "./containers/connect.container";
import LoggedInComponent from './components/loggedin.component';
import BookSearcher from './containers/bookSearcher.container';
import Profile from './containers/profile.container';
import 'bootstrap/dist/css/bootstrap.min.css';

const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={userStore}>
        <BrowserRouter>
            <Switch>
                <Route path="/anonymous" component={Anonymous}/>
                <Route path="/login" component={UserLogin}/>
                <Route path="/register" component={Register}/>
                <Route path="/identified" component={LoggedInComponent(Identified)}/>
                <Route path="/writereview/:id" component={LoggedInComponent(WriteReview)}/>
                <Route path="/editreview" component={LoggedInComponent(EditReview)}/>
                <Route path="/yourreviews" component={LoggedInComponent(Reviews)}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/seereviews/:id" component={Connect}/>
                <Route path="/search" component={LoggedInComponent(BookSearcher)}/>
                <Route path="/profile" component={LoggedInComponent(Profile)}/>
                <Redirect exact from="/" to="anonymous"/>
            </Switch>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);