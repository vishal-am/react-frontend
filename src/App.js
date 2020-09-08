import React, { Component } from 'react';
import './App.css';
import Register from './components/layout/Register'
import Login from './components/layout/Login'
import Home from './components/Home';
import Logout from './components/layout/Logout';
import UserContext from './components/layout/UserContext';
// import Joi from './components/layout/joi'
import Jwt from 'jwt-decode'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import Home from './components/Home';
// import Navbar from "./components/layout/Navbar";
// import Landing from "./components/layout/Landing";


class App extends Component {

    state={
      status:{
        isLoggedIn:'thisis the app state data',
        userInfo:''
      }
    }
  
    componentDidMount=()=>{
      // if (localStorage.getItem('token') !== null ){
      //   this.setState({tokenSet:true, inOutKey:'Logout'})
      // }
      this.setState({status:{...this.state.status,
        userInfo:Jwt(localStorage.getItem('token'))
      }
    }
  );


    }
  render(){
    console.log(this.state.status)
    // console.log(Jwt(localStorage.getItem('token')))
   
  return (
    <UserContext.Provider value={this.state}>

    <div className="App" style={{
      backgroundColor:'#e0ece4'
    }}>
    <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Sign Up</Link>
            </li>
            {/* <li className='float-right mr-5'>
            {this.state.status.userInfo.name == ''?'':this.state.status.userInfo.name}
            </li>    */}
            {/* <li className='float-right m-5'>
              <Link to="/logout">LogOut</Link>
            </li> */}
  
            
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        {/* <Route path ='/logout'>
            <Logout/>
          </Route> */}
          
            <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <Register />
          </Route>

          <Route path="/">
          <Home/>
          </Route>
          

          
        </Switch>
    </Router>

      
    </div>
    </UserContext.Provider>
  );
}
}

export default App;
