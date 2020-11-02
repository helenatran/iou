import React, { useEffect, useState } from 'react';
import './App.css';
import ButtonAppBar from './navBar/navBar';
import UserContext from './Context/userContext';
import * as Routes from './Routes/routes'
import axios from 'axios';
import PrivateRoute from './Helpers/PrivateRoute';
import PublicRoute from './Helpers/PublicRoute';
import {
  BrowserRouter,
  Route,
  Switch as RouterSwitch,
} from 'react-router-dom';

function App() {
  const [ userDetails, setUserDetails ] = useState({
    token: undefined,
    user: undefined,
  })
  
/* 
 * Authentication code to determine login status mainly from:
   - https://www.youtube.com/watch?v=sWfD20ortB4&ab_channel=Devistry
   - https://github.com/jgbijlsma/mern-auth-template-front/blob/master/src/App.js
 */
  useEffect(() => {
    const isLoggedIn = async () => {
      let token = localStorage.getItem("token");
      // Need to set token value to empty otherwise axios post call below will return an error without a token in local storage
      if (token === null) {
        localStorage.setItem("token", "");
        token="";
      }
      // tokenValid will return true if the token supplied to the api is valid
      const tokenValid = await axios.post('/api/user/validateToken', null, {
        headers: {
          "token": token
        }
      });
      // If the token is valid, get the user's details based on their id and set the values in Context
      if (tokenValid.data) {
        const user = await axios.get('/api/user/find', {
          headers: {
            "token": token
          }});
        setUserDetails({
          token,
          user: user.data,
        })
      }
    };
    isLoggedIn();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{ userDetails, setUserDetails }}>
          <ButtonAppBar />
          <RouterSwitch>
            {/* Public Routes are routes that should only be seen by users not registered and not logged in */}
            <PublicRoute path='/login' component={Routes.Login} />
            <PublicRoute path='/register' component={Routes.Register} />
            {/* Private Routes are routes that should only be seen by users that are logged in  */}
            <PrivateRoute path='/favours' exact component={Routes.Favour} />
            <PrivateRoute path='/favours/create' component={Routes.FavourForm} />
            <PrivateRoute path='/favours/:favourid/update' component={Routes.FavourUpdate} />
            <PrivateRoute path='/favours/:favourid' component={Routes.FavourSingle} />
            <PrivateRoute path='/request/new' component={Routes.RequestForm} />
            {/* Normal Routes are routes that can be seen by anyone at anytime */}
            <Route path='/leaderboard' component={Routes.Leaderboard} />
            <Route path='/request/:id' component={Routes.RequestInfo} />
            <Route path='/' component={Routes.Request} />
            <Route path='/request/' component={Routes.Request} />
          </RouterSwitch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
