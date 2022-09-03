import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import { Route, Switch } from 'react-router-dom';

export default function Main() {
  return (
    <main className='main'>
      <Switch>
        <Route exact path={'/'}>
          <Promo />
          <AboutProject />
          <Techs />
          <AboutMe />
        </Route>
      </Switch>
    </main>
  );
}
