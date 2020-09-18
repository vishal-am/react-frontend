import React, { Component } from 'react';
import {Row, Form, Button,Col} from 'react-bootstrap';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import Pagination from './Pagination';
import  { paginate } from './Paginate';
import _ from 'lodash';



class ShowLogs extends Component {
    state = { 
      data:[],
      pageSize:5,
      currentPage:1,
      sortcolumn: {'path':'serialNo','order':'desc'},
      search:''
    }
  //   updateSearch = (event)=>{
        
  //     const searchData = [...this.state.data]
  //         this.setState({
  //           search:event.target.value.substr(0,8),
  //         currentPage:1
  //     });
  // }
    handlePageChange = page => {
      this.setState({
        currentPage:page
      });
    };

    doSort = (path,order) => {
      const data = [...this.state.data]
     this.order = this.order !== 'asc' ? 'asc' : 'desc'
     let x = _.orderBy(data,[path],[this.order])
     this.setState({
         data:x
     })};

    removeCharacter = (index) => {
      const {characters} = this.state
      this.setState({
        characters: characters.filter((character, i) => {
          return i !== index
        }),
      })
    }
    updatePageSize=(event)=>{  
      let val
      if(event.target.value==null)  val = 5
        
        this.setState(
          {
              pageSize:val
          }
      )
    }
    componentWillMount=()=>{
      axios.get('http://localhost:5000/api/logs/getlogs')
        .then(res => {
          let {data} = res;

          this.setState({data})

          // console.log(data.map(arr=>console.log(arr)))
          // let {request,status,errors,error} = res;
          // console.log(request,status,errors,error)
          // let {responseText} = request;
          //  let message = (Object.values(res.data))
          // console.log(status)
          // if (status===200){
          //   let history =  createBrowserHistory()
          //   toast.success('Log Added!!');
          //   setTimeout(function () {
          //     // history.push('/')
          //     window.location.href = "/"; //will redirect to your blog page (an ex: blog.html)
          //  }, 2000);

          //   history.push('/dashboard')
          // }
        })
    }
    render() { 
      const {data,currentPage,pageSize} = this.state
      const logs = paginate(data,currentPage,pageSize)
  return ( <div style={{
    fontFamily: 'Montserrat',
  }} >
      <h4  className='m-5'>Your Logs </h4>
      {/* <input type="text" name='search' 
            className='my-2'
            value={this.state.search}
            onChange={this.updateSearch}
            style={{
                borderRadius:100,borderColor:'white'
            }} placeholder='  search here'
            // onPageChange={this.handlePageChange}
        />
        <button onClick={this.handleReset} className='btn btn-success btn-sm mx-2 mb-1'
         style={{
            borderRadius:80,borderColor:'white'
        }}>Reset</button> */}
      <Table striped bordered hover variant="light">
          <thead>
            <tr>
                <th  onClick={()=> this.doSort('todayDate','asc')} style={{cursor:'pointer'}}>Date</th>
                <th onClick={()=> this.doSort('serialNo','asc')} style={{cursor:'pointer'}}>Serial No.</th>
                <th onClick={()=> this.doSort('startingTime','asc')} style={{cursor:'pointer'}}>Start Timing</th>
                <th onClick={()=> this.doSort('endingTime','asc')} style={{cursor:'pointer'}}>Ending Timing</th>
                <th onClick={()=> this.doSort('projectName','asc')} style={{cursor:'pointer'}}>Project Name</th>
                <th onClick={()=> this.doSort('logType','asc')} style={{cursor:'pointer'}}>Log Type</th>
                <th onClick={()=> this.doSort('status','asc')} style={{cursor:'pointer'}}>Status</th>
                <th></th>
            </tr>
          </thead>
          <tbody>
                {logs.map(a=>
                <tr key={a._id}>
                <td>
                    {a.todayDate}
                </td>
                <td>
                    {a.serialNo}
                </td>
                <td>
                  {a.startingTime}
                </td>
                <td>
                  {a.endingTime ==='' ?'Not Completed Yet':a.endingTime}
                </td>
                <td>
                  {a.projectName}
                </td>
                <td>
                  {a.logType}
                </td>
                <td  >
                  {a.statusOfLog}
                </td>
                <td>
                <button 
                // onClick={this.handlePageChange}
                // onClick={()=>removeCharacter(index)}
                 className='btn btn-danger btn-sm'>Edit</button>
                </td>
                </tr>
                )}
          </tbody>
  </Table>
  <Pagination  
    itemsCount={this.state.data.length} 
    pageSize ={this.state.pageSize} 
    currentPage={this.state.currentPage} 
    onPageChange={this.handlePageChange}
      /> 
      {/* <input type="number" 
                        onChange={this.updatePageSize} 
                        maxLength="4"
                        size="4"
                        style={{
                        borderRadius:100,
                    }}></input> */}
        </div> );
    }
}
 


 


export default ShowLogs;
