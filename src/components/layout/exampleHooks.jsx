import React,{useState} from 'react';


const ExampleHooks = (props) => {

    const [count,setcount] = useState(0);
    const [name,setName]=useState('.');

    return ( 
        <div>
        <h2>
            Counter:{count}<br/>
            <buton className='btn  btn-danger m-4' onClick={()=>setcount(count+1)}>click</buton>
            
            points:{name}<br/>
            <input name='fullname' value ={name} 
            className='bg-red' 
            onChange={e=>setName(e.target.fullname)} placeholder='Your Name Plz' width='23'></input>
            </h2>
        </div>
     );
}
 
export default ExampleHooks;

