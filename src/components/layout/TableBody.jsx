import React from 'react';

const TableBody = data => { 
    const  rows = data.map((log)=> (
        <tr key={log._id} >
            <td>{log.projectName}</td>
            <td>{log.statusOfLog}</td>
            <td>
                {/* <button onClick={()=>removeCharacter(index)} className='btn btn-danger'>Delete</button> */}
            </td>
        </tr>
    )
    )
    
    return (
        
        <table>{rows}</table> 
    )
}
 
export default TableBody;
