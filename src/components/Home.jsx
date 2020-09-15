import React, { Component } from 'react';
import UserContext from './layout/UserContext';

class Home extends Component {
    state = {  }
    redirectTo=()=>{
        window.location='/dashboard'
    }
    render() { 
        return ( <div style={{
            backgroundColor:'#e0ece4',
            textAlign:"center",
            padding:100
        }}>
       
         <UserContext.Consumer>     
         {context=>
            <h2>
            Hey, {context.state.isLoggedIn?context.state.name:"there"}<br></br>
            {context.state.isLoggedIn?<button className='btn btn-warning text-white m-4' onClick={this.redirectTo}>Go to Dashboard</button>:"please Login or Sign Up"}
            
        </h2>
         }
        </UserContext.Consumer>  
        </div> );
    }
}
 
export default Home;