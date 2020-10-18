import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../Context/userContext';

const PublicRoute = ({ component: Component, ...rest }) => {
    const { userDetails } = useContext(UserContext);

    return (
        <Route 
            {...rest}
            render = { props =>
                userDetails.user ? ( 
                    <Redirect 
                        to={{ 
                            pathname: "/", 
                            state: { referer: props.location } }}
                    />
                ) : ( 
                    <Component {...props} />
                )
            }
        />
    )
}

export default PublicRoute;