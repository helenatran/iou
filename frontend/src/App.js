import React, { useEffect, useState } from 'react';
import './App.css';
import ButtonAppBar from './navBar/navBar';
import UserContext from './Context/userContext';
import {
  BrowserRouter,
  Route,
  Switch as RouterSwitch,
  useHistory
} from 'react-router-dom';
import * as Routes from './Routes/routes'
import axios from 'axios';

function App() {
  const history = useHistory();
  const [ userDetails, setUserDetails ] = useState({
    token: undefined,
    user: undefined,
  })
  

  useEffect(() => {
    const isLoggedIn = async () => {
      let token = localStorage.getItem("token");
      if (token === null) {
        //localStorage.setItem("token", "");
        //token="";
        history.push('/');
      }
      const tokenValid = await axios.post('api/user/validateToken', null, {
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
            <Route path='/login' component={Routes.Login} />
            <Route path='/register' component={Routes.Register} />
            <Route path='/account' component={Routes.Account} />
            <Route path='/favours' exact component={Routes.Favour} />
            <Route path='/favours/create' component={Routes.FavourForm} />
            <Route path='/favours/:favourid/update' component={Routes.FavourUpdate} />
            <Route path='/favours/:favourid' component={Routes.FavourSingle} />
            <Route path='/requests' component={Routes.Request} />
            <Route path='/leaderboard' component={Routes.Leaderboard} />
            <Route path='/:id' component={Routes.RequestInfo} />
          </RouterSwitch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
