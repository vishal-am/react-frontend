import React, { Component } from 'react';
import axios from 'axios';
import amw from './AMW_Logo.svg';
import Joi from  'joi-browser';
import toastr from 'toastr';
// import Jo from 'joi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import'bootstrap/dist/css/bootstrap.min.css';
class Register extends Component {
    state = { 
        errors:{
          name:'',
          username:'',
          password:'',
          password2:''
        },
        isRegistered:false,
        account:{
          name:'',username:'',password:'',password2:''
        },
        message:''
     }
    //  notify = () => toast("Wow so easy !");

     schema = {
       name: Joi .string().required(),
       username: Joi.string().email().regex(/[@amwebtech.com -.com]/).required().label('Please TYPE Valid AMWEBTECH Username'),
       password: Joi .string().regex(/[a-zA-Z0-9]{6,30}/).required().label('Must Be Six Digits Minimum'),
       password2: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
     };


     validate = () => {

       const options = {abortEarly:false};
       const {error} = Joi.validate(this.state.account,this.schema,options);
       if (!error)return null;
       console.log(error)
       const errors = {};
       for (let item of error.details) errors[item.path[0]]= item.message;
       return errors;


     }
    //  validateProperty = ({name,value}) =>{
    //    const obj = {[name]:value};
    //    const schema = {[name]:this.schema[name]};
    //    const {error} = Joi.validate(obj,schema);
    //    return error ? error.details[0].message:null;
    //  }


    handleChange = event => {

        const errors = {...this.state.error};
        // const errorMessage = this.validateProperty(input);
        // if(errorMessage) errors[input.name] = errorMessage;
        // else delete errors[input.name]

        // const account = {...this.state.account};
        // account[input.name] = input.value;
        // this.setState({[event.target.name] : event.target.value });
        // console.log(event.target.name)


        this.setState({
          account: {
            ...this.state.account,
            [event.target.name]: event.target.value
      },errors:{...this.state.errors,
      [event.target.name]:''}
        })
      }
    
    handleSubmit = event => {
        event.preventDefault();

    // const errors = this.validate();
    // this.setState({errors:errors || {}});
    // if (errors) return 

    const errors = this.validate();

    if (errors){
      this.setState({errors});
      return;
    } 

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
             let message = (Object.values(res.data))

            this.setState({message:message , isRegistered:res.data.success})
            
            if (this.state.isRegistered){
              // toast.success('Succesfully Registered');
              // window.location='/login';
              setTimeout(function () {
                window.location.href = "/login"; //will redirect to your blog page (an ex: blog.html)
             }, 2000);
              console.log('Redirecting it')
            }
            // console.log(z)
          })
          
      }
    
    render() { 
      let nameErrorLen = this.state.errors.name?this.state.errors.name.length:0;
      let usernameErrorLen = this.state.errors.username? this.state.errors.username.length:0;
      let passErrorLen =this.state.errors.password? this.state.errors.password.length:0;
      let pass2ErrorLen = this.state.errors.password2? this.state.errors.password2.length:0;



      // if (this.state.status)return(
      //   <div><h2>Congratulationss</h2></div>
      // )

        return ( <div className='form-group' style={{
          backgroundColor:'#e0ece4'
        }}>
        <ToastContainer/>
        <div style={{
        paddingTop:60,paddingBottom:180
      }}>
            <form className='' style={{
                  margin:'auto',
                  backgroundColor:'#f7f7fa',  
                  padding:35,
                  borderRadius:30,width:440
                }} onSubmit={this.handleSubmit} >
         
  <div style={{textAlign:'center'}} >
        <img src={amw} style={{ width:300}}/>
      </div>   
              <div class="form-group mt-4" >
              {/* <label for="name">Your Name</label> */}
              <input type="text"  value={this.state.account.name}
              autoComplete='off' aria-describedby="emailHelp" name="name" 
              onChange={this.handleChange} className='text-warning' placeholder='Enter Your Name'/>
              <div className={nameErrorLen === 0? '':'alert alert-danger'}>{this.state.errors.name}</div>
              </div>

              <div class="form-group">
              {/* <label for="exampleInputEmail1">Email address</label> */}
                <input  name='username' className='text-warning' value={this.state.account.email} autoComplete='off'
                 onChange={this.handleChange} 
                  placeholder='Enter Email'/>
                  <div className={usernameErrorLen === 0? '':'alert alert-danger'}>{this.state.errors.username}</div>
                </div>
               
                <div class="form-group">
                {/* <label for="exampleInputPassword1">Password</label> */}
                <input type='password' name='password' onChange={this.handleChange}
                  placeholder='Type Your Password' className='text-warning' value={this.state.account.password}></input>
                  <div className={passErrorLen === 0? '':'alert alert-danger'}>{this.state.errors.password}</div>
</div>
                <div class="form-group">
                {/* <label for="exampleInputPassword1">Type Password Again</label> */}
                <input type='password' name='password2' className='text-warning' onChange={this.handleChange}  value={this.state.account.password2} placeholder='Confirm Your Password'></input>
                <div className={pass2ErrorLen === 0? '':'alert alert-danger'}>{this.state.errors.password2}</div>
                </div>
               
            <div style={{textAlign:'center'}}>
            <button className='btn btn-danger btn-lg mt-3' style={{
              margin:'auto'
            }} type="submit">Submit</button>
            </div>
            <h4 style={{color:'white'}}>
            {/* { this.state.message[0]} */}
            </h4>
          </form>
          </div>
        </div> );
    }
}


    
    
export default Register;