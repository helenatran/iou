import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../Context/userContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { userDetails, setUserDetails } = useContext(UserContext);

    return (
        <Route 
            {...rest}
            render = { props =>
                userDetails.user ? ( 
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