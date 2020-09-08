import React, { Component } from 'react';

class Logout extends Component {
    state = {  }

    handleLogout=()=>{
        localStorage.setItem('token',null)

    }
    
    render() { 
        return ( <div>
            <h1>Are you sure, you want to logout!!</h1>
            <button  onClick={this.handleLogout}>
Yes
            </button>
        </div> );
    }
}
 
export default Logout;