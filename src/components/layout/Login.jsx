import React, { Component } from 'react';
import axios from 'axios';
import amw from './AMW_Logo.svg';
import { useHistory,Route,Redirect } from "react-router-dom";
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
    
     handleSubmit = event => {
        event.preventDefault();
        
        
          // try {
          //   await Auth.signIn(email, password);
          //   userHasAuthenticated(true);
          //   history.push("/");
          // } 

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
          //  console.log(data.token);
           localStorage.setItem('token',data.token)
            
            this.setState({success:y,isLoggedIn:true})
            // history.push("/");
          }).error(error=>{
            // console.log(error.data)
           
          })
    } catch (error) {
        
    }          
      }
    
    render() { 
      
        if ( this.state.success == true)
            return(<div style={{
                backgroundColor:'#e0ece4',height:'700',textAlign:"center",paddingTop:200,paddingBottom:200
            }}><h1>Congratulations, You've Logged IN</h1></div>)
        
        return ( 
              



              <div className='form-group' style={{
          backgroundColor:'#e0ece4',
          height:600
          
        }}
         >
         <UserContext.Consumer>
              {
                data =>
                {/* <div>{data.name}
                </div> */}
              
              }
              </UserContext.Consumer>

              <Route exact path="/">
                 {this.state.isLoggedIn ? <Redirect to="/" /> : <Login />}
              </Route>
        <div style={{
        paddingTop:60,paddingBottom:180
      }}>
            <form className='' style={{
  margin:'auto',
  backgroundColor:'#31112c',
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
              <label for="exampleInputEmail1">Email address</label>
                <input type='email' name='username' onChange={this.handleChange} required autoComplete='off' className='form-control' placeholder='Enter Email'/>
                </div>
               
                <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type='password' name='password' onChange={this.handleChange} required placeholder='Type Your Password'></input>
</div>
                
                {/* <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
            <div style={{textAlign:'center'}}>
            <button className='btn btn-danger btn-lg mt-3' style={{
              margin:'auto'
            }} type="submit">Submit</button>
            </div>
            {/* <h4  style={{textAlign:"center",color:'white'}}>{this.state.message}</h4> */}
          </form>
          </div>
        </div> 

        );
    }
}


    
    
export default Login;