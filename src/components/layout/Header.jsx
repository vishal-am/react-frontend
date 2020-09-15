import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Button,Navbar,Nav} from 'react-bootstrap';

//images import 
import AMW from './AMW_Logo.svg'


class Header extends Component {

  style={
    noneDisplay:{
      display:'none'
    },
    displayIt:{
      // display:'inline'
      color:'black',
    },
    displayItLog:{
      display:'inline',
      color:'black',
      float:'right'
    }
  }
  noneDisplay={
    display:'none'
  }
  displayIt={
    // display:'inline'
  }
  displayItLog={
    display:'inline',
    float:'right',
    color:'black'
  }
  render() {
    return (
        
          
              <Navbar collapseOnSelect expand="lg" bg="light" variant="light" >
               <Link to='/'>
                <Navbar.Brand href="/">
                <img src={AMW} style={{
                                          width:200,
                                          marginLeft:20 }}></img>
                </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  
                  <Nav className="ml-auto text-secondary">

                  <Link to="/dashboard" >
                    <Nav.Item eventKey={2} className='m-2' style={this.props.isLoggedIn?this.style.displayItLog:this.style.noneDisplay}  >
                    {this.props.name}
                    </Nav.Item>
                    </Link>
                    
                    <Link to="/logout" >
                    <Nav.Item className='m-2' style={this.props.isLoggedIn?this.style.displayItLog:this.style.noneDisplay} >
                      Logout
                    </Nav.Item>
                    </Link>
                    
                    <Link to='/login'>
                    <Nav.Item  className='m-2' style={this.props.isLoggedIn?this.style.noneDisplay:this.style.displayIt}>
                      Login
                    </Nav.Item>
                    </Link>
                    
                    <Link to='/signup'>
                    <Nav.Item className='m-2' style={this.props.isLoggedIn?this.style.noneDisplay:this.style.displayIt}>
                      Sign Up
                    </Nav.Item>
                    </Link>


                  </Nav>

                  </Navbar.Collapse>
              </Navbar>
            
      
    );
  }
}
export default Header;

