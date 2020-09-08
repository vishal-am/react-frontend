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
      isLoggedIn:false,
      userToken:'',
      name:''
    }
    data={
      isLoggedIn:false,
      userToken:'',
      name:''
    }

    noneDisplay={
      display:'none'
    }
    displayIt={
      display:'inline'
    }
    componentDidMount=()=>{
      // if (localStorage.getItem('token') !== null ){
      //   this.setState({tokenSet:true, inOutKey:'Logout'})
      // }
      


      if(localStorage.getItem('token') !== ''){
        
        try {
          // let {userToken,name,isLoggedIn} = this.state;
           let token = Jwt(localStorage.getItem('token'));

          this.setState({
            userToken : token,
            name :token.name,
            isLoggedIn :true
          })
          
          // valid token format
        } catch(error) {
          // invalid token format
        }
      
        

      //   this.setState({
      //     user:Jwt(localStorage.getItem('token'))
            
      //   }
      // )
      // this.state.userName = this.state.user.name

    }
    // localStorage.clear();
  }


  render(){
    
    console.log(this.state)
    // console.log('state.status',this.state.user.name)
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
            <li style={this.state.isLoggedIn?this.noneDisplay:this.displayIt} >
              <Link to="/signup">Sign Up</Link>
            </li>
            <li style={this.state.isLoggedIn?this.noneDisplay:this.displayIt} >
              <Link to='/login' >LogIn</Link>
            </li>
           
            <li style={this.state.isLoggedIn?this.displayIt:this.noneDisplay}>
            {this.state.name}
            </li>   

            <li style={this.state.isLoggedIn?this.displayIt:this.noneDisplay} >
              <Link to="/logout">LogOut</Link>
            </li>
  
            
          </ul>
        </nav>

         <Switch> 

         {/* <li style={this.state.isLoggedIn?this.displayIt:this.noneDisplay}>
            <h4>{this.state.name}</h4>
            </li>    */}
         {/* looks through its children  and
            renders the first one that matches the current URL. */}
        
        <Route path ='/logout'>
            <Logout/>
          </Route>
          
            <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <Register />
          </Route>
          {/* <Route exact path="/">
              {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
          </Route> */}

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



 {/* className={this.data.isLoggedIn ? 'd- float-right m-5': 'none'} */}