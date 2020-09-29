import React from 'react';

const Table = ({userList=[]}) => {
    return(
        <>
        {userList.map((data,index) => {
            if(data) {
                return (/* 
                    <div key ={data.firstName}>
                    <h2>{data.firstName}, {data.lastName}</h2>
                    <p>{data.requestsCompleted}</p>
                    </div> */
                    
/*                     <table class="ui very padded table">
                        
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Requests Completed</th>
                            </tr>
                        </thead>
                        <tbody> */
                            <tr>
                            
                            <td>{data.firstName} {data.lastName}</td>
                            <td>{data.requestsCompleted}</td>
                           
                            </tr>
/*                         </tbody>
                    </table> */
                   

                )
            }
            return null
        })}
        </>
    )
}

export default Table;