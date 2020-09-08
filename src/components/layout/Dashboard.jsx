import React, { Component } from 'react';
import UserContext from './UserContext';

class Dashboard extends Component {
    state = {  }
    render() { 
        return ( 
               <UserContext.Consumer>
              {
                data =>
                <div>{data.name},Welcome to your Dashboard
                </div>
              
              }
              </UserContext.Consumer> 
         );
    }
}
 
export default Dashboard;