import React from "react";
import {connect} from 'react-redux';
import {clear, register, validate, selectUser} from '../actions/user.action'
import {Redirect} from "react-router";
import AnonymousNavbarClass from '../containers/anonymousNavbar.container';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', validatePassword: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.selectUser(this.state.username);
        this.props.validate(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        this.props.clear();
        this.setState({
            username: '',
            password: '',
            validatePassword: '',
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.valid.success) {
            this.props.register(this.state.username, this.state.password);
        }
    }

    render() {
        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        let error;
        if (this.props.error || this.props.valid.message) {
            error = (<h3>{this.props.error || this.props.valid.message}</h3>)
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
                        <label>Username:</label>
                        <input type="text" id='textbox' className="form-control"
                               disabled={this.props.inFlight}
                               value={this.state.username}
                               onChange={(e) => this.handleChange(e, 'username')}/><br/>
                        <label>Password:</label>
                        <br/>
                        <input type="password" id='textbox' className="form-control"
                               disabled={this.props.inFlight}
                               value={this.state.password}
                               onChange={(e) => this.handleChange(e, 'password')}/><br/>
                        <label>Validate Password:</label>
                        <br/>
                        <input type="password" id='textbox' className="form-control"
                               disabled={this.props.inFlight}
                               value={this.state.validatePassword}
                               onChange={(e) => this.handleChange(e, 'validatePassword')}/><br/>
                        <input type="submit" className="btn btn-primary" value="Register" disabled={this.props.inFlight}/>
                    </form>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        register: (username, password) => dispatch(register(username, password)),
        clear: () => dispatch(clear()),
        validate: (user) => dispatch(validate(user)),
        selectUser: (name) => dispatch(selectUser(name)),
    }
}


function mapStateToProps(state, props) {
    return {
        ...state.user,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)