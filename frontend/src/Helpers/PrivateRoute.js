//import React, { useContext } from 'react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
//import UserContext from '../Context/userContext';
import axios from 'axios';

const PrivateRoute = ({ component: Component, ...rest }) => {
    //const { userDetails } = useContext(UserContext);
    const tokenValid = axios.post('/api/user/validateToken', null, {
        headers: {
          "token": localStorage.getItem('token')
        }
      });

    return (
        <Route 
            {...rest}
            render = { props =>
                tokenValid ? ( 
                    <Component {...props} /> 
                ) : ( 
                    <Redirect 
                        to={{ 
                            pathname: "/login", 
                            state: { referer: props.location } }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute;