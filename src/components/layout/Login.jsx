import React, { Component } from 'react';
import axios from 'axios';
import amw from './AMW_Logo.svg';

import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Joi from  'joi-browser';
import UserContext from './UserContext';


class Login extends Component {
  //  history = useHistory();
    state = { 
        username:'',
        usernameLength:null,
        password:'',
        error:'',
        success:false,
        message:null,
        isLoggedIn:false
     }
     
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        
    }
    componentDidMount=()=>{
      // toast.info('Please LoggedIn');
      console.log(this.context)
    }
     handleSubmit = (event) => {
        event.preventDefault();
      
        const user = {
          email: this.state.username,
          password:this.state.password,
        };

    try {
       axios.post('http://localhost:5000/api/users/login',  user)
          .then(res => {
              const {data} = res;
            let z = (Object.values(data));
           let y = z[0]
           localStorage.setItem('token',data.token)
            
            this.setState({message:y,isLoggedIn:true})
            if(this.state.isLoggedIn){
              toast.info('Succesfully LoggedIn');
              setTimeout(function () {
                window.location.href = "/dashboard"; //will redirect to your blog page (an ex: blog.html)
             }, 1000);
            }
            
            // data.state.isLoggedIn=this.state.isLoggedIn
          }).error(error=>{
            console.log(error.data)
           
          })
    } catch (error) {
        // console.log(error)
    }          
      }
    
    render() { 
      
   
        
        return ( 
          <div className='form-group' style={{
            backgroundColor:'#e0ece4',
            height:600}}>
            

                <Route exact path="/">
                   {this.state.isLoggedIn ? <Redirect to="/" /> : <Login />}
                </Route>
          <div style={{
          paddingTop:60,paddingBottom:180
        }}>

      
              <form className='' style={{color:'white',
    margin:'auto',
    backgroundColor:'#f7f7fa',
    padding:35,
    borderRadius:30,width:600
  }} onSubmit={this.handleSubmit} >
 
           
    <div style={{
          // margin:'center'
          // backgroundColor:'white',display:'inline-block',padding:8,borderRadius:1000,marginBottom:25,
          textAlign:'center',color:'white'
        }} >
          <img src={amw} style={{
          width:300,
        }}/>
        {/* <h2>Login In </h2> */}
        </div>   
        
  
                <div class="form-group">
                {/* <label for="exampleInputEmail1">Email address</label> */}
                  <input type='email' 
                    className='text-warning' 
                    name='username'
                   onChange={this.handleChange} required
                   autoComplete='off' 
                   placeholder='Enter Email'/>
                  </div>
                 
                  <div class="form-group">
                  {/* <label for="exampleInputPassword1">Password</label> */}
                  <input type='password'
                   className='text-warning'
                    name='password'
                     onChange={this.handleChange} required 
                  placeholder='Type Your Password'></input>
  </div>
                  
                  
              <div style={{textAlign:'center'}}>
              <button className='btn btn-danger btn-lg mt-3' style={{
                margin:'auto'
              }} type="submit">Submit</button>
              </div>
              <h4  style={{textAlign:"center",color:'white'}}>{this.state.message}</h4>
            </form>
            {/* </UserContext.Consumer> */}
            </div>
          </div> 



         
        );
    }
}


    Login.contextType = UserContext;
    
export default Login;















{/* <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div> */}