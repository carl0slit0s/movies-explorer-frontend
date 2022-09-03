import React, { useState } from 'react';
import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Movies from '../Movies/Movies';
import { Route, Switch } from 'react-router-dom';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { BurgerMenuStateContext } from '../Context/BurgerContext';

export default function Main() {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  return (
    <main className='main'>
      <BurgerMenuStateContext.Provider value={burgerMenuActive}>
        <Switch>
          <Route exact path={'/'}>
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
          </Route>
        </Switch>
      </BurgerMenuStateContext.Provider>
    </main>
  );
}
