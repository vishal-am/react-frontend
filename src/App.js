//Packages Import
import React, { Component ,useState} from 'react';
import { createBrowserHistory } from 'history';
import Jwt from 'jwt-decode';
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom";
import Fontawesome from '@fortawesome/fontawesome-svg-core';


//Style Import
import './App.css';
import './styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';
// import 'rsuite/lib/styles/index.less';

//Components Import
import AddLogs from './components/layout/AddLogs'
import Register from './components/layout/Register'
import Login from './components/layout/Login'
import Home from './components/Home';
import Logout from './components/layout/Logout';
import {getUser} from './services/authService';
import ExampleHooks from './components/layout/exampleHooks';
import LoginBody from './components/layout/LoginBody';
import Header from './components/layout/Header';
import EditLog from './components/layout/EditLog';
import Futer from './components/layout/Futer';

//Contexts import
import UserContext from './components/layout/UserContext';


//Images & SVG import


class App extends Component {
constructor(){
  super()
  let history =  createBrowserHistory()
  let userInfo= getUser()
  this.state={
    isLoggedIn:false,
    userToken:'',
    user:userInfo,
    showSideBar:false,
   
  }
  if (userInfo){
    history.push('/dashboard')
  }else{
    history.push('/')
  }
  
}
    
  setLocale= (props)=>{
    this.setState({locale:props})
  }
    // data={
    //   isLoggedIn:false,
    //   userToken:'',
    //   name:''
    // }

   

    updateValue = (key, val) => {
      this.setState({[key]: val});
   }
   handleSidebar=()=>{
     this.setState({
       showSideBar:true
     })
   }
   componentDidUpdate=()=>{
     if(this.state.isLoggedIn  !== this.state.isLoggedIn) {
       console.log('componentdidupdate worked')
     }
     
  }

    componentDidMount=()=>{
     
      if(localStorage.getItem('token') !== ''){
        
        try {
           let token = Jwt(localStorage.getItem('token'));

          this.setState({
            userToken : token,
            name :token.name,
            isLoggedIn :true
          })
          
        } catch(error) {
          // invalid token format
        }
          
    }
  }


  render(){
    
    console.log(this.state.showSideBar)
   
  return (
    <UserContext.Provider value={{state:this.state,update:this.updateValue}}>
      
      <div className="App" style={{backgroundColor:'#e0ece4'}}>
    <Router>

      {/* Components Belo Here */}
       <Header isLoggedIn={this.state.isLoggedIn} name={this.state.name}/>
       {/* <Futer/> */}
    


      <Switch>   
      
          <Route path='/editlog'>
            <EditLog/>
          </Route>              
          <Route exact path="/login" >
          {this.state.isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
          </Route>          
          
          <Route path="/dashboard" >
          {this.state.isLoggedIn ? <LoginBody/> : <Home />}
          </Route>

          <Route path='/example' component={ExampleHooks}/>
          {/* <Route  path='/addlogs' component={AddLogs}/> */}
          <Route path ='/logout' component={Logout}/> 
          <Route path="/signup" component={Register}/>
          <Route exact path="/" component={Home}/>
           
        </Switch>
    </Router>
    </div>
    </UserContext.Provider>
  );
}
}
export default App;


