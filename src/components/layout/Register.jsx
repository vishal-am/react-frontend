import React, { Component } from 'react';
import axios from 'axios';
import amw from './AMW_Logo.svg';
import Joi from  'joi-browser';
// import Jo from 'joi'
import'bootstrap/dist/css/bootstrap.min.css';
class Register extends Component {
    state = { 
        name:'',
        username:'',
        password:'',
        password2:'',
        errors:{
        },
        status:null,
        account:{
          name:'',username:'',password:'',password2:''
        }

     }
    
     schema = {
       name: Joi .string().required(),
       username: Joi .string().required(),
       password: Joi .string().required(),
       password2:Joi .string().required()
     };


     validate = () => {

      // const errors = {};
      // const {account} = this.state;
      // if (account.name.trim()==='')
      //   errors.name='Name is required';
      // if (account.username.trim()==='')
      //   errors.username='Email is required';
      // if (account.password.trim()==='')
      //   errors.password='Password is required';
      // if(account.password2.trim()==='')
      //   errors.password2='Password confirmation is required'     
      
      
      //   return  Object.keys(errors).length === 0 ? null :errors;




       const options = {abortEarly:false};
       const {error} = Joi.validate(this.state.account,this.schema,options);
       if (!error)return null;
       
       const errors = {};
       for (let item of error.details) errors[item.path[0]]= item.message;
       return errors;




     }
     validateProperty = ({name,value}) =>{
       const obj = {[name]:value};
       const schema = {[name]:this.scema[name]};
       const {error} = Joi.validate(obj,schema);
       return error ? error.details[0].message:null;
     }


    handleChange = event => {

        // const errors = {...this.state.error};
        // const errorMessage = this.validateProperty(input);
        // if(errorMessage) errors[input.name] = errorMessage;
        // else delete errors[input.name]

        // const account = {...this.state.account};
        // account[input.name] = input.value;


        // this.setState({[event.target.name] : event.target.value });


      //   console.log(event.target.name)
      //   this.setState({
      //     account: {
      //       ...this.state.account,
      //       [event.target.name]: event.target.value
      // }
      //   })
      }
    
    handleSubmit = event => {
        event.preventDefault();

    // const errors = this.validate();
    // this.setState({errors:errors || {}});
    // if (errors) return 

    const errors = this.validate();
    console.log(errors)
    this.setState({errors})
    // console.log(errors)
    if (errors) return;

        const user = {
          name: this.state.account.name,
          email: this.state.account.username,
          password:this.state.account.password,
          password2: this.state.account.password2
        };
    
        axios.post('http://localhost:5000/api/users/register',  user)
          .then(res => {
            let {request,status,errors,error} = res;
            let {responseText} = request;
            // console.log(status);   
            // console.log(error)
            console.log(responseText);

            // let z = (Object.values(responseText));
          //  let y = console.log(z)
            this.setState({message:responseText})
          })
          
      }
    
    render() { 
        // console.log(this.state.account);
      // if (this.){
      //   return(
      //     <div style={{
      //       backgroundColor:'#e0ece4',textAlign:'center',paddingTop:200,paddingBottom:200
      //     }}><h1>Congratulations, You have signed up</h1></div>
      //   )
      // }
      console.log(Joi)

        return ( <div className='form-group' style={{
          backgroundColor:'#e0ece4'
          // height:'100%',
          
        }}
         >
        <div style={{
        paddingTop:60,paddingBottom:180
      }}>
            <form className='' style={{
                  margin:'auto',
                  backgroundColor:'#31112c',  
                  padding:35,
                  borderRadius:30,width:440
                }} onSubmit={this.handleSubmit} >
         
  <div style={{textAlign:'center'}} >
        <img src={amw} style={{ width:300}}/>
      </div>   
              <div class="form-group mt-4" >
              <label for="name">Your Name</label>
              <input type="text" class  ="form-control" value={this.state.account.name}
              autoComplete='off' aria-describedby="emailHelp" name="name" 
              onChange={this.handleChange} placeholder='Enter Your Name'/>
              <div className='alert alert-danger'>{this.state.errors.name}</div>
              </div>

              <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
                <input type='email' name='username' value={this.state.account.email} autoComplete='off'
                 onChange={this.handleChange} className='form-control'
                  placeholder='Enter Email'/>
                  <div className='alert alert-danger'>{this.state.errors.username}</div>
                {/* <div className='alert alert-danger'> this</div> */}
                </div>
               
                <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type='password' name='password' onChange={this.handleChange}
                  placeholder='Type Your Password' value={this.state.account.password}></input>
                  <div className='alert alert-danger'>{this.state.errors.password}</div>
</div>
                <div class="form-group">
                <label for="exampleInputPassword1">Type Password Again</label>
                <input type='password' name='password2'  onChange={this.handleChange}  value={this.state.account.password2} placeholder='Confirm Your Password'></input>
                <div className='alert alert-danger'>{this.state.errors.password2}</div>
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
            <h4 style={{color:'white'}}>
              {/* {this.state.errors} */}
            </h4>
          </form>
          </div>
        </div> );
    }
}


    
    
export default Register;