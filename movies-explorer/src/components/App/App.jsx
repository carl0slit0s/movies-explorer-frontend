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
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

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
    <div className='App'>
      <BurgerMenuStateContext.Provider value={burgerMenuActive}>
        <Switch>
          <Route exact path='/'>
            <Header changeStatusMenu={changeStatusMenu} />
            <Main />
            <Footer />
          </Route>

          <Route path={'/movies'}>
            <Header changeStatusMenu={changeStatusMenu} />
            <Movies />
            <Footer />
          </Route>

          <Route path={'/saved-movies'}>
            <Header changeStatusMenu={changeStatusMenu} />
            <SavedMovies />
            <Footer />
          </Route>
          
          <Route path={'/profile'}>
            <Header changeStatusMenu={changeStatusMenu} />
            <Profile />
            <Footer />
          </Route>

          {/* роутер входа */}
          <Route path='/signin'>
            <Login />
          </Route>

          {/* роутер регистрации */}
          <Route path='/signup'>
            <Register />
          </Route>

          <Route path='*'>
            <PageNotFound />
          </Route>
          <BurgerMenu closeMenu={closeMenu} />
        </Switch>
      </BurgerMenuStateContext.Provider>
    </div>
  );
}

export default App;
