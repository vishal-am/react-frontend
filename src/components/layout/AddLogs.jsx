import React, { Component } from 'react';
import {Row, Form, Button,Col} from 'react-bootstrap'

class AddLogs extends Component {
    state = { 
        date:'',
        time:''
     }
    handleSubmit=(event)=>{
this.setState({
    [event.target.name]:event.target.value
})
    }
    render() { 

        return ( <div style={{marginLeft:220}}>
        <h4  className='m-5'>Add Logs Here</h4>
        <Form className='m-5'>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Date</Form.Label>
      <Form.Control type="date" placeholder="Enter Date" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Serial No.</Form.Label>
      <Form.Control type="number"  placeholder="DMY-Task No." />
    </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Starting Time</Form.Label>
      <Form.Control type="time" placeholder="Starting Time" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Ending Time</Form.Label>
      <Form.Control type="time"  placeholder="Ending Time" />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Project Name</Form.Label>
    <Form.Control placeholder="Enter Project Name" />
  </Form.Group>
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Log Details </Form.Label>
    <textarea class="form-control" placeholder='Enter Log Details' rows="3"></textarea>
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
    <Form.Label>Milestone</Form.Label>
    <Form.Control type='number' placeholder="Milestone" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
    <Form.Label>Log Type</Form.Label>
      <Form.Control as="select" defaultValue="Choose...">
        <option>Task</option>
        <option>Meeting</option>
        <option>Learning</option>
        <option>Research</option>
        <option>Free</option>
        
        
        
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Stauts of Log</Form.Label>
      <Form.Control as="select" defaultValue="Choose...">
        <option>Started</option>
        <option>Completed</option>
        <option>Stopped</option>
        <option>Bug</option>
        <option>To-Do</option>
        
        
        
      </Form.Control>
    </Form.Group>
  </Form.Row>
  <Form.Group controlId="formGridAddress1">
    <Form.Label>Comment</Form.Label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </Form.Group>



  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
        </div> )
    }
}
 
export default AddLogs;