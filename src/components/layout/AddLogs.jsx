//imported packages

import React, { Component } from 'react';
import {Row, Form, Button,Col} from 'react-bootstrap';
import Joi from 'joi-browser';
import axios from 'axios';
import {FaClock,FaTasks,FaInfoCircle} from 'react-icons/fa';


class AddLogs extends Component {
    state = { 
        

        addLogData:{
          todayDate:'',
        serialNo:'',
        startingTime:'',
        endingTime:'',
        projectName:'',
        logDetails:'',
        milestone:'',
        logType:'',
        statusOfLog:'',
        comment:''
      },
      errors:{
          serialNo:'',
          startingTime:'',
          endingTime:'',
          projectName:'',
          logDetails:'',
          milestone:0,
          logType:'',
          statusOfLog:'',
          comment:''
         }
      }

     schema = {
      
      serialNo: Joi.string().min(3).max(11).required(),
      startingTime: Joi.number().required(),
      endingTime: Joi.number().required(),
      projectName:Joi.string().min(10).max(25).required(),
      logDetails:Joi.string().min(15).max(250).required(),
      milestone:Joi.number().integer().min(0).required(),
      logType:Joi.any() .label('Choose any one of them!!'),
      statusOfLog:Joi.any() .label('Choose any one of them!!'),
      comment:Joi.string()
    };

    componentDidMount=()=>{
    //  let a = new Date('dd/mm/yyyy');
    //  let a = new Date('11/25/2020');
     let a = new Date();

     let dateString  = a.toString();
     let year = a.getFullYear();
     let month = a.getMonth();
     let date = a.getDate();
      console.log("thsi si the type",typeof(date))
     let Today = `${year.toString()}-${month.toString() }-${date.toString()}`
    // let Today = {year}+'-' +{month}+'-'+{date}
      console.log('type of final date', typeof(Today))
      this.setState({
          addLogData:{
            ...this.state.addLogData,
            // todayDate:Today
            todayDate:'2020-09-04'
          }
        })
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
        //  console.log(schema)
         if(!schema[name]){
           return null;
         }
         const {error} = Joi.validate(obj,schema);
         return error ? error.details[0].message:null;
       }

    handleChange=({currentTarget:input})=>{
     
     const errors = {...this.state.errors};
     const errorMessage = this.validateProperty(input);
     if(errorMessage) errors[input.name]= errorMessage;
     else errors[input.name]='';

     const addLogData = {...this.state.addLogData};
     addLogData[input.name] = input.value;
     this.setState({addLogData,errors})

     }

