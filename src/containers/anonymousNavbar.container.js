import React from 'react';
import {Redirect} from "react-router";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class AnonymousNavbarClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          home: false,
          login: false,
          register: false
        };
    }

    componentDidMount() {
        this.setState({
          home: false,
          login: false,
          register: false
        })
    }

    setHome = () => {
      this.setState({
        home: true
      })
    }

    setLogin = () => {
      this.setState({
        login: true
      })
    }

    setRegister = () => {
      this.setState({
        register: true
      })
    }

    goHome = () => {
      if (this.state.home) {
        return <Redirect to='/anonymous' />
      }
    }

    goLogin = () => {
      if (this.state.login) {
        return <Redirect to='/login' />
      }
    }

    goRegister = () => {
      if (this.state.register) {
        return <Redirect to='/register' />
      }
    }

    render() {
      return (
        <div>
          {this.goHome()}
          {this.goLogin()}
          {this.goRegister()}
          <Navbar collapseOnSelect fixed='top' expand='sm' bg="dark" variant="dark">
            <Navbar.Brand id='home' onClick={this.setHome}>Buku</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <Nav.Link id='home' onClick={this.setHome}>Home</Nav.Link>
                <Nav.Link id='login' onClick={this.setLogin}>Login</Nav.Link>
                <Nav.Link id='register' onClick={this.setRegister}>Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br />
        </div>
      )
    }
}