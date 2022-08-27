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
import ProtectedRoute from '../ProtectedRoute';
import * as auth from '../../utils/auth';

function App() {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push('/movies');
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    moviesApi.getFilms().then((moviesList) => {
      setMovies(moviesList);
    });
  }, []);

  function changeStatusMenu() {
    setBurgerMenuActive(!burgerMenuActive);
    console.log(burgerMenuActive);
  }

  function closeMenu() {
    setBurgerMenuActive(!burgerMenuActive);
  }

  function handleRegister({ name, email, password }) {
    return auth.register(name, email, password).then((data) => {
      console.log(data);
    });
  }

  function handleLogin({ email, password }) {
    console.log(1233);
    return auth
      .authorize(email, password)
      .then((data) => {
        console.log(data)
        localStorage.setItem('token', data.token);
        setCurrentUser({ ...currentUser, email });
        console.log(currentUser)
        tokenCheck();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function tokenCheck() {
    let jwt = localStorage.getItem('token');
    if (jwt) {
      console.log(jwt);
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            // let userData = {
            //   username: res.name,
            //   email: res.email,
            //   about: res.about,
            // };
            setCurrentUser(res);
            console.log(loggedIn)
            setLoggedIn(true);
            console.log(loggedIn)
            history.push('/movies');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

          <ProtectedRoute
            exact
            path={['/movies', '/saved-movies']}
            loggedIn={loggedIn}
          >
            <Route path={'/movies'}>
              <Header changeStatusMenu={changeStatusMenu} />
              <Movies listMovies={movies} />
              <Footer />
            </Route>

            <Route path={'/saved-movies'}>
              <Header changeStatusMenu={changeStatusMenu} />
              <SavedMovies />
              <Footer />
            </Route>
          </ProtectedRoute>

          <Route path={'/profile'}>
            <Header changeStatusMenu={changeStatusMenu} />
            <Profile />
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
          <BurgerMenu closeMenu={closeMenu} />
        </Switch>
      </BurgerMenuStateContext.Provider>
    </div>
  );
}

export default App;
