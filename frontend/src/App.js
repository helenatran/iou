import React, { useEffect, useState } from 'react';
import './App.css';
import ButtonAppBar from './navBar/navBar';
import UserContext from './Context/userContext';
import {
  BrowserRouter,
  Route,
  Switch as RouterSwitch,
} from 'react-router-dom';
import * as Routes from './Routes/routes'
import axios from 'axios';
import PrivateRoute from './Helpers/PrivateRoute';
import PublicRoute from './Helpers/PublicRoute';

function App() {
  const [ userDetails, setUserDetails ] = useState({
    token: undefined,
    user: undefined,
  })
  

  useEffect(() => {
    const isLoggedIn = async () => {
      let token = localStorage.getItem("token");
      if (token === null) {
        localStorage.setItem("token", "");
        token="";
      }
      const tokenValid = await axios.post('/api/user/validateToken', null, {
        headers: {
          "token": token
        }
      });
      if (tokenValid.data) {
        const user = await axios.get('/api/user/find', {
          headers: {
            "token": token
          },
        });
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
          
            <PublicRoute path='/login' component={Routes.Login} />
            <PublicRoute path='/register' component={Routes.Register} />
            <PrivateRoute path='/account' component={Routes.Account} />
            <PrivateRoute path='/favours' exact component={Routes.Favour} />
            <PrivateRoute path='/favours/create' component={Routes.FavourForm} />
            <PrivateRoute path='/favours/:favourid/update' component={Routes.FavourUpdate} />
            <PrivateRoute path='/favours/:favourid' component={Routes.FavourSingle} />
            <PrivateRoute path='/request/new' component={Routes.RequestForm} />
            <PublicRoute path='/request/:id' component={Routes.RequestInfo} />
            <PublicRoute path='/' component={Routes.Request} />
            <PublicRoute path='/request/' component={Routes.Request} />
            <PublicRoute path='/leaderboard' component={Routes.Leaderboard} />
            
          </RouterSwitch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
