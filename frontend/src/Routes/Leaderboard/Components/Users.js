import React from 'react';
import '../leaderstyle.css';


const Users = ({users, currentPage}) => {
/* calculating user's rank */
const calc = ((currentPage-1)*10);

    return (
        <div className="userList">
            <ul className="name" >
                {users.map((users, i) => (
                    <li key={users.id}>
                        <div className="name"> 
                        {calc+i+1}. {users.firstName}</div>
                         <div className="request">{users.requestsCompleted} requests completed</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Users