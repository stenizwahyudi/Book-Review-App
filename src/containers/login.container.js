import React from "react";
import {connect} from 'react-redux';
import {clear, login, selectUser} from '../actions/user.action'
import {Redirect} from "react-router";
import AnonymousNavbarClass from '../containers/anonymousNavbar.container';

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.selectUser(this.state.username);
        this.props.login(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.clear();
        this.setState({username: '', password: ''});
    }

    render() {
        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        let error;
        if (this.props.error) {
            error = (
                <div>
                    <h3>{this.props.error}</h3><br/>
                </div>
            );
        }

        return (
            <div>
                <div>
                    <AnonymousNavbarClass />
                </div>
                <br/>
                <br/>
                <br/>
                <div id='body'>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        {error}
                        <label>Username:</label><br/>
                        <input id='textbox' className="form-control" type="text"
                            disabled={this.props.inFlight}
                            value={this.state.username}
                            onChange={(e) => this.handleChange(e, 'username')}/>
                        <br/>
                        <label>Password:</label> <br/>
                        <input id='textbox' className="form-control" type="password"
                           disabled={this.props.inFlight}
                           value={this.state.password}
                           onChange={(e) => this.handleChange(e, 'password')}/>
                        <br/>
                        <input type="submit" className="btn btn-success" value="Login" disabled={this.props.inFlight}/>
                    </form>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        login: (user) => dispatch(login(user)),
        clear: () => dispatch(clear()),
        selectUser: (name) => dispatch(selectUser(name)),
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
)(UserLogin)