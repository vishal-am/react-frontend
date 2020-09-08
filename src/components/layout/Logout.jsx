import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from './UserContext';

class Logout extends Component {
    state = { 
        isLoggedIn:true
     }

    handleLogout=()=>{
        localStorage.setItem('token','');
        this.setState({
            isLoggedIn:false
        })
        
    }
    
    render() { 
        return (
        <div>
            <h2>Do You Really Want to LogOut!!</h2>
            <button  onClick={this.handleLogout}>Logout</button>
        </div>
        )
    }
    }
export default Logout;