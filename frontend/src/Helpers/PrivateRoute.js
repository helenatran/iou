import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import tokenValidator from './tokenValidator'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const [ isAuth, setIsAuth ] = useState('unsure');

    useEffect(() => {
        (async function() {
            try {
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