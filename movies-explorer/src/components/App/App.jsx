import './App.css';
import { BurgerMenuStateContext } from '../Context/BurgerContext';
import { MoviesContext } from '../Context/MoviesContext';
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
import { useContext, useEffect, useState } from 'react';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute';
import * as auth from '../../utils/auth';
import { mainApi } from '../../utils/MainApi';
import { CurrentUser } from '../Context/CurrentUser';

function App() {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [myMovies, setMyMovies] = useState([]);

  const history = useHistory();

  useEffect(() => {
    loggedIn ? history.push('/movies') : history.push('/');
  }, []);

  useEffect(() => {
    tokenCheck();
  }, []);

  // function getMyMovies() {
  //   const token = localStorage.getItem('token');
  //   mainApi.getMyMovies(token).then((res) => {
  //     console.log(123);
  //     return setMySaveMovies(res);
  //   });
  // }

  function changeStatusMenu() {
    setBurgerMenuActive(!burgerMenuActive);
    console.log(burgerMenuActive);
  }

  // function getMyMovies() {
  //   const token = localStorage.getItem('token');
  //   mainApi.getMyMovies(token).then((res) => setMySaveMovies(res));
  // }

  function closeMenu() {
    setBurgerMenuActive(!burgerMenuActive);
  }

  function handleRegister({ name, email, password }) {
    return auth.register(name, email, password).then((data) => {});
  }

  function handleLogin({ email, password }) {
    console.log(1233);
    return auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setCurrentUser({ ...currentUser, email });

        tokenCheck();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/signin');
  }

  function tokenCheck() {
    let jwt = localStorage.getItem('token');
    if (jwt) {
      setLoggedIn(true);
      history.push('/movies');
      auth
        .getContent(jwt)
        .then((res) => {
          setCurrentUser(res);
          console.log('это ер', res);
          console.log('это юзер', currentUser);
        })
        .catch((err) => console.log(err));
      // auth
      //   .getContent(jwt)
      //   .then((res) => {
      //     if (res) {
      //       // let userData = {
      //       //   username: res.name,
      //       //   email: res.email,
      //       //   about: res.about,
      //       // };
      //       setCurrentUser(res);
      //       console.log(loggedIn)
      //       console.log(loggedIn)
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }

  return (
    <div className='App'>
      <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
        <BurgerMenuStateContext.Provider value={burgerMenuActive}>
          <MoviesContext.Provider value={{ myMovies, setMyMovies }}>
            <Switch>
              <Route exact path='/'>
                <Header changeStatusMenu={changeStatusMenu} />
                <Main />
                <Footer />
              </Route>

              <ProtectedRoute
                exact
                path={['/movies', '/saved-movies']}
                loggedIn={loggedIn}
              >
                <Route path={'/movies'}>
                  <Header changeStatusMenu={changeStatusMenu} />
                  <BurgerMenu closeMenu={closeMenu} />
                  <Movies />
                  <Footer />
                </Route>

                <Route path={'/saved-movies'}>
                  <Header changeStatusMenu={changeStatusMenu} />
                  <BurgerMenu closeMenu={closeMenu} active={burgerMenuActive} />
                  <SavedMovies />
                  <Footer />
                </Route>
              </ProtectedRoute>

              <Route path={'/profile'}>
                <Header changeStatusMenu={changeStatusMenu} />
                <Profile handleOut={handleOut} />
                <Footer />
              </Route>

              {/* роутер входа */}
              <Route path='/signin'>
                <Login handleLogin={handleLogin} userData={currentUser} />
              </Route>

              {/* роутер регистрации */}
              <Route path='/signup'>
                <Register handleRegister={handleRegister} />
              </Route>

              <Route path='*'>
                <PageNotFound />
              </Route>
            </Switch>
          </MoviesContext.Provider>
        </BurgerMenuStateContext.Provider>
      </CurrentUser.Provider>
    </div>
  );
}

export default App;
