import './App.css';
import { BurgerMenuStateContext } from '../BurgerContext/BurgerContext';
import { moviesApi } from '../../utils/MoviesApi';

import Main from '../Main/Main';
import Header from '../Header/Header';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import {
  Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  Link,
} from 'react-router-dom';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useEffect, useState } from 'react';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   moviesApi.getFilms().then((moviesList) => {
  //     const formatedData = moviesList.map((movieData) => ({
  //       name: movieData.nameRU,
  //     }));
  //     setMovies(formatedData);
  //     console.log(movies);
  //   });
  // }, []);

  function changeStatusMenu() {
    setBurgerMenuActive(!burgerMenuActive);
    console.log(burgerMenuActive);
  }

  function closeMenu() {
    setBurgerMenuActive(!burgerMenuActive);
  }

  return (
    <Switch>
      <BurgerMenuStateContext.Provider value={burgerMenuActive}>
        <div className='App'>
          <Header changeStatusMenu={changeStatusMenu} />
          <Main />
          <Footer />

          {/* роутер входа */}
          <Route exact path='/signin'>
            <Login />
          </Route>

          {/* роутер регистрации */}
          <Route exact path='/signup'>
            <Register />
          </Route>

          <Route exact path='*'>
            <PageNotFound />
          </Route>
          <BurgerMenu closeMenu={closeMenu} />
        </div>
      </BurgerMenuStateContext.Provider>
    </Switch>
  );
}

export default App;
