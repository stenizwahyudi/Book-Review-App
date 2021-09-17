import React from "react";
import {connect} from 'react-redux';
import {logout} from '../actions/user.action'
import {Redirect} from "react-router";

class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("mounted!");
        this.props.logout();
    }

    render() {
        if (this.props.redirect) {
            alert("You are logged out from your account. See you soon! :)");
            return (<Redirect to={this.props.redirect}/>);
        }
        alert("You are logged out from your account. See you soon! :)");
        return (<Redirect to='/anonymous'/>);
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        logout: () => dispatch(logout()),
    }
};


function mapStateToProps(state, props) {
    return {
        ...state.user,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout)