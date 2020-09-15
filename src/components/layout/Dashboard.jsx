import React, { Component } from 'react';
import UserContext from './UserContext';
import { Alert } from 'rsuite';
import 'react-toastify/dist/ReactToastify.css';

class Dashboard extends Component {
    state = { 
      isLoggedIn:true,value:{}
     }

   
    changeData=(context)=>{

      console.log(context.state)
      console.log(this.state.value)
    }
    componentDidMount = (context) =>{
      // Alert.success( 'Succesfully LoggedIN');
    }
    render() { 

        return ( 
        
                <div style={{
                  height:699,
                  textAlign:"center",
                  marginTop:100,marginLeft:220,
                }}>
                 
   
                <h2> {this.context.state.name}, Welcome again<br/>This is your Dashboard</h2>
                <button className='btn btn-warning text-white m-4' onClick={()=>this.changeData(this.context)}>Logs</button>
                </div>
              
            
         );
    }
}
Dashboard.contextType=UserContext;
 
export default Dashboard;