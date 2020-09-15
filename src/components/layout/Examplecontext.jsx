import React, { Component } from 'react';
import UserContext from './UserContext';


class Cons extends Component {
    onstructor(props) {
        super(props);
    this.state = { 
        ReturnMessage:''
    }   }
    ClearData(e){
        const val = e.target.value;
        this.setState({
           ReturnMessage:val
        });
        this.props.context.updateValue('ReturnMessage', val);
    }

    
    render() {
        return (
           <React.Fragment>
             <p>{props.context.state.Message}</p>
             <input onChange={this.ClearData} />
           </React.Fragment>
       )
    }
}

const withContext = (Component) => {
   return( props =>{
       <UserContext.Consumer>    
            {context => <Component {...props} context={context} />}
       </UserContext.Consumer>
   })
}

export default withContext(Cons);
    