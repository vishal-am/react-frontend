//Components Imports
import React, { Component } from 'react';
// import 'rsuite/dist/styles/rsuite-default.css';
import { GiHamburgerMenu,FaGithub,FaBeer ,FaBars,FaPlus, FaTimes,FaEdit} from 'react-icons/fa';
import  { Fontawesome}from '@fortawesome/fontawesome-svg-core'
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom";
import {Button,Nav,NavDropdown} from 'react-bootstrap';


// import AddLogs from './AddLogs';




// components exports
import AddLogs from './AddLogs.jsx';


class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      activeKey: '1'
    };
    
  }

  style={
    showSidebar:{
      height: '100%',
        width: 250,
        marginLeft:0,
  position: 'fixed',
  zIndex: 1,
  top: 0,
  left: 0,
  backgroundColor: '#f8f9fa',
  overflowX: 'hidden',
  transition: '0.5s',
  paddingTop: '60px'
    },
    hideSidebar:{
        height: '100%',
          width: 0,
    position: 'fixed',
    zIndex: 1,
    top: 0,
    left: 0,
    backgroundColor: '#111',
    overflowX: 'hidden',
    transition: '0.5s',
    paddingTop: '60px',
    marginLeft:0
  }
}
  
  handleToggle=()=> {
    this.setState({
      expanded: !this.state.expanded
    });
  }
  handleSelect=(eventKey) =>{
    this.setState({
      activeKey: eventKey
    });
  }


  
  render() {
    // const { expanded } = this.state;

    return (

      <div style={{ width: 220 }}  >
        <div style={{
           width:45,
           backgroundColor:'#f8f9fa'
                    }}>
           <a onClick={this.handleToggle} style={{display:'block',cursor:"pointer",
           textAlign:'center',
           padding:10,
           color:'#343a40',
           transition:'all 0.3  ease'}}><FaBars size='1.5rem'/></a>
        </div>

        <div style={this.state.expanded?this.style.showSidebar:this.style.hideSidebar}>
            
<div style={{padding: '8px 8px 8px 32px',
  textDecoration:'none',
  fontSize: '20px',
  color: '#818181',
  display: 'block',
  transition: '0.3s',
  marginTop:30
  }}>

            <a onClick={this.handleToggle} style={{
              position: 'absolute',
            top: 0,
            right: '25px',
            fontSize: '36px',
            marginLeft: '50px',cursor:"pointer"
            }}><FaTimes size='20'/></a>
            <Link to='/addlogs' >
                <Nav.Item className='m-2 text-secondary '> <FaPlus className='m-2'/> Add Logs</Nav.Item>
            </Link>
            <Link to='/editlog'>
                <Nav.Item className='m-2 text-secondary ' > <FaEdit className='m-2'/> Edit Logs</Nav.Item>
            </Link>
            {/* <Link to='/addlogs'>
                <Nav.Item className='m-2 text-secondary ' > <FaPlus className='m-2'/> Add Logs</Nav.Item>
            </Link> */}

  
        </div>
            </div>

        </div>   



    );
  }
}
 
export default Sidebar;


