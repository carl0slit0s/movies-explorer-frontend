import './App.css';
import { BurgerMenuStateContext } from '../Context/BurgerContext';
import { MoviesContext } from '../Context/MoviesContext';

import Main from '../Main/Main';
import Header from '../Header/Header';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { Route, Switch, useHistory } from 'react-router-dom';
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
import { CurrentUser } from '../Context/CurrentUser';
import MessagePopup from '../MessagePopup/MessagePopup';

function App() {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [myMovies, setMyMovies] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [message, setMessage] = useState('');

  const history = useHistory();

  // useEffect(() => {
  //   loggedIn ? history.push('/movies') : history.push('/');
  // }, []);

  useEffect(() => {
    tokenCheck();
  }, []);

  function changeStatusMenu() {
    setBurgerMenuActive(!burgerMenuActive);
  }

  function closeMenu() {
    setBurgerMenuActive(!burgerMenuActive);
  }

  function handleRegister({ name, email, password }) {
    return auth.register(name, email, password).then(() => {
      showMessage('успешная регистрация!')
      handleLogin({ email, password });
    }).catch(err => showMessage(err.message));
  }

  function handleLogin({ email, password }) {
    return auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setCurrentUser({ ...currentUser, email });

        tokenCheck();
      })
      .catch((err) => {
        showMessage(err.message);
        console.log(err);
      });
  }

  function showMessage(message) {
    setOpenPopup(true);
    console.log('ОТкрЫть');
    setMessage(message);
  }

  function closePopup() {
    setOpenPopup(false);
  }

  function handleOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('filterMovies');
    setLoggedIn(false);
    history.push('/');
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
        })
        .catch((err) => {
          setLoggedIn(false);
          history.push('/');
          console.log(err);
          localStorage.removeItem('token')
        });
    }
  }

  return (
    <div className='App'>
      <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
        <BurgerMenuStateContext.Provider value={burgerMenuActive}>
          <MoviesContext.Provider value={{ myMovies, setMyMovies }}>
            <Switch>
              <Route exact path='/'>
                <Header loggedIn={loggedIn} changeStatusMenu={changeStatusMenu} />
                <BurgerMenu closeMenu={closeMenu} />
                <Main />
                <Footer />
              </Route>

              <ProtectedRoute
                exact
                path={['/movies', '/saved-movies']}
                loggedIn={loggedIn}
              >
                <Route path={'/movies'}>
                  <Header loggedIn={loggedIn} changeStatusMenu={changeStatusMenu} />
                  <BurgerMenu closeMenu={closeMenu} />
                  <Movies />
                  <Footer />
                </Route>

                <Route path={'/saved-movies'}>
                  <Header loggedIn={loggedIn} changeStatusMenu={changeStatusMenu} />
                  <BurgerMenu closeMenu={closeMenu} active={burgerMenuActive} />
                  <SavedMovies />
                  <Footer />
                </Route>
              </ProtectedRoute>

              <Route path={'/profile'}>
                <Header loggedIn={loggedIn} changeStatusMenu={changeStatusMenu} />
                <BurgerMenu closeMenu={closeMenu} />
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
            <MessagePopup
              message={message}
              isOpen={openPopup}
              closePopup={closePopup}
            />
          </MoviesContext.Provider>
        </BurgerMenuStateContext.Provider>
      </CurrentUser.Provider>
    </div>
  );
}

export default App;
