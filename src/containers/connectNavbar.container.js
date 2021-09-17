import React from 'react';
import {Redirect} from "react-router";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class ConnectNavbarClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          home: false
        };
    }

    componentDidMount() {
        this.setState({
          home: false
        })
    }

    setHome = () => {
      this.setState({
        home: true
      })
    }

    goHome = () => {
      if (this.state.home) {
        return <Redirect to='/identified' />
      }
    }

    render() {
      return (
        <div>
          {this.goHome()}
          <Navbar collapseOnSelect fixed='top' expand='sm' bg="dark" variant="dark">
            <Navbar.Brand id='home' onClick={this.setHome}>Buku</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <Nav.Link id='home' onClick={this.setHome}>Home</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br />
        </div>
      )
    }
}