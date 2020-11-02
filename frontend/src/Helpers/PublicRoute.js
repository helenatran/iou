/*
 * This method is used to only show the Login/Register pages to users who have no logged in yet
 * Basically does the opposite of what PrivateRoute does
 */
import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import tokenValidator from './tokenValidator'

const PublicRoute = ({ component: Component, path, ...rest }) => {
    const [isAuth, setIsAuth] = useState('unsure');

    useEffect(() => {
        (async function () {
            try {
                const isUserLogged = await tokenValidator();
                setIsAuth(isUserLogged ? "authed" : 'notAuthed');
            }
            catch {
                setIsAuth('notAuthed');
            }
        })();
    }, []);

    if (isAuth === 'unsure')
        return <div>Loading..</div>

    return (
        <Route
            path={path}
            {...rest}
            // If the user is logged in, then redirect them to the home page
            render={props => ((isAuth === 'authed') ?
                <Redirect
                    to={{
                        pathname: "/",
                        state: { referer: props.location }
                    }}
                /> 
                : 
                <Component {...props} />
            )
            }
        />
    )
}

export default PublicRoute;