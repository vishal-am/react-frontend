//imported packages

import React, { Component } from 'react';
import {Row, Form, Button,Col} from 'react-bootstrap';
import Joi, { isNull } from 'joi-browser';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import {FaClock,FaTasks,FaInfoCircle,FaHourglassStart,FaCheckCircle} from 'react-icons/fa';


class AddLogs extends Component {
    state = { 

        addLogData:{
        todayDate:'',
        serialNo:'',
        startingTime:"09:31",
        endingTime:"",
        projectName:'',
        logDetails:'',
        milestone:'',
        logType:'Task',
        statusOfLog:'Started',
        comment:''
      },
      errors:{
          serialNo:'',
          startingTime:'',
          endingTime:'',
          projectName:'',
          logDetails:'',
          milestone:'',
          logType:'',
          statusOfLog:'',
          comment:''
         }
      }

     schema = {
      todayDate:Joi.string().max(10).required(),
      serialNo: Joi.string().min(10).max(11).required(),
      startingTime: Joi.any().required(),
      endingTime: Joi.any(),
      projectName:Joi.string().max(24).required(),
      logDetails:Joi.string().min(18).max(512).required(),
      milestone:Joi.number().integer().min(0).required(),
      logType:Joi.string().label('Choose any one of them!!'),
      statusOfLog:Joi.string() .label('Choose any one of them!!'),
      comment:Joi.string().max(512)
    };

    componentDidMount=()=>{
     let a = new Date();
    //  console.log(a)

    //  let dateString  = a.toString();
     let year = a.getFullYear();
     let month = a.getMonth() +1 ;
     let date = a.getDate();
    //  console.log(month,"month herer")
     let Today = `${date.toString()}-${month.toString() }-${year.toString()}`
    //  let Today = `${year.toString()}-${month.toString() }-${date.toString()}`

    //  console.log("today format date",Today)
      this.setState({
          addLogData:{
            ...this.state.addLogData,
            todayDate:Today
            // todayDate:'2020-09-04'
          }
        })
        // console.log(this.state)
      }
    

    validate = () => {

      const options = {abortEarly:false};
      const {error} = Joi.validate(this.state.addLogData,this.schema,options);
        if (!error)return null;
      const errors = {};
      for (let item of error.details) errors[item.path[0]]= item.message;
      return errors;

    }

    validateProperty = ({name,value}) =>{
         const obj = {[name]:value};
         const schema = {[name]:this.schema[name]};
         if(!schema[name]){
           return '';
         }
         const {error} = Joi.validate(obj,schema);
         return error ? error.details[0].message:'';//chnages here 1 of else part in strinng to null
       }

    handleChange=({currentTarget:input})=>{
     
     const errors = {...this.state.errors};
     const errorMessage = this.validateProperty(input);
     if(errorMessage) errors[input.name]= errorMessage;
     else errors[input.name]='';

     const addLogData = {...this.state.addLogData};// value changing part is being done here
     addLogData[input.name] = input.value;
     this.setState({addLogData,errors})
     }