    handleSubmit=(event)=>{
      event.preventDefault(); 
      const errors = this.validate();
      if (errors){
        this.setState({errors});
        return;
      } 
  
          const addLogData = {
           
               
              date:this.state.addLogData.data,
              serialNo:this.state.addLogData.serialNo,
              startingTime:this.state.addLogData.startingTime,
              endingTime:this.state.addLogData.endingTime,
              projectName:this.state.addLogData.projectName,
              logDetails:this.state.addLogData.logDetails,
              milestone:this.state.addLogData.milestone,
              logType:this.state.addLogData.logType,
              statusOfLog:this.state.addLogData.statusOfLog,
              comment:this.state.addLogData.comment
          };
      
          // axios.post('http://localhost:5000/api/users/addlog',  addLogData)
          //   .then(res => {
          //     let {request,status,errors,error} = res;
          //     let {responseText} = request;
          //      let message = (Object.values(res.data))
  
          //     this.setState({message:message , isRegistered:res.data.success})
              
          //     if (this.state.isRegistered){
          //       // toast.success('Succesfully Registered');
          //       // window.location='/login';
          //       setTimeout(function () {
          //         window.location.href = "/login"; //will redirect to your blog page (an ex: blog.html)
          //      }, 2000);
          //       console.log('Redirecting it')
          //     }
          //     // console.log(z)
          //   }
          //   )
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



      let date = this.state.addLogData.todayDate;
      
      console.log(date);
      // console.log(this.state.errors);
      console.log(this.state.addLogData.todayDate);

        return ( <div style={{marginLeft:100}}>

        <h4  className='m-5'>Add Logs Here</h4>
        <Form className='m-5' onSubmit={this.handleSubmit}>
  <Form.Row>
    <Form.Group as={Col} >
    
      <Form.Label>Date </Form.Label>
      <Form.Control disabled name='todayDate' type="date"  value={this.state.addLogData.todayDate} onChange={this.handleChange} placeholder="Today Date" /> 
       <Form.Text className="text-muted">
      <FaInfoCircle className='mr-2'/> Date is Already Set to Today.
    </Form.Text>
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Serial No. </Form.Label>
      <Form.Control type="number" name='serialNo' value={this.state.addLogData.serialNo} onChange={this.handleChange} placeholder="DMY-Task No." />
      
      <div className={serialNoErrorLen === 0? '':'alert alert-danger'}>{this.state.errors.serialNo}</div>
    </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col} >
      <Form.Label>Starting Time</Form.Label>
      <Form.Control type="time" name='startingTime' value={this.state.addLogData.startingTime} onChange={this.handleChange} placeholder="Starting Time" />
      
      <div className={startingTimeErrorLen === 0? '':'alert alert-danger'}>{this.state.errors.startingTime}</div>
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Ending Time</Form.Label>
      <Form.Control type="time" name='endingTime' value={this.state.addLogData.endingTime} onChange={this.handleChange} placeholder="Ending Time" />
      <div className={endingTimeErrorLen === 0? '':'alert alert-danger'}>{this.state.errors.endingTime}</div>
      
    </Form.Group>
  </Form.Row>

  <Form.Group >
    <Form.Label>Project Name</Form.Label>
    <Form.Control name='projectName' value={this.state.addLogData.projectName} onChange={this.handleChange} placeholder="Enter Project Name" />
    <div className={projectNameErrorLen === 0? '':'alert alert-danger'}>{this.state.errors.projectName}</div>
  </Form.Group>
  <Form.Group >
    <Form.Label>Log Details </Form.Label>
    <textarea class="form-control" name='logDetails'  value={this.state.addLogData.logDetails} onChange={this.handleChange} placeholder='Enter Log Details' rows="3"></textarea>
    <div className={logDetailsErrorLen === 0? '':'alert alert-danger'}>{this.state.errors.logDetails}</div>
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} >
    <Form.Label>Milestone</Form.Label>
    <Form.Control as='textarea' type='number' name='milestone' value={this.state.addLogData.milestone} onChange={this.handleChange} placeholder="Milestone" rows="1"/>
    <div className={milestoneErrorLen === 0? '':'alert alert-danger'}>{this.state.errors.milestone}</div>
    </Form.Group>

    <Form.Group as={Col} >
    <Form.Label>Log Type</Form.Label>
      <Form.Control as="select" name ='logType' value={this.state.addLogData.logType} onChange={this.handleChange} defaultValue="Task">
        <option name='task'>Task</option>
        <option>Meeting</option>
        <option>Learning</option>
        <option>Research</option>
        <option>Free</option>
        
        
        
      </Form.Control>
      <div className={logTypeErrorLen === 0? '':'alert alert-danger'}>{this.state.errors.logType}</div>
    </Form.Group>

    <Form.Group as={Col} >
      <Form.Label>Stauts of Log</Form.Label>
      <Form.Control as="select" name='statusOfLog' className={this.state.addLogData.statusOfLog==='Completed'?'btn btn-success ':''} value={this.state.addLogData.statusOfLog} onChange={this.handleChange} defaultValue="Started">
        <option >Started</option>
        <option>Completed</option>
        <option>Stopped</option>
        <option>Bug</option>
        <option>To-Do</option>
        
        
        
      </Form.Control>
      <div className={statusOfLogErrorLen === 0? '':'alert alert-danger'}>{this.state.errors.statusOfLog}</div>
    </Form.Group>
  </Form.Row>
  <Form.Group >
    <Form.Label>Comment</Form.Label>
    <Form.Control as="textarea" name='comment' value={this.state.addLogData.comment} onChange={this.handleChange}  rows="3" />
    <div className={commentErrorLen === 0? '':'alert alert-danger'}>{this.state.errors.comment}</div>
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