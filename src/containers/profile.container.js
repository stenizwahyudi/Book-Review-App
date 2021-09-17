import React from "react";
import {connect} from 'react-redux';
import {Redirect} from "react-router";
import {deleteAccount, editAccount} from '../actions/user.action';
import IdentifiedNavbarClass from '../containers/identifiedNavbar.container';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.getNewUsername = this.getNewUsername.bind(this);
    
        this.state = {
          username: '',
          status: false,
          edit: false,
          newUsername: '',
        };
    }

    componentDidMount() {
        this.setState({username: this.props.username, status: this.props.status.expert, edit: false});
    }

    getNewUsername(e){
      this.setState({
        newUsername: e.target.value
      }) 
    }

    render() {

        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        if (this.state.edit) {
            return (
                <div>
                    <div>
                        <IdentifiedNavbarClass />
                        <br/>
                        <br/>
                        <br/>
                    </div>
                    <div id ='body'>
                        <h2>You are trying to edit your username</h2>
                        <br/>
                        <label>Please input new username:</label>
                        <br/>
                        <input type="text" id="textbox" className='form-control' onChange={this.getNewUsername} className="form-control" value={this.state.newUsername}/><br />
                        <button className="btn btn-success" onClick={(e) => this._editAccount(e, this.state.username)}>
                            Confirm
                        </button>
                        &nbsp;
                        <button className="btn btn-danger" onClick={(e) => this._cancel(e)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )
        }
        
        return (
            <div>
                <div>
                    <IdentifiedNavbarClass />
                    <br/>
                    <br/>
                    <br/>
                </div>
                <div id='body'>
                    <h2>This is your profile page</h2>
                    <br/>
                    <h5>Username: {this.state.username}</h5>
                    <h5>Status: {this._displayStatus(this.state.status)}</h5>
                    <button className="btn btn-primary" onClick={(e) => this._edit(e)}>
                        Edit Username
                    </button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={(e) => this._deleteAccount(e, this.state.username)}>
                        Delete Account
                    </button>
                </div>
            </div>

        );
    }

    _cancel(e) {
        e.preventDefault();
        this.setState({edit: false});
    }

    _edit(e) {
        e.preventDefault();
        this.setState({edit: true});
    }

    _displayStatus(value) {
        let status;
        if (value === true) {
            status = "Expert"
        } else {
            status = "Public"
        }
        return status;
    }

    _editAccount(e, name) {
        const data = {};
        data.currentUsername = this.state.username;
        data.newUsername = this.state.newUsername;
        e.preventDefault();
        this.props.editAccount(data);
    }    

    _deleteAccount(e, name) {
        e.preventDefault();
        this.props.deleteAccount(name);
    }
}

let mapDispatchToProps = function (dispatch, props) {
  return {
    deleteAccount: (name) => dispatch(deleteAccount(name)),
    editAccount: (data) => dispatch(editAccount(data)),
  }
}


function mapStateToProps(state, props) {
    return {
        ...state.user,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)