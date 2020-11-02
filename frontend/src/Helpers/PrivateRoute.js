/*
 * This helper method is used to secure routes from users who have not registered or logged in
 * Code in the useEffect block is run on startup with loading text used to provide feedback to the user
 * If a user is detected as being logged in, the component renders
 */
import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import tokenValidator from './tokenValidator'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const [ isAuth, setIsAuth ] = useState('unsure');

    useEffect(() => {
        (async function() {
            try {
                //Check if user is logged in and set status of auth to result
                const isUserLogged = await tokenValidator();
                setIsAuth(isUserLogged ? "authed" : 'notAuthed');
            }
            catch {
                setIsAuth('notAuthed');
            }
        })();
    }, []);

    if(isAuth === 'unsure') 
        return <div>Loading..</div>
    
    return (
        <Route 
            path={path}
            {...rest}
            //Only render the component if the user has been authenticated, else redirect them to the login pageT
            render = { props => ((isAuth === 'authed') ?  
                    <Component {...props} /> :  
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