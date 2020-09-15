import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';
import UserContext from './UserContext';
import { Alert } from 'rsuite';

import Login from './Login';

class Logout extends Component {
    state = { 
        isLoggedIn:true
     }

    handleLogout=()=>{
        localStorage.setItem('token','');
        this.setState({
            isLoggedIn:false
        })
            Alert.warning( 'We Miss You!');
        setTimeout(function () {
            window.location.href = "/"; //will redirect to your blog page (an ex: blog.html)
         }, 2000);
        
       
          

        
    }
    
    render() { 
        // if (!this.state.isLoggedIn){
        //     return(
        //     <UserContext>
        //     {data=>data.isLoggedIn=false}
        //         <Route exact path="/logout">
        //             {this.state.isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
        //         </Route>  
        //     </UserContext>
                
        //     )
        // }
        return (
        <div style={{
            textAlign:"center",
            padding:100
        }}>
            <h2>Do You Really Want to LogOut!!</h2>
            <button className='btn btn-danger m-4' onClick={this.handleLogout}>Logout</button>
        </div>
        )
    }
    }
export default Logout;