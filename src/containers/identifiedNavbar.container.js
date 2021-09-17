import React from 'react';
import { connect } from 'react-redux';
import {Redirect} from "react-router";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class IdentifiedNavbarClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          home: false,
          yourReview: false,
          logout: false,
          profile: false,
        };
    }

    componentDidMount() {
        this.setState({
          home: false,
          yourReview: false,
          logout: false,
          profile: false,
        })
    }

    setHome = () => {
      this.setState({
        home: true
      })
    }

    setYourReview = () => {
      this.setState({
        yourReview: true
      })
    }

    setLogout = () => {
      this.setState({
        logout: true
      })
    }

    setProfile = () => {
      this.setState({
        profile: true
      })
    }    

    goHome = () => {
      if (this.state.home) {
        return <Redirect to='/identified' />
      }
    }

    goYourReviews = () => {
      if (this.state.yourReview) {
        return <Redirect to='/yourreviews' />
      }
    }

    goLogout = () => {
      if (this.state.logout) {
        return <Redirect to='/logout' />
      }
    }

    goProfile = () => {
      if (this.state.profile) {
        return <Redirect to='/profile' />
      }
    }

    render() {
      return (
        <div>
          {this.goHome()}
          {this.goYourReviews()}
          {this.goLogout()}
          {this.goProfile()}
          <Navbar collapseOnSelect fixed='top' expand='sm' bg="dark" variant="dark">
            <Navbar.Brand id='home' onClick={this.setHome}>Buku</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <Nav.Link id='home' onClick={this.setHome}>Home</Nav.Link>
                <Nav.Link id='profile' onClick={this.setProfile}>Profile</Nav.Link>
                <Nav.Link id='yourReview' onClick={this.setYourReview}>Your Reviews</Nav.Link>
                <Nav.Link id='logout' onClick={this.setLogout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br />
        </div>
      )
    }
}
