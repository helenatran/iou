import React from 'react';
import './App.css';
import ButtonAppBar from './navBar/navBar';
import {
  BrowserRouter,
  Route,
  Switch as RouterSwitch
} from 'react-router-dom';
import * as Routes from './Routes/routes'

function App() {
  return (
    <div>
      <BrowserRouter>
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
          <Route path='/:id' component={Routes.RequestInfo} />
          <Route path='/leaderboard' component={Routes.Leaderboard} />
        </RouterSwitch>
      </BrowserRouter>
    </div>
  );
}

export default App;
