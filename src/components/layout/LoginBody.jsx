import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import { Alert } from 'rsuite';
import {BrowserRouter as Router,Switch,Route,Link,Redirect} from "react-router-dom";
import AddLogs from './AddLogs'
import EditLog from './EditLog';

class LoginBody extends Component {
    state = {  }
    componentDidMount = (context) =>{
        Alert.success( 'Succesfully LoggedIN');
      }
    render() { 

        console.log('loging body rendor method')
        return ( 
            <Router>
        <div className="d-flex">
            <Sidebar/>
            

            {/* <Route exact path='/addlogs' component={AddLogs}/> */}
        <Switch> 
<Route path='editlog'>
  <EditLog></EditLog>
</Route>

         <Route path='/editlog'>
           <EditLog/>
         </Route>
          <Route path='/addlogs'>
            <AddLogs/>
          </Route>

          <Route path='/dashboard'>
              <Dashboard/>
          </Route>

        </Switch>

        </div>
        </Router> );
    }
}
 
export default LoginBody;