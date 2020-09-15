import React, { Component } from 'react';
import {Row, Form, Button,Col} from 'react-bootstrap'

class EditLog extends Component {
    state = {  }
    render() { 
        return ( <div style={{marginLeft:220}}>
            <h4  className='m-5'>Edit Logs Here</h4>
            <Form className='m-5'>
      <Form.Row>
        
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
    
    
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </div> );
    }
}
 
export default EditLog;
