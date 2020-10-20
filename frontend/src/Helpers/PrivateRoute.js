import React from 'react';
import { Redirect, Route } from 'react-router-dom';
//import axios from 'axios';
import validateToken from '../Helpers/validateToken';

const PrivateRoute = ({ component: Component, ...rest }) => {
    // const tokenValid = axios.post('/api/user/validateToken', null, {
    //     headers: {
    //       "token": localStorage.getItem('token')
    //     }
    //   });
    const tokenValid = validateToken();

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