    handleSubmit=(event)=>{
      event.preventDefault(); 
      const errors = this.validate();
      console.log(errors)
      console.log(this.state.errors)
      if (errors){
        this.setState({errors});
        return;
      } 
  
     
      let data = this.state.addLogData;
      console.log(data)
      
      axios.post('http://localhost:5000/api/logs/addlogs',data)
        .then(res => {
          let {request,status,errors,error} = res;
          console.log(request,status,errors,error)
          let {responseText} = request;
           let message = (Object.values(res.data))
          console.log(status)
          if (status===200){
            let history =  createBrowserHistory()
            toast.success('Log Added!!');
            setTimeout(function () {
              // history.push('/')
              window.location.href = "/"; //will redirect to your blog page (an ex: blog.html)
           }, 1000);

            history.push('/dashboard')
          }
          // this.setState({message:message , isRegistered:res.data.success})
          
          // if (this.state.isRegistered){
          //   // toast.success('Succesfully Registered');
          //   // window.location='/login';
          //   setTimeout(function () {
          //     window.location.href = "/login"; //will redirect to your blog page (an ex: blog.html)
          //  }, 2000);
          //   console.log('Redirecting it')
          // }
          // console.log(res)
        })
    
    }

  
    render() { 

    
      let serialNoErrorLen = this.state.errors.serialNo?this.state.errors.serialNo.length:0;
      let startingTimeErrorLen = this.state.errors.startingTime?this.state.errors.startingTime.length:0;
      let endingTimeErrorLen = this.state.errors.endingTime?this.state.errors.endingTime.length:0;
      let projectNameErrorLen = this.state.errors.projectName?this.state.errors.projectName.length:0;
      let logDetailsErrorLen = this.state.errors.logDetails?this.state.errors.logDetails.length:0;
      let milestoneErrorLen = this.state.errors.milestone?this.state.errors.milestone.length:0;
      let logTypeErrorLen = this.state.errors.logType?this.state.errors.logType.length:0;
      let statusOfLogErrorLen = this.state.errors.statusOfLog?this.state.errors.statusOfLog.length:0;
      let commentErrorLen = this.state.errors.comment?this.state.errors.comment.length:0;

      console.log('erors Data from state',this.state.errors);
      console.log('addlog Data from state:- ',this.state.addLogData)
      // console.log("date in state",this.state.addLogData.todayDate);

        return ( <div style={{marginLeft:50,
        fontFamily: 'Montserrat',
        fontWeight:100}}>
        <ToastContainer />


        <h4  className='m-5'>Add Logs Here</h4>
        <Form className='' onSubmit={this.handleSubmit}>
  <Form.Row>
    <Form.Group as={Col} >
    
      <Form.Label>Date</Form.Label>
      <Form.Control readOnly name='todayDate' value={this.state.addLogData.todayDate} onChange={this.handleChange} placeholder="Today Date" /> 
       <Form.Text className="text-muted">
      <FaInfoCircle className='mr-2'/> Date is Already Set to Today.
    </Form.Text>
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Serial No. </Form.Label>
      <Form.Control type="number" name='serialNo' value={this.state.addLogData.serialNo} onChange={this.handleChange} placeholder="DMY-Task No." />
      <Form.Text className="text-muted">
      <FaInfoCircle className='mr-2'/>Serial No. Should be in the DMY-Task No.
    </Form.Text>
      <div className={serialNoErrorLen === 0? '':'alert alert-danger p-1'}>{this.state.errors.serialNo}</div>
    </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} >
      <Form.Label>Starting Time</Form.Label>
      <Form.Control type="time" name='startingTime' value={this.state.addLogData.startingTime} onChange={this.handleChange} placeholder="Starting Time" />
      <div className={startingTimeErrorLen === 0? '':'alert alert-danger p-1'}>{this.state.errors.startingTime}</div>
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Ending Time</Form.Label>
      <Form.Control type="time" name='endingTime' value={this.state.addLogData.endingTime} onChange={this.handleChange} placeholder="Ending Time" />
      <Form.Text className="text-muted">
      <FaInfoCircle className='mr-2'/>You can also edit this field later.
    </Form.Text>
      <div className={endingTimeErrorLen === 0? '':'alert alert-danger p-1'}>{this.state.errors.endingTime}</div>
      
    </Form.Group>
  </Form.Row>

  <Form.Group >
    <Form.Label>Project Name</Form.Label>
    <Form.Control  name='projectName' value={this.state.addLogData.projectName} onChange={this.handleChange} placeholder="Enter Project Name" />
    <div className={projectNameErrorLen === 0? '':'alert alert-danger p-1'}>{this.state.errors.projectName}</div>
  </Form.Group>
  <Form.Group >
    <Form.Label>Log Details </Form.Label>
    <textarea className="form-control" name='logDetails'  value={this.state.addLogData.logDetails} onChange={this.handleChange} placeholder='Enter Log Details' rows="3"></textarea>
    <div className={logDetailsErrorLen === 0? '':'alert alert-danger p-1'}>{this.state.errors.logDetails}</div>
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} >
    <Form.Label>Milestone</Form.Label>
    <Form.Control  type='number' name='milestone' value={this.state.addLogData.milestone} onChange={this.handleChange} placeholder="Milestone" rows="1"/>
    {/* <Form.Text className="text-muted">
      <FaInfoCircle className='mr-1'/> MileStone Should be respective to the Project.
    </Form.Text> */}
    <div className={milestoneErrorLen === 0? '':'alert alert-danger p-1'}>{this.state.errors.milestone}</div>
    </Form.Group>

    <Form.Group as={Col} >
    <Form.Label>Log Type</Form.Label>
      <Form.Control as="select"  name ='logType' value={this.state.addLogData.logType} onChange={this.handleChange} defaultValue="Task">
        <option>Task</option>
        <option>Meeting</option>
        <option>Learning</option>
        <option>Research</option>
        <option>Free</option>     
        
      </Form.Control>
      <Form.Text className="text-muted">
      <FaInfoCircle className='mr-1'/> Default is Selected to Task.
    </Form.Text>
      <div className={logTypeErrorLen === 0? '':'alert alert-danger p-1'}>{this.state.errors.logType}</div>
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Stauts of Log</Form.Label>
      <Form.Control as="select"  name='statusOfLog' 
      className={this.state.addLogData.statusOfLog==='Completed'?'btn btn-success ':''}
       value={this.state.addLogData.statusOfLog} onChange={this.handleChange} defaultValue="Started">
        <option > Started </option>
        <option >Completed</option>
        <option >Stopped</option>
        <option>Bug</option>
        <option>To-Do</option>
        
        
        
      </Form.Control>
      <Form.Text className="text-muted">
      <FaInfoCircle className=''/> Default is Selected to Started.
    </Form.Text>
      <div className={statusOfLogErrorLen === 0? '':'alert alert-danger p-1'}>{this.state.errors.statusOfLog}</div>
    </Form.Group>
  </Form.Row>

  <Form.Group >
    <Form.Label>Comment</Form.Label>
    <Form.Control as="textarea" name='comment' value={this.state.addLogData.comment} onChange={this.handleChange} placeholder='Any Comment about log here...' rows="3" />
    <div className={commentErrorLen === 0? '':'alert alert-danger p-1'}>{this.state.errors.comment}</div>
  </Form.Group>



  <Button variant="primary" type="submit">
    Add
  </Button>
</Form>
        </div> 
        )
    }
}
 
export default AddLogs